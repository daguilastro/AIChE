"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import NextImage from "next/image";
import Sidebar from "../components/sidebar"; // <-- NUEVO IMPORT (ajusta la ruta si es necesario)

/* ===================== Tipos ===================== */
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}
interface ApiFolderResponse {
  data: { folders: DriveFile[]; images: DriveFile[] };
  error?: string;
}

/* ===================== Config base ===================== */
const LARGE_WIDTH = 1600;
const COLLAGE_WIDTH_PARAM = 600;
const ROOT_FOLDER_ID = "root";

/* Parámetros del algoritmo de muestreo (fijos para 20 fotos) */
const SAMPLING_CONFIG = {
  targetImages: 20,
  maxFolders: 30,
  timeBudgetMs: 10000,

  exploreProb: 0.7,
  exploreProbBoostWhenLow: 0.2,
  firstImagePickProb: 0.9,
  additionalImageProb: 0.8,
  maxImagesPerFolder: 4,

  rescueExploreProb: 0.95,
  rescueAdditionalProb: 0.75,
};

/* ============ Helpers ============ */
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
function rand() {
  return Math.random();
}

/* ============ Lightbox ============ */
function Lightbox({
  index,
  images,
  onClose,
  onNavigate,
}: {
  index: number;
  images: DriveFile[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  const img = images[index];
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preload = (i: number) => {
      if (i < 0 || i >= images.length) return;
      const tag = new window.Image();
      tag.src = buildImageSrc(images[i].id, LARGE_WIDTH);
    };
    preload((index + 1) % images.length);
    preload((index - 1 + images.length) % images.length);
  }, [index, images]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate(index + 1);
      else if (e.key === "ArrowLeft") onNavigate(index - 1);
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNavigate]);

  const wrappedNav = (i: number) =>
    onNavigate(((i % images.length) + images.length) % images.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-6xl h-[90vh] mx-4 flex flex-col">
        <div className="flex justify-between items-center mb-2 text-white text-sm gap-4">
          <span className="truncate">
            {index + 1}/{images.length} — {img.name}
            {!loaded && !error && " (cargando...)"}
            {error && " (error)"}
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring focus:ring-white/40"
          >
            Cerrar (Esc)
          </button>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-lg bg-black">
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/60 text-xs animate-pulse">
                Cargando imagen grande...
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-300 text-sm">
              Error cargando
            </div>
          )}
          <NextImage
            key={img.id}
            src={buildImageSrc(img.id, LARGE_WIDTH)}
            alt={img.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 90vw"
            className={`object-contain transition-opacity ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setLoaded(true)}
            onError={() => setError("error")}
          />
          {images.length > 1 && !error && (
            <>
              <button
                aria-label="Anterior"
                onClick={() => wrappedNav(index - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 text-2xl"
              >
                ‹
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => wrappedNav(index + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 text-2xl"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ Collage ============ */
function Collage({
  images,
  onClickImage,
  collageKey,
}: {
  images: DriveFile[];
  onClickImage: (i: number) => void;
  collageKey: number;
}) {
  const styleFor = (id: string, idx: number) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
    h = Math.abs(h + collageKey + idx);
    const radius = ["rounded-lg", "rounded-xl", "rounded-2xl"][h % 3];
    const shadow = ["shadow-sm", "shadow", "shadow-md"][h % 3];
    const hover = [
      "hover:brightness-110",
      "hover:contrast-110",
      "hover:saturate-125",
    ][h % 3];
    return `${radius} ${shadow} ${hover}`;
  };

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 [column-fill:_balance]">
      {images.map((img, i) => (
        <div
          key={img.id}
          className="mb-4 break-inside-avoid relative group cursor-pointer"
          onClick={() => onClickImage(i)}
        >
          <img
            src={buildImageSrc(img.id, COLLAGE_WIDTH_PARAM)}
            alt={img.name}
            className={`w-full h-auto object-cover transition duration-300 ${styleFor(
              img.id,
              i
            )}`}
            loading="lazy"
            decoding="async"
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/30 flex items-end p-2 text-white text-xs rounded-xl">
            <span className="line-clamp-2">{img.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ Sampling con garantía de 20 ============ */
interface SamplingResult {
  images: DriveFile[];
  visitedFolders: number;
  fetchedFolders: number;
  elapsedMs: number;
  partial: boolean;
  filledFromPool: boolean;
}

async function fetchFolder(
  folderId: string
): Promise<{ folders: DriveFile[]; images: DriveFile[] }> {
  const res = await fetch(`/api/drive/folders/${folderId}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} en carpeta ${folderId}`);
  const json: ApiFolderResponse = await res.json();
  return {
    folders: json.data.folders || [],
    images: (json.data.images || []).filter((f) =>
      f.mimeType?.startsWith("image/")
    ),
  };
}

async function sampleImagesRecursive(
  rootId: string,
  config: typeof SAMPLING_CONFIG,
  signal?: AbortSignal
): Promise<SamplingResult> {
  const start = performance.now();
  const queue: string[] = [rootId];
  const visited = new Set<string>();
  const selected: DriveFile[] = [];
  const selectedIds = new Set<string>();

  const poolIds = new Set<string>();
  const poolImages: DriveFile[] = [];
  const deferredSubfolders: string[] = [];
  let fetchedFolders = 0;

  const {
    targetImages,
    maxFolders,
    timeBudgetMs,
    exploreProb,
    exploreProbBoostWhenLow,
    firstImagePickProb,
    additionalImageProb,
    maxImagesPerFolder,
    rescueExploreProb,
    rescueAdditionalProb,
  } = config;

  const timeExceeded = () => performance.now() - start > timeBudgetMs;

  const processFolder = async (folderId: string, phase: "main" | "rescue") => {
    if (visited.has(folderId)) return;
    visited.add(folderId);
    if (signal?.aborted) return;

    let data: { folders: DriveFile[]; images: DriveFile[] };
    try {
      data = await fetchFolder(folderId);
      fetchedFolders++;
    } catch {
      return;
    }

    for (const im of data.images) {
      if (!poolIds.has(im.id)) {
        poolIds.add(im.id);
        poolImages.push(im);
      }
    }

    const shuffledImages = shuffle(data.images);
    let takenInFolder = 0;

    if (shuffledImages.length) {
      if (phase === "main") {
        if (rand() < firstImagePickProb) {
          const first = shuffledImages[0];
          if (!selectedIds.has(first.id)) {
            selected.push(first);
            selectedIds.add(first.id);
            takenInFolder++;
          }
          for (
            let i = 1;
            i < shuffledImages.length && takenInFolder < maxImagesPerFolder;
            i++
          ) {
            if (selected.length >= targetImages) break;
            if (rand() < additionalImageProb) {
              const im = shuffledImages[i];
              if (!selectedIds.has(im.id)) {
                selected.push(im);
                selectedIds.add(im.id);
                takenInFolder++;
              }
            } else break;
          }
        }
      } else {
        for (
          let i = 0;
          i < shuffledImages.length && takenInFolder < maxImagesPerFolder;
          i++
        ) {
          if (selected.length >= targetImages) break;
          const p = i === 0 ? 1 : rescueAdditionalProb;
          if (rand() < p) {
            const im = shuffledImages[i];
            if (!selectedIds.has(im.id)) {
              selected.push(im);
              selectedIds.add(im.id);
              takenInFolder++;
            }
          } else if (i !== 0) {
            break;
          }
        }
      }
    }

    const shuffledFolders = shuffle(data.folders);
    if (phase === "main") {
      const progressRatio = selected.length / targetImages;
      const dynamicExploreProb =
        progressRatio < 0.5
          ? Math.min(1, exploreProb + exploreProbBoostWhenLow)
          : exploreProb;

      for (const sub of shuffledFolders) {
        if (selected.length >= targetImages) break;
        if (visited.has(sub.id)) continue;
        if (rand() < dynamicExploreProb) queue.push(sub.id);
        else deferredSubfolders.push(sub.id);
      }
    } else {
      if (selected.length < targetImages) {
        for (const sub of shuffledFolders) {
          if (selected.length >= targetImages) break;
          if (visited.has(sub.id)) continue;
          if (rand() < rescueExploreProb) queue.push(sub.id);
        }
      }
    }
  };

  while (queue.length && selected.length < targetImages) {
    if (timeExceeded()) break;
    if (visited.size >= maxFolders) break;
    const folderId = queue.shift()!;
    await processFolder(folderId, "main");
  }

  if (
    selected.length < targetImages &&
    !timeExceeded() &&
    deferredSubfolders.length
  ) {
    const secondPass = shuffle(deferredSubfolders).slice(0, 40);
    for (const folderId of secondPass) {
      if (selected.length >= targetImages) break;
      if (timeExceeded() || visited.size >= maxFolders) break;
      await processFolder(folderId, "main");
    }
  }

  if (selected.length < targetImages && !timeExceeded()) {
    const rescueQueue = shuffle(
      deferredSubfolders.filter((f) => !visited.has(f))
    );
    while (rescueQueue.length && selected.length < targetImages) {
      if (timeExceeded() || visited.size >= maxFolders) break;
      const folderId = rescueQueue.shift()!;
      await processFolder(folderId, "rescue");
    }
  }

  let filledFromPool = false;
  if (selected.length < targetImages) {
    const remainingPool = shuffle(
      poolImages.filter((im) => !selectedIds.has(im.id))
    );
    for (const im of remainingPool) {
      if (selected.length >= targetImages) break;
      selected.push(im);
      selectedIds.add(im.id);
      filledFromPool = true;
    }
  }

  const partial = selected.length < targetImages;

  return {
    images: selected.slice(0, targetImages),
    visitedFolders: visited.size,
    fetchedFolders,
    elapsedMs: performance.now() - start,
    partial,
    filledFromPool,
  };
}

/* ============ Página principal ============ */
export default function GalleryCollageSampling() {
  const [samplingImages, setSamplingImages] = useState<DriveFile[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [collageKey, setCollageKey] = useState(Date.now());

  const [isSampling, setIsSampling] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  // Estado para Sidebar (NUEVO)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const abortRef = useRef<AbortController | null>(null);

  const runSampling = useCallback(async () => {
    if (isSampling) return;
    setIsSampling(true);
    setSamplingImages([]);
    setLightboxIndex(null);
    setCollageKey(Date.now());
    setStatusMsg("Generando collage...");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await sampleImagesRecursive(
        ROOT_FOLDER_ID,
        SAMPLING_CONFIG,
        controller.signal
      );
      setSamplingImages(result.images);
      setCollageKey(Date.now());

      let suffix = "";
      if (result.partial) {
        suffix = " | (No había suficientes imágenes únicas para llegar a 20)";
      } else if (result.filledFromPool) {
        suffix = " | Completado desde pool";
      }

      setStatusMsg(
        `Imágenes: ${result.images.length} | Carpetas: ${
          result.visitedFolders
        } | Requests: ${
          result.fetchedFolders
        } | Tiempo: ${result.elapsedMs.toFixed(0)}ms${suffix}`
      );
    } catch (e: any) {
      if (e.name === "AbortError") {
        setStatusMsg("Cancelado.");
      } else {
        setStatusMsg("Error en muestreo.");
        console.error(e);
      }
    } finally {
      setIsSampling(false);
    }
  }, [isSampling]);

  useEffect(() => {
    runSampling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const navigateLightbox = (newAbs: number) => {
    const total = samplingImages.length;
    if (!total) return;
    const wrapped = ((newAbs % total) + total) % total;
    setLightboxIndex(wrapped);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sidebar (NUEVO) */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* HERO */}
      <section className="relative px-4 md:px-8 lg:px-56 py-10 lg:py-20 overflow-hidden">
        <div
            className="
    absolute inset-0 w-full h-[120%]
    bg-cover bg-no-repeat -top-[10%]
    bg-[center_-20px]
    md:bg-[center_-500px]
  "
            style={{ backgroundImage: "url('/assets/Img/gallery.jpg')" }}
          />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90 dark:from-background/90 dark:via-background/75 dark:to-background/90" />

        {/* Botón hamburguesa (NUEVO) sólo si sidebar cerrada */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 p-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-md shadow-md transition-all duration-200 z-[60]"
            aria-label="Abrir menú de navegación"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Galería</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-200">
            Explora los momentos inolvidables que hemos vivido juntos!
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={runSampling}
              disabled={isSampling}
              className="px-5 py-2 rounded-lg bg-[#EF8C44] text-white font-medium hover:bg-[#ff9a4d] disabled:opacity-50 transition shadow-sm"
            >
              {isSampling ? "Generando..." : "Nuevo collage"}
            </button>
          </div>
          <div className="text-xs text-gray-300 min-h-[1.25rem]">
            {statusMsg}
          </div>
        </div>
      </section>

      {/* Collage */}
      <section className="flex-1 px-4 md:px-8 lg:px-56 pb-16 pt-8 bg-background/40">
        {isSampling && samplingImages.length === 0 && (
          <div className="py-10 text-center text-gray-300 animate-pulse">
            Muestreando carpetas...
          </div>
        )}

        {!isSampling && samplingImages.length === 0 && (
          <div className="py-10 text-center text-gray-500 text-sm">
            No se obtuvieron imágenes. Intenta de nuevo.
          </div>
        )}

        {samplingImages.length > 0 && (
          <Collage
            images={samplingImages}
            collageKey={collageKey}
            onClickImage={openLightbox}
          />
        )}
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          images={samplingImages}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}
