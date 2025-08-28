import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [showCopied, setShowCopied] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aiche_fibog@unal.edu.co");
      setShowCopied(true);
      setFadeOut(false);

      // Después de 1.5 segundos, empezar el fade out
      setTimeout(() => {
        setFadeOut(true);
      }, 300);

      // Después de la transición (500ms más), destruir el elemento
      setTimeout(() => {
        setShowCopied(false);
        setFadeOut(false);
      }, 1000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <footer className="bg-gray-800 text-white w-full overflow-x-hidden">
      {/* Contenedor centrado y responsivo: padding reducido en móvil */}
      <div className="container mx-auto flex flex-row justify-center py-8 px-4 md:px-12 lg:px-56 gap-x-4 max-w-full">
        <Image
          src="/assets/logos/logo_dark_hd.png"
          alt="Descripción de la imagen"
          width={200}
          height={100}
        />
        <div className="h-full bg-gray-700 w-0.5" />
        <div className="flex flex-col h-full justify-center">
          <h1 className="mb-2 font-semibold">Contáctanos</h1>

          {/* Íconos */}
          <div className="flex items-center justify-evenly mb-2">
            <button
              onClick={copyEmail}
              className="relative hover:scale-110 transition-transform duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-400 hover:text-[#2CAAEC] transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>

              {showCopied && (
                <div
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity duration-300 ${
                    fadeOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Copiado
                </div>
              )}
            </button>

            <a
              href="https://www.instagram.com/aiche_un/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit"
            >
              <svg
                className="w-5 h-5 ml-0.5 text-gray-400 hover:text-[#E4405F] transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Ícono de Facebook */}
            <a
              href="https://www.facebook.com/share/1W42sdUKpJ/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit"
            >
              <svg
                className="w-5 h-5 text-gray-400 hover:text-[#1877F2] transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}