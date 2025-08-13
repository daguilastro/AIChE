"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Solo aplicar parallax en pantallas mayores a 768px
      if (window.innerWidth < 768) return;

      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3; // Velocidad del efecto (hacia abajo)
        const yPos = scrolled * parallaxSpeed;

        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${yPos}px)`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-background">
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
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-background shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Contenedor principal con flex para separar contenido y footer */}
        <div className="h-full flex flex-col">
          {/* Contenido superior (header + menús) */}
          <div className="p-6">
            {/* Header del sidebar */}
            <div className="flex items-center justify-between mb-8 bg-[#2CAAEC] dark:bg-[#EF8C44] -m-6 p-6">
              <div className="ml-4">
                <Link href="/">
                  <img
                    src="assets/logos/logo_dark.png"
                    alt="AIChE Logo"
                    className="h-8 w-auto block dark:hidden"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="assets/logos/logo_dark.png"
                    alt="AIChE Logo"
                    className="h-8 w-auto hidden dark:block"
                  />
                </Link>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg active:bg-gray-300 dark:active:bg-[#EF8C44] transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-black dark:text-white"
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

            {/* Menu items */}
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200"
                >
                  Biblioteca
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200"
                >
                  Competencias & Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200"
                >
                  Beneficios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 px-4 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0b1f3b] hover:text-black dark:hover:text-white rounded-lg transition-colors duration-200"
                >
                  Galería
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de contacto pegada al fondo */}
          <div className="mt-auto p-6 pt-6">
            {/* Línea divisoria */}
            <div className="w-full h-px bg-[#2CAAEC] dark:bg-[#EF8C44] mb-4"></div>

            {/* Texto "Contáctanos" */}
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Contáctanos
            </h4>

            {/* Correo e Instagram */}
            <div className="flex items-center justify-between">
              {/* Correo */}
              <div className="flex-1">
                <a
                  href="mailto:aiche_fibog@unal.edu.co"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2CAAEC] dark:hover:text-[#EF8C44] transition-colors duration-200"
                >
                  aiche_fibog@unal.edu.co
                </a>
              </div>

              {/* Ícono de Instagram */}
              <div className="ml-4">
                <a
                  href="https://www.instagram.com/aiche_un/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#E4405F] transition-colors duration-200"
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

      {/* Header con botón hamburguesa */}
      <header className="fixed top-0 left-0 w-full bg-[#0B2A54] dark:bg-white backdrop-blur-sm border-b border-gray-200 dark:border-gray-200 z-30">
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
            <Link href="/">
              <img
                src="assets/logos/logo_dark.png"
                alt="AIChE Logo"
                className="h-8 w-auto block dark:hidden"
              />
            </Link>
            <Link href="/">
              <img
                src="assets/logos/logo_light.png"
                alt="AIChE Logo"
                className="h-8 w-auto hidden dark:block"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main
        className={
          "pt-16 transition-all duration-500 " +
          (isSidebarOpen ? "blur-sm" : "blur-none")
        }
      >
        {/* Hero Section con parallax contenido */}
        <section className="relative px-4 md:px-8 lg:px-56 py-8 lg:py-32 overflow-hidden">
          {/* Imagen de fondo con efecto parallax contenido */}
          <div
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[120%] bg-cover bg-bottom bg-no-repeat -top-[10%]"
            style={{
              backgroundImage: "url('/assets/Img/hero.jpg')",
            }}
          />

          {/* Gradiente overlay para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90 dark:from-background/90 dark:via-background/75 dark:to-background/90" />

          {/* Contenido del hero */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Título */}
            <div className="lg:flex-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#EF8C44] dark:text-white mb-8 leading-tight text-center lg:text-left">
                Bienvenidos a nuestro capítulo AIChE
              </h1>
            </div>
            {/* Texto secundario */}
            <div className="lg:flex-1 lg:pl-12">
              <div className="text-left px-2 lg:text-right">
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                  ¡Conócenos!
                </h2>
                <p className="text-gray-600 leading-loose dark:text-gray-300">
                  somos el capítulo AIChE (American Institute of Chemical
                  Engineers) de la Universidad Nacional de Colombia. Somos una
                  comunidad de estudiantes apasionados por la ingeniería
                  química, comprometidos con el aprendizaje, la innovación y el
                  desarrollo profesional. ¡Te invitamos a ser parte de esta
                  experiencia!
                </p>
                <div className="flex justify-center lg:justify-end mt-8">
                  <a
                    href="https://forms.gle/Ph2QsQdAb58mdjFg6"
                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-[#EF8C44] text-[#EF8C44] hover:bg-[#EF8C44] hover:text-white font-bold text-lg rounded-lg transition-all duration-300"
                  >
                    ¡Únete!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Misión */}
        <section className="bg-[#2A6E97]">
          <div className="lg:flex-1 lg:justify-between lg:mx-56">
            <h1 className="font-semibold dark:text-white text-3xl lg:py-10">
              Misión
            </h1>
            <p className="lg:pb-10 leading-loose">
              El Capítulo Estudiantil AIChE de la Universidad Nacional de
              Colombia, Sede Bogotá, tiene como misión fortalecer la formación
              integral de los y las estudiantes de Ingeniería Química mediante
              actividades académicas, culturales, sociales y de proyección
              profesional. A través del trabajo colaborativo en comités, fomenta
              el liderazgo, la gestión de proyectos, la divulgación científica y
              el compromiso con el entorno, contribuyendo al desarrollo de
              competencias técnicas, humanas y éticas.
            </p>
          </div>
        </section>
        { /* Section Visión */}
        <section className="bg-[#0B2A54]">
          <div className="lg:flex-1 lg:justify-between lg:mx-56">
            <h1 className="font-semibold dark:text-white text-3xl lg:py-10">
              Visión
            </h1>
            <p className="lg:pb-10 leading-loose">
              El Capítulo Estudiantil AIChE UNAL Bogotá será reconocido a nivel
              nacional e internacional como un referente de excelencia
              estudiantil en ingeniería química, caracterizado por su impacto en
              la comunidad académica, la industria y la sociedad, su capacidad
              de innovación en actividades de formación y divulgación, y por ser
              un espacio de integración y desarrollo profesional para sus
              miembros.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
