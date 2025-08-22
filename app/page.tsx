"use client";

import { useState, useEffect, useRef } from "react";
import ComiteSelector from "~/app/components/comite_selector";
import Footer from "./components/footer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

type Comite = {
  id: number;
  name: string;
  image: string;
  color: string;
  description: string;
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComite, setSelectedComite] = useState<Comite | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const defaultText =
    "El Capítulo Estudiantil AIChE UNAL Bogotá organiza sus actividades a través de seis Comités de Trabajo especializados, cada uno con funciones específicas que contribuyen al cumplimiento de los objetivos del capítulo. Cada comité está liderado por un/a coordinador/a que forma parte del Comité de Planeación.";

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
    <div className="min-h-screen bg-white dark:bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <main className={"transition-all duration-500"}>
        <section className="relative px-4 md:px-8 lg:px-56 py-8 lg:py-32 overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[120%] bg-cover bg-bottom bg-no-repeat -top-[10%]"
            style={{
              backgroundImage: "url('/assets/Img/hero.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90 dark:from-background/90 dark:via-background/75 dark:to-background/90" />
          <button
            onClick={toggleSidebar}
            className="absolute top-8 left-8 p-3 rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-200 z-20"
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
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="lg:flex-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#EF8C44] dark:text-white mb-8 leading-tight text-center lg:text-left">
                Bienvenidos a nuestro capítulo AIChE
              </h1>
            </div>
            <div className="lg:flex-1 lg:pl-12">
              <div className="text-left px-2 lg:text-right">
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                  ¡Conócenos!
                </h2>
                <p className="text-gray-600 text-justify leading-loose dark:text-gray-300">
                  Somos el capítulo AIChE (American Institute of Chemical
                  Engineers) de la Universidad Nacional de Colombia. Somos una
                  comunidad de estudiantes apasionados por la ingeniería
                  química, comprometidos con el aprendizaje, la innovación y el
                  desarrollo profesional. ¡Te invitamos a ser parte de esta
                  experiencia!
                </p>
                <div className="flex justify-center lg:justify-end mt-8">
                  <a
                    href="https://forms.gle/Ph2QsQdAb58mdjFg6"
                    className="inline-flex items-center justify-center px-8 py-3  bg-[#EF8C44] border-2 border-[#EF8C44] text-white hover:bg-transparent hover:text-white font-bold text-lg rounded-lg transition-all duration-300"
                  >
                    ¡Únete!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2A6E97]">
          <div className="px-4 md:px-8 lg:px-56 py-8 lg:py-2">
            <h2 className="font-semibold text-center dark:text-white text-3xl lg:py-10">
              Misión
            </h2>
            <p className="lg:pb-10 leading-loose text-justify">
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

        <section className="bg-[#0B2A54]">
          <div className="px-4 md:px-8 lg:px-56 py-8 lg:py-2">
            <h2 className="font-semibold dark:text-white text-center text-3xl lg:py-10">
              Visión
            </h2>
            <p className="lg:pb-10 leading-loose text-justify">
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

        <section className="flex flex-row">
          <div className="bg-white basis-[61.8%] lg:pl-56 lg:pr-16 lg:py-10">
            <div className="transition-all duration-500 ease-in-out transform">
              <div className="animate-fade-in-up">
                <h4
                  className="text-center font-bold text-3xl mt-4 transition-all duration-300"
                  style={{
                    color: selectedComite ? selectedComite.color : "#EF8C44",
                  }}
                >
                  {selectedComite
                    ? `Comité ${selectedComite.name}`
                    : "Comités de Trabajo"}
                </h4>
                <div
                  className="h-0.5 mt-4 transition-colors duration-300"
                  style={{
                    backgroundColor: selectedComite
                      ? selectedComite.color
                      : "#EF8C44",
                  }}
                ></div>
              </div>
              <p
                key={selectedComite?.id || "default"}
                className="text-black leading-10 lg:pt-10 text-justify animate-fade-in-delayed"
              >
                {selectedComite ? selectedComite.description : defaultText}
              </p>
            </div>
          </div>
          <ComiteSelector onComiteSelect={setSelectedComite} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
