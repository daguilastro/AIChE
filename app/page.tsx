'use client';

import { useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Overlay oscuro */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen 
            ? 'backdrop-blur-md opacity-100 visible' 
            : 'backdrop-blur-none opacity-0 invisible pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-background shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between mb-8 bg-[#2CAAEC] dark:bg-[#EF8C44] -m-6 p-6">
            <div className="ml-4">
              <img 
                src="assets/logos/logo_dark.png" 
                alt="AIChE Logo" 
                className="h-8 w-auto block dark:hidden"
              />
              <img 
                src="assets/logos/logo_dark.png" 
                alt="AIChE Logo" 
                className="h-8 w-auto hidden dark:block"
              />
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg active:bg-gray-300 dark:active:bg-[#0b1f3b] transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <ul className="space-y-4">
            <li>
              <a href="#" className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200">
                Biblioteca
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200">
                Competencias & Proyectos
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200">
                Beneficios
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200">
                Galería
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header con botón hamburguesa */}
      <header className="fixed top-0 left-0 w-full bg-[#0B2A54] dark:bg-white backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-30">
        <div className="flex items-center px-4 py-3">
          {/* Botón hamburguesa */}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#0b1f3b] dark:hover:bg-gray-300 dark:active:bg-gray-300 touch-manipulation transition-colors duration-200"
            aria-label="Abrir menú de navegación"
          >
            <svg 
              className="w-6 h-6 text-white dark:text-gray-700" 
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
              src="assets/logos/logo_dark.png" 
              alt="AIChE Logo" 
              className="h-8 w-auto block dark:hidden"
            />
            <img 
              src="assets/logos/logo_light.png" 
              alt="AIChE Logo" 
              className="h-8 w-auto hidden dark:block"
            />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className={"pt-16"}>
        {/* Hero Section */}
<div className="mb-16 px-4 md:px-8 lg:px-56 py-8 lg:py-32">
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
    {/* Título */}
    <div className="lg:flex-1">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-8 leading-tight text-center lg:text-left">
        Bienvenidos al mejor capítulo del mundo
      </h1>
    </div>
    
    {/* Texto secundario */}
    <div className="lg:flex-1 lg:pl-12">
      <div className="text-left px-2 lg:text-right">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Hola!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vehicula sapien. Fusce consequat sapien tempus lectus rhoncus hendrerit. Integer gravida, erat et mattis egestas. 
        </p>
      </div>
    </div>
  </div>
</div>
      </main>
    </div>
  );
}