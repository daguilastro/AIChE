/**
 * app/lib/google-drive.ts
 *
 * Helpers para Google Drive usando OAuth2 (refresh token).
 * Tipos explícitos para evitar advertencias de TS sobre 'any'.
 */

import { google } from "googleapis";
import type { drive_v3 } from "googleapis";

function ensureEnv() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      "Faltan variables de entorno: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN"
    );
  }
  return { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN };
}

function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = ensureEnv();
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

/** Devuelve una instancia de Drive v3 autenticada. */
export function getDrive() {
  const auth = getOAuthClient();
  return google.drive({ version: "v3", auth });
}

/** Devuelve la información del usuario autenticado (útil para debug) */
export async function getAbout() {
  const drive = getDrive();
  const resp = await drive.about.get({ fields: "user,emailAddress" });
  return resp.data;
}

/** Lista las Shared Drives accesibles por la cuenta */
export async function listSharedDrives(pageSize = 100) {
  const drive = getDrive();
  const resp = await drive.drives.list({ pageSize });
  return resp.data.drives || [];
}

/**
 * Obtiene el contenido de una carpeta.
 *
 * - Si pasas driveId y folderId === 'root', lista la raíz de la shared drive (corpora: 'drive', driveId).
 * - Por defecto busca `'${folderId}' in parents and trashed = false`.
 * - Siempre incluye includeItemsFromAllDrives / supportsAllDrives para cubrir Shared drives.
 */
export async function getFolderContents(
  folderId: string,
  options?: { driveId?: string; pageSize?: number }
) {
  const drive = getDrive();
  const pageSize = options?.pageSize ?? 1000;
  const driveId = options?.driveId;

  try {
    // Si quieren la raíz de una shared drive
    if (driveId && (folderId === "root" || !folderId)) {
      const files: drive_v3.Schema$File[] = [];
      let nextPageToken: string | undefined = undefined;
      do {
        const response = await drive.files.list({
          corpora: "drive",
          driveId,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
          q: "trashed = false",
          fields:
            "nextPageToken, files(id,name,mimeType,parents,thumbnailLink,webViewLink,webContentLink,size)",
          pageSize,
          pageToken: nextPageToken,
        });
        const data: drive_v3.Schema$FileList = response.data;
        files.push(...(data.files || []));
        nextPageToken = data.nextPageToken || undefined;
      } while (nextPageToken);
      return files;
    }

    // Caso genérico: listar por parent
    const files: drive_v3.Schema$File[] = [];
    let nextPageToken: string | undefined = undefined;
    const q = `'${folderId}' in parents and trashed = false`;
    do {
      const response = await drive.files.list({
        q,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        fields:
          "nextPageToken, files(id,name,mimeType,parents,thumbnailLink,webViewLink,webContentLink,size)",
        orderBy: "name",
        pageSize,
        pageToken: nextPageToken,
      });
      const data: drive_v3.Schema$FileList = response.data;
      files.push(...(data.files || []));
      nextPageToken = data.nextPageToken || undefined;
    } while (nextPageToken);
    return files;
  } catch (error) {
    console.error("Error al obtener contenido de carpeta:", error);
    throw new Error("No se pudo obtener el contenido de la carpeta");
  }
}

/** Información de archivo (soporta shared drives) */
export async function getFileInfo(fileId: string) {
  const drive = getDrive();
  try {
    const response = await drive.files.get({
      fileId,
      fields: "id,name,mimeType,thumbnailLink,webViewLink,webContentLink,parents,size",
      supportsAllDrives: true,
    });
    const data: drive_v3.Schema$File = response.data as drive_v3.Schema$File;
    return data;
  } catch (error) {
    console.error("Error al obtener información del archivo:", error);
    throw new Error("No se pudo obtener la información del archivo");
  }
}

/** Lista archivos compartidos contigo (sharedWithMe) */
export async function getSharedWithMeContents(pageSize = 1000) {
  const drive = getDrive();
  try {
    const files: drive_v3.Schema$File[] = [];
    let nextPageToken: string | undefined = undefined;
    const q = "sharedWithMe = true and trashed = false";
    do {
      const response = await drive.files.list({
        q,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        fields: "nextPageToken, files(id,name,mimeType,parents)",
        orderBy: "name",
        pageSize,
        pageToken: nextPageToken,
      });
      const data: drive_v3.Schema$FileList = response.data;
      files.push(...(data.files || []));
      nextPageToken = data.nextPageToken || undefined;
    } while (nextPageToken);
    return files;
  } catch (error) {
    console.error("Error al obtener archivos compartidos contigo:", error);
    throw new Error("No se pudo obtener los archivos compartidos contigo");
  }
}

/**
 * Descarga un archivo como ArrayBuffer (útil para construir Response con Buffer.from(...))
 */
export async function downloadFileArrayBuffer(fileId: string) {
  const drive = getDrive();
  try {
    const res = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );
    return res.data as ArrayBuffer;
  } catch (error) {
    console.error("Error al descargar archivo (arraybuffer):", error);
    throw new Error("No se pudo descargar el archivo");
  }
}

/**
 * Descarga un archivo como stream (útil si quieres pipearlo directamente a la respuesta).
 */
export async function downloadFileStream(fileId: string) {
  const drive = getDrive();
  try {
    const res = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );
    return res.data;
  } catch (error) {
    console.error("Error al descargar archivo (stream):", error);
    throw new Error("No se pudo descargar el archivo");
  }
}