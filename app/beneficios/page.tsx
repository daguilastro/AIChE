"use client";

import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { useState } from "react";
import HeroBackground from "../components/hero_background"; // Importamos el componente

export default function Benefits() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="transition-all duration-500">
        {/* Hero Section actualizada */}
        <HeroBackground
          src="/assets/Img/beneficios.jpg"
          fit="cover"
          position="center"
          minHClassName="min-h-[340px] md:min-h-[400px]"
          withOverlay={true}
          overlayClassName="bg-gradient-to-b from-[#15325b]/95 via-[#15325b]/85 to-[#15325b]/95"
        >
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
          <div className="h-full w-full flex items-center justify-center text-center px-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Beneficios de Pertenecer a AIChE
              </h1>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                Ser parte del Capítulo Estudiantil AIChE no es solo pertenecer a
                un grupo, es tener acceso a un conjunto de oportunidades que
                fortalecen tu formación académica, profesional y personal.
              </p>
            </div>
          </div>
        </HeroBackground>

        {/* Corresponsabilidad */}
        <section className="py-16 px-4 md:px-8 lg:px-56 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#2A6E97] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-bold text-[#2A6E97] mb-4">
                  Corresponsabilidad
                </h2>
                <p className="text-gray-700 text-lg mb-4 text-justify">
                  Es una modalidad de participación que permite a estudiantes
                  con apoyos económicos institucionales (alimentación,
                  transporte, alojamiento) cumplir con las 16 horas exigidas por
                  la Universidad Nacional, mediante actividades dentro del
                  Capítulo AIChE UNAL Bogotá.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#EF8C44] mb-8">
              <h3 className="font-bold text-lg text-[#EF8C44] mb-4">
                Requisitos principales
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                  </div>
                  <span>
                    Ser miembro activo del Capítulo y beneficiario de apoyos
                    económicos.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                  </div>
                  <span>Participar en mínimo 3 actividades del Capítulo.</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                  </div>
                  <span>
                    Colaborar en la organización de al menos 1 actividad de
                    comité.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#EF8C44] rounded-full"></div>
                  </div>
                  <span>
                    Registrar la asistencia en los formularios correspondientes.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <a
                href="https://docs.google.com/spreadsheets/d/1DouPGSRz81YbSfyvAlft5V1tDsEvyeriwv4xf6gnizU/edit?usp=sharing"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2A6E97] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#1e5273]"
              >
                <span className="mr-2">Verificar estado</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Práctica Académica Especial */}
        <section className="py-16 px-4 md:px-8 lg:px-56 bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#629031] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-bold text-[#629031] mb-4">
                  Práctica Académica Especial (PAE)
                </h2>
                <p className="text-gray-700 text-lg mb-4 text-justify">
                  La PAE permite que estudiantes de Ingeniería Química vinculen
                  su participación en el AIChE al componente de libre elección
                  de su plan de estudios, obteniendo 3 créditos académicos. La
                  evaluación se basa en asistencia, participación y cumplimiento
                  de roles asignados.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-[#629031] mb-8 shadow-sm">
              <h3 className="font-bold text-lg text-[#629031] mb-4">
                Requisitos principales
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#629031] rounded-full"></div>
                  </div>
                  <span>Tener 3 créditos de libre elección disponibles.</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#629031] rounded-full"></div>
                  </div>
                  <span>Firmar el formato oficial de inscripción.</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2 mt-1">
                    <div className="w-full h-full bg-[#629031] rounded-full"></div>
                  </div>
                  <span>
                    Cumplir con reuniones, actividades y funciones de comité
                    según el rol asignado.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Becas Internacionales */}
        <section className="py-16 px-4 md:px-8 lg:px-56 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#EF8C44] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-bold text-[#EF8C44] mb-4">
                  Postulación a becas internacionales
                </h2>
                <p className="text-gray-700 text-lg mb-4 text-justify">
                  Como parte de la red global del AIChE (American Institute of
                  Chemical Engineers), nuestros miembros tienen acceso a
                  convocatorias y programas internacionales de gran valor.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#FFF8F2] p-6 rounded-lg border border-[#EF8C44]/20">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EF8C44]/20 mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-[#EF8C44]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <p className="text-center text-gray-700">
                  Becas para asistir a congresos y conferencias.
                </p>
              </div>
              <div className="bg-[#FFF8F2] p-6 rounded-lg border border-[#EF8C44]/20">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EF8C44]/20 mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-[#EF8C44]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <p className="text-center text-gray-700">
                  Programas de movilidad académica.
                </p>
              </div>
              <div className="bg-[#FFF8F2] p-6 rounded-lg border border-[#EF8C44]/20">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EF8C44]/20 mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-[#EF8C44]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-center text-gray-700">
                  Acceso a plataformas de formación y recursos exclusivos de
                  AIChE Global.
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-8">
              Estas oportunidades te permiten conectar con la comunidad
              internacional de ingenieros químicos y abrirte puertas para tu
              desarrollo profesional.
            </p>

            <div className="flex justify-center">
              <a
                href="https://docs.google.com/spreadsheets/d/1bPSoaaObM65vhYXm3U3k3U3-QgDtcato_6-EwLscbjE/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#EF8C44] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#e07d35]"
              >
                <span className="mr-2">Verificar estado de postulación</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Otros beneficios */}
        <section className="py-16 px-4 md:px-8 lg:px-56 bg-[#2A6E97] text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Más beneficios para ti
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Certificados */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">
                    Certificados de participación
                  </h3>
                </div>
                <p className="text-white/90 text-justify">
                  Cada actividad en la que participas dentro del Capítulo puede
                  ser reconocida con un certificado oficial del AIChE, que
                  respalda tu compromiso y liderazgo. Estos certificados
                  fortalecen tu hoja de vida, aportan a tus procesos académicos
                  y pueden marcar la diferencia en futuras convocatorias o
                  aplicaciones a becas.
                </p>
              </div>

              {/* Red de contactos */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Red de contactos</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Ser parte del AIChE significa conectarte con:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 mr-2 mt-1 bg-white/30 rounded-full"></div>
                    <span>
                      Estudiantes de diferentes semestres y facultades.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 mr-2 mt-1 bg-white/30 rounded-full"></div>
                    <span>
                      Profesores que apoyan el capítulo y sus proyectos.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 mr-2 mt-1 bg-white/30 rounded-full"></div>
                    <span>Egresados con experiencia en la industria.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 mr-2 mt-1 bg-white/30 rounded-full"></div>
                    <span>
                      Profesionales y conferencistas invitados a nuestras
                      actividades.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Canva Pro */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Canva Pro</h3>
                </div>
                <p className="text-white/90 text-justify">
                  Algunos de nuestros miembros tienen acceso a la herramienta
                  Canva Pro, que facilita el diseño de presentaciones,
                  infografías, pósters académicos y material visual de alta
                  calidad. Este beneficio no solo te ayudará en tus labores
                  dentro del Capítulo, sino también en proyectos personales y
                  académicos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 px-4 md:px-8 lg:px-56 bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-1 bg-[#EF8C44]/10 rounded-full mb-8">
              <div className="bg-[#EF8C44] p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xl font-medium text-gray-700 mb-8">
              Con AIChE, no solo fortaleces tu formación académica, sino que
              también construyes comunidad, amplías tus oportunidades y
              desarrollas habilidades que trascienden las aulas.
            </p>
            <div className="flex justify-center">
              <a
                href="https://forms.gle/Ph2QsQdAb58mdjFg6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#EF8C44] border-2 border-[#EF8C44] text-white hover:bg-transparent hover:text-[#EF8C44] font-bold text-lg rounded-lg transition-all duration-300"
              >
                ¡Únete ahora!
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}