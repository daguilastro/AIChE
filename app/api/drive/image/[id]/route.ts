import { google } from 'googleapis';

export const runtime = 'nodejs'; // Asegura entorno Node (googleapis no funciona bien en edge)

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function ensureEnv() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error('Faltan variables OAuth: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN');
  }
  return { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN };
}

function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = ensureEnv();

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
    // redirectURL no es necesario aquí porque ya tenemos refresh_token
  );

  // Establecemos el refresh_token; googleapis gestionará el access_token internamente
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
    // scopes no hace falta repetirlos aquí; se asociaron cuando obtuviste el refresh_token
  });

  return oauth2Client;
}

async function getDrive() {
  const auth = getOAuthClient();
  return google.drive({ version: 'v3', auth });
}

export async function GET(
  req: Request,
  ctx: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const resolved = await ctx.params;
  const fileId = resolved?.id;

  if (!fileId) {
    return new Response('Missing id', { status: 400 });
  }

  try {
    const drive = await getDrive();

    const meta = await drive.files.get({
      fileId,
      fields: 'id,name,mimeType',
      supportsAllDrives: true,
    });

    const mimeType = meta.data.mimeType || 'application/octet-stream';

    const fileRes = await drive.files.get(
      {
        fileId,
        alt: 'media',
        supportsAllDrives: true,
      },
      { responseType: 'arraybuffer' }
    );

    const data = Buffer.from(fileRes.data as ArrayBuffer);

    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      },
    });
  } catch (e: any) {
    console.error('Drive image proxy error:', e?.message);
    return new Response('Not found', { status: 404 });
  }
}