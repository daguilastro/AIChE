import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const drive = google.drive({ version: 'v3', auth: oauth2Client });

export async function getFolderContents(folderId: string) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id,name,mimeType,thumbnailLink,webContentLink,parents)',
      orderBy: 'name'
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error al obtener contenido de carpeta:', error);
    throw new Error('No se pudo obtener el contenido de la carpeta');
  }
}

export async function getFileInfo(fileId: string) {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,thumbnailLink,webContentLink,parents,size'
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del archivo:', error);
    throw new Error('No se pudo obtener la información del archivo');
  }
}

export async function getSharedWithMeContents() {
  try {
    const response = await drive.files.list({
      q: 'sharedWithMe = true and trashed = false',
      fields: 'files(id,name,mimeType,parents)',
      orderBy: 'name'
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error al obtener archivos compartidos contigo:', error);
    throw new Error('No se pudo obtener los archivos compartidos contigo');
  }
}

export async function downloadFile(fileId: string) {
  try {
    const response = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    return response.data;
  } catch (error) {
    console.error('Error al descargar archivo:', error);
    throw new Error('No se pudo descargar el archivo');
  }
}