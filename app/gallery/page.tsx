"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Sidebar from "../components/sidebar";
import HeroBackground from "../components/hero_background";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}
interface ApiFolderResponse {
  data: { folders: DriveFile[]; images: DriveFile[] };
  error?: string;
}

const ROOT_FOLDER_ID = "root";
const PAGE_SIZE = 16;

function buildImageSrc(id: string, w: number) {
  return `/api/drive/image/${id}?w=${w}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function fetchFolderImages(folderId: string): Promise<DriveFile[]> {
  const url = `/api/drive/folders/${folderId}`;
  console.log("[Gallery] GET", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("[Gallery] folders API error:", res.status, res.statusText);
    throw new Error(`HTTP ${res.status} al obtener carpeta ${folderId}`);
  }
  const json: ApiFolderResponse = await res.json();
  const images = (json.data?.images || []).filter((f) => f.mimeType?.startsWith("image/"));
  console.log("[Gallery] API images:", images.length);
  return images;
}

function CollageGrid({ images }: { images: DriveFile[] }) {
  return (
    <div
      className={`grid gap-4 ${
        images.length <= 1
          ? "grid-cols-1"
          : images.length === 2
          ? "grid-cols-1 md:grid-cols-2"
          : images.length === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {images.map((img, idx) => (
        <div key={`${img.id}-${idx}`} className="relative group">
          <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-500 group-hover:opacity-0">
            <img
              src={buildImageSrc(img.id, 800)}
              alt={img.name}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                const t = e.currentTarget;
                console.log("[Collage] loaded:", { id: img.id, w: t.naturalWidth, h: t.naturalHeight });
              }}
              onError={(e) => {
                console.error("[Collage] error cargando:", img.id, e);
                const target = e.currentTarget as HTMLImageElement;
                target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-[10000] scale-75 group-hover:scale-100">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white">
              <img
                src={buildImageSrc(img.id, 1600)}
                alt={`${img.name} (completa)`}
                className="max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain"
                onLoad={(e) => {
                  const t = e.currentTarget;
                  console.log("[Collage hover] loaded:", { id: img.id, w: t.naturalWidth, h: t.naturalHeight });
                }}
                onError={(e) => {
                  console.error("[Collage hover] error:", img.id, e);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const [allImages, setAllImages] = useState<DriveFile[]>([]);
  const [indexGroups, setIndexGroups] = useState<number[][]>([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentImages = useMemo(() => {
    if (!indexGroups.length) return [];
    const group = indexGroups[currentGroup] || [];
    return group.map((i) => allImages[i]).filter(Boolean);
  }, [indexGroups, currentGroup, allImages]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    console.log("[Gallery] loadAll() start");
    try {
      const imgs = await fetchFolderImages(ROOT_FOLDER_ID);
      setAllImages(imgs);

      const indices = shuffle(Array.from({ length: imgs.length }, (_, i) => i));
      const groups = chunk(indices, PAGE_SIZE);
      console.log("[Gallery] groups:", { groups: groups.length, pageSize: PAGE_SIZE });

      setIndexGroups(groups);
      setCurrentGroup(0);
    } catch (e) {
      console.error("[Gallery] loadAll error:", e);
    } finally {
      setLoading(false);
      console.log("[Gallery] loadAll() finished");
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (!indexGroups.length) return;
    console.log("[Gallery] currentGroup:", currentGroup, "indexes:", indexGroups[currentGroup]);
  }, [currentGroup, indexGroups]);

  // Navegación con teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!indexGroups.length || loading) return;
      if (e.key === "ArrowLeft")
        setCurrentGroup((g) => (g - 1 + indexGroups.length) % indexGroups.length);
      if (e.key === "ArrowRight")
        setCurrentGroup((g) => (g + 1) % indexGroups.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indexGroups.length, loading]);

  const goPrev = () => {
    if (!indexGroups.length) return;
    setCurrentGroup((g) => (g - 1 + indexGroups.length) % indexGroups.length);
  };
  const goNext = () => {
    if (!indexGroups.length) return;
    setCurrentGroup((g) => (g + 1) % indexGroups.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Botón hamburguesa */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-md shadow-md transition-all duration-200 z-[60]"
          aria-label="Abrir menú de navegación"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* HERO */}
      <HeroBackground
        src="/assets/Img/gallery.jpeg"
        fit="cover"
        position="50% 60%"
        minHClassName="min-h-[240px] md:min-h-[300px] lg:min-h-[360px]"
        withOverlay={true}
      >
        {/* Este div ahora sí se centrará correctamente */}
        <div className="h-full w-full flex items-center justify-center text-center px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Galería</h1>
        </div>
      </HeroBackground>

      {/* Flechas laterales */}
      {!loading && indexGroups.length > 0 && (
        <>
          <button
            onClick={goPrev}
            className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/45 hover:bg-black/60 text-white shadow-xl backdrop-blur-sm"
            aria-label="Grupo anterior"
          >
            <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 6l-6 6 6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={goNext}
            className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/45 hover:bg-black/60 text-white shadow-xl backdrop-blur-sm"
            aria-label="Siguiente grupo"
          >
            <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 6l6 6-6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Contenido */}
      <section className="flex-1 px-4 md:px-8 lg:px-56 pb-16 pt-8">
        {loading && <div className="py-10 text-center text-gray-500 animate-pulse">Cargando imágenes…</div>}
        {!loading && currentImages.length === 0 && (
          <div className="py-10 text-center text-gray-500">No hay imágenes para mostrar.</div>
        )}
        {!loading && currentImages.length > 0 && <CollageGrid images={currentImages} />}
      </section>
    </div>
  );
}