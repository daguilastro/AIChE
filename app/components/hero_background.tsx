"use client";

import Image from "next/image";
import { type ReactNode, type CSSProperties } from "react";

type Props = {
  src: string;
  alt?: string;
  position?: string;
  fit?: "contain" | "cover";
  minHClassName?: string;
  backgroundColor?: string;
  withOverlay?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
};

export default function HeroBackground({
  src,
  alt = "",
  position = "50% 50%",
  fit = "cover",
  minHClassName = "min-h-[320px] md:min-h-[420px] lg:min-h-[520px]",
  backgroundColor = "#0b1f39",
  withOverlay = true,
  overlayClassName = "bg-gradient-to-b from-[#15325b]/75 via-[#15325b]/70 to-[#15325b]/85",
  children,
}: Props) {
  const imgStyle: CSSProperties = {
    objectFit: fit,
    objectPosition: position,
  };

  return (
    <section
      className={`relative w-full ${minHClassName} overflow-hidden`}
      aria-label={alt || "Hero"}
    >
      {/* Fondo de color */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor }} />

      {/* Imagen de fondo */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 select-none"
        style={imgStyle}
        onError={(e) => {
          console.error("[HeroBackground] onError for src:", src, e);
        }}
      />

      {/* Overlay degradado */}
      {withOverlay && (
        <div
          className={`absolute inset-0 z-10 ${overlayClassName} pointer-events-none`}
        />
      )}

      {/* Contenedor para el contenido (¡LA SOLUCIÓN!) */}
      {/* Se estira para llenar la sección, permitiendo que `h-full` funcione en el hijo. */}
      <div className="absolute inset-0 z-20">{children}</div>
    </section>
  );
}