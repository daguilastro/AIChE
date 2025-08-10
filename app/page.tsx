'use client';

import { useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay oscuro */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-80 bg-background shadow-xl z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Menú</h2>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-[#0b1f3b] active:bg-[#0b1f3b] transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <ul className="space-y-4">
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                ¿Quiénes somos?
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                ¿Qué hacemos?
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Biblioteca
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Competencias/Proyectos
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Beneficios
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Galería
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-white hover:bg-[#0b1f3b] hover:text-white rounded-lg transition-colors duration-200">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header con botón hamburguesa */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-30">
        <div className="flex items-center px-4 py-3">
          {/* Botón hamburguesa */}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-300 active:bg-gray-400 touch-manipulation transition-colors duration-200"
            aria-label="Abrir menú de navegación"
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
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
          
          {/* Logo/Título */}
          <div className="ml-4">
              <img 
                src="assets/logos/logo.png" 
                alt="AIChE Logo" 
                className="h-8 w-auto block"
              />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className={"pt-16 transition-all duration-500 " + (isSidebarOpen ? "blur-sm" : "blur-none")}>
      </main>
    </div>
  );
}