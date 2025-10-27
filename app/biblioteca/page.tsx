"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Image from "next/image";

export default function Biblioteca() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
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
    <div className="min-h-screen bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <main className="transition-all duration-500">
        {/* Hero Section */}
        <section className="relative px-8 md:px-8 lg:px-56 py-8 lg:py-30 bg-[#15325b] text-white overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[170%] bg-cover bg-no-repeat -top-[60%] bg-[center_-10px] md:bg-[center_-250px]"
            style={{
              backgroundImage: "url('/assets/Img/herobiblio.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#15325b]/95 via-[#15325b]/85 to-[#15325b]/95" />
          
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed top-4 left-4 p-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-md shadow-md transition-all duration-200 z-[60]"
              aria-label="Abrir menú de navegación"
              aria-expanded="false"
              aria-controls="sidebar-nav"
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
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Biblioteca
            </h1>
            <p className="text-lg text-center text-gray-200 max-w-3xl mx-auto">
              En el Capítulo Estudiantil AIChE creemos en la importancia de
              compartir conocimiento. Por eso ponemos a disposición de nuestros
              miembros y de la comunidad estudiantil una colección de libros
              especializados en Ingeniería Química, Química, Cálculo,
              Termodinámica, Fundamentos de Ingeniería y áreas afines.
            </p>
          </div>
        </section>

        {/* Sección Manual de préstamo */}
        <section className="bg-[#2A6E97] py-16">
          <div className="container mx-auto px-10 md:px-8 lg:px-10">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 pr-0 lg:pr-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Manual de préstamo de libros
                </h2>
                <p className="text-white text-lg leading-relaxed mb-8">
                  Con el fin de garantizar el acceso y el cuidado de nuestra
                  colección, hemos establecido un sistema de préstamo sencillo:
                </p>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  Requisitos
                </h3>
                <ul className="text-white text-lg mb-6 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mr-3 mt-1">
                      <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                    </div>
                    <span>
                      Presentar (cédula, licencia de
                      conducción o carné estudiantil)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mr-3 mt-1">
                      <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                    </div>
                    <span>
                      El préstamo se realiza únicamente de forma presencial, en el
                      horario establecido.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Línea divisoria vertical (visible solo en desktop) */}
              <div className="hidden lg:block lg:w-0.5 bg-white/30 self-stretch mx-8"></div>

              <div className="lg:w-1/3 pt-8 lg:pt-0">
                <div className="pl-0 lg:pl-0">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Horario de préstamo y devolución
                  </h3>
                  <div className="flex flex-col text-white text-lg space-y-4 mb-8">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-[#EF8C44] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Viernes</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-[#EF8C44] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>9:15 am – 10:15 am</span>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 mr-3 text-[#EF8C44] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Vigente durante el semestre académico 2025-2</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Ubicación
                  </h3>
                  <p className="text-white text-lg mb-8 flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-[#EF8C44] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>Oficina 301 - Edificio 453 (Aulas de Ingeniería)</span>
                  </p>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Condiciones
                  </h3>
                  <ul className="text-white text-lg mb-6 space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mr-3 mt-1">
                        <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                      </div>
                      <span>Préstamo inicial: 15 días calendario.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mr-3 mt-1">
                        <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                      </div>
                      <span>
                        Renovación: una sola vez por 7 días adicionales
                        (solicitándola al correo
                        <a
                          href="mailto:aiche_fibog@unal.edu.co"
                          className="text-[#EF8C44] hover:underline ml-1 font-medium"
                        >
                          aiche_fibog@unal.edu.co
                        </a>
                        )
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="hidden lg:block lg:w-0.5 bg-white/30 self-stretch mx-8"></div>
              
              <div className="lg:w-1/3 pt-8 lg:pt-0">
                <div className="relative h-full w-full min-h-[400px] md:min-h-[500px]">
                  <Image
                    src="/assets/Img/manual.png"
                    alt="Manual de préstamo"
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catálogos */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-56">
            <h2 className="text-3xl font-bold text-[#2A6E97] mb-12 text-center">
              Catálogos de Libros
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Catálogo Físico */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-[#2A6E97]/10">
                  <svg
                    className="w-8 h-8 text-[#2A6E97]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2A6E97] mb-4 text-center">
                  Catálogo de Libros Físicos
                </h3>
                <p className="text-gray-700 text-lg text-center mb-6">
                  Consulta nuestra colección de libros disponibles para préstamo
                  físico.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://docs.google.com/spreadsheets/d/1_V5nwLBr3jQJJXl4oxb6cgOVEQNNTOLD1rJUzj0Ws20/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#2A6E97] hover:bg-[#1d5a7f] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Ver Catálogo Físico
                  </a>
                </div>
              </div>

              {/* Catálogo Digital */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-[#EF8C44]/10">
                  <svg
                    className="w-8 h-8 text-[#EF8C44]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#EF8C44] mb-4 text-center">
                  Catálogo de Libros Virtuales
                </h3>
                <p className="text-gray-700 text-lg text-center mb-6">
                  ¿No encontraste el libro que buscabas? Consulta nuestra
                  biblioteca digital en constante crecimiento.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://docs.google.com/spreadsheets/d/18rNhpH9yvZfvZFioeXuP4l-b-OGfd7CG1RLwZ_9Y-K0/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#EF8C44] hover:bg-[#e07d35] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Ver Catálogo Virtual
                  </a>
                </div>
              </div>
            </div>

            {/* Drive compartido */}
            <div className="mt-16 text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-[#2A6E97] mb-4">
                Accede a la Biblioteca Digital
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                Explora nuestro repositorio compartido con recursos digitales de
                interés.
              </p>
              <a
                href="https://drive.google.com/drive/folders/0APF8VBZOHghoUk9PVA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2A6E97] to-[#EF8C44] hover:from-[#1d5a7f] hover:to-[#e07d35] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 87.3 78" fill="none">
                  <path
                    d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5l5.4 9.35z"
                    fill="#0066da"
                  />
                  <path
                    d="M43.65 25l-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5l16.15-28z"
                    fill="#00ac47"
                  />
                  <path
                    d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.1 8.8 8.65 15z"
                    fill="#ea4335"
                  />
                  <path
                    d="M43.65 25l13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2l13.75 23.8z"
                    fill="#00832d"
                  />
                  <path
                    d="M59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2l-13.75-23.8z"
                    fill="#2684fc"
                  />
                  <path
                    d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.65-22z"
                    fill="#ffba00"
                  />
                </svg>
                Acceder al Drive Compartido
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}