import { google } from 'googleapis';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

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
  );

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

async function getDrive() {
  const auth = getOAuthClient();
  return google.drive({ version: 'v3', auth });
}

// ✅ SOLUCIÓN: Usar la firma exacta que Next.js 15 espera
export async function GET(
  req: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  // ✅ Await params
  const params = await segmentData.params;
  const fileId = params.id;

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
  } catch (e: unknown) {
    const error = e as { message?: string };
    console.error('Drive image proxy error:', error?.message);
    return new Response('Not found', { status: 404 });
  }
}