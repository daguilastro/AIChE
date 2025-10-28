import { NextRequest, NextResponse } from 'next/server';
import { getFolderContents } from '~/app/lib/google-drive';

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }  // ✅ params es una Promise
) {
  // ✅ CRÍTICO: await params primero
  const params = await ctx.params;
  
  try {
    // Si el parámetro es 'root', usa la carpeta raíz configurada en tu .env.local
    const folderId = params.id === 'root'
      ? process.env.GOOGLE_ROOT_FOLDER_ID!
      : params.id;

    const files = await getFolderContents(folderId);

    // Separar carpetas e imágenes
    const folders = files.filter(file =>
      file.mimeType === 'application/vnd.google-apps.folder'
    );

    const images = files.filter(file =>
      file.mimeType?.startsWith('image/')
    );

    return NextResponse.json({
      success: true,
      data: {
        folders,
        images,
        total: files.length,
      },
    });
  } catch (error) {
    console.error('Error en API de carpetas:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener contenido de la carpeta' },
      { status: 500 }
    );
  }
}