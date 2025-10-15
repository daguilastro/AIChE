"use client";

import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <>
      {/* Overlay oscuro del sidebar */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "backdrop-blur-md opacity-100 visible"
            : "backdrop-blur-none opacity-0 invisible pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-background shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8 bg-[#EF8C44] -m-6 p-6">
              <div className="ml-4">
                <Link href="/">
                  <img
                    src="assets/logos/logo_dark_hd.png"
                    alt="AIChE Logo"
                    className="h-14 w-auto block"
                  />
                </Link>

              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg active:bg-[#EF8C44] transition-colors duration-200"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/biblioteca"
                  className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200"
                >
                  Biblioteca
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200"
                >
                  Competencias & Proyectos
                </a>
              </li>
              <li>
                <a
                  href="/beneficios"
                  className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200"
                >
                  Beneficios
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200"
                >
                  Galería
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-auto p-6 pt-6">
            <div className="w-full h-px bg-[#EF8C44] mb-4"></div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Contáctanos
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <a
                  href="mailto:aiche_fibog@unal.edu.co"
                  className="text-sm text-gray-400 hover:text-[#EF8C44] transition-colors duration-200"
                >
                  aiche_fibog@unal.edu.co
                </a>
              </div>
              <div className="ml-4">
                <a
                  href="https://www.instagram.com/aiche_un/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-[#E4405F] transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.8 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
