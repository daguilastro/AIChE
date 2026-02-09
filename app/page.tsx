"use client";

import { useState, useEffect, useRef } from "react";
import ComiteSelector from "~/app/components/comite_selector";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Carrusel from "./components/carrusel";

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
    <div className="min-h-screen bg-background">
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
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
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="lg:flex-1">
              <img
                src="assets/logos/logo_dark_hd.png"
                alt="AIChE Logo"
                className="w-auto md:h-48 block "
              />
            </div>
            <div className="lg:flex-1 lg:pl-12">
              <div className="text-left px-2 lg:text-right">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  ¡Conócenos!
                </h2>
                <p className="text-justify leading-loose text-gray-300">
                  Somos el capítulo AIChE (American Institute of Chemical
                  Engineers) de la Universidad Nacional de Colombia. Somos una
                  comunidad de estudiantes apasionados por la ingeniería
                  química, comprometidos con el aprendizaje, la innovación y el
                  desarrollo profesional. ¡Te invitamos a ser parte de esta
                  experiencia!
                </p>
                <div className="flex justify-center lg:justify-end mt-8">
                  <a
                    href="https://forms.gle/kW98ccB1aDX6frBc6"
                    className="inline-flex items-center justify-center px-8 py-3  bg-[#EF8C44] border-2 border-[#EF8C44] text-white hover:bg-transparent hover:text-white font-bold text-lg rounded-lg transition-all duration-300"
                  >
                    ¡Únete!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2A6E97] py-16">
          <div className="mx-auto px-4 md:px-8 lg:px-56">
            {/* Contenedor adaptativo: filas en móvil, columnas en desktop */}
            <div className="flex flex-col md:flex-row bg-[#2A6E97] md:space-x-10 space-y-8 md:space-y-0 p-4 items-center md:items-stretch">
              {/* Misión */}
              <div className="md:flex-1 md:px-6">
                <h2 className="font-bold text-3xl text-[white] mb-6 text-center">
                  Misión
                </h2>
                <p className="leading-relaxed text-[white] text-justify">
                  El Capítulo Estudiantil AIChE de la Universidad Nacional de
                  Colombia, Sede Bogotá, tiene como misión fortalecer la
                  formación integral de los y las estudiantes de Ingeniería
                  Química mediante actividades académicas, culturales, sociales
                  y de proyección profesional. A través del trabajo colaborativo
                  en comités, fomenta el liderazgo, la gestión de proyectos, la
                  divulgación científica y el compromiso con el entorno,
                  contribuyendo al desarrollo de competencias técnicas, humanas
                  y éticas.
                </p>
              </div>

              <div className="w-full h-0.5 bg-white my-4 md:w-0.5 md:h-auto md:self-stretch md:my-0" />

              {/* Visión */}
              <div className="mt-4 md:flex-1 md:px-6">
                <h2 className="font-bold text-3xl text-[white] mb-6 text-center">
                  Visión
                </h2>
                <p className="leading-relaxed text-[white] text-justify">
                  El Capítulo Estudiantil AIChE UNAL Bogotá será reconocido a
                  nivel nacional e internacional como un referente de excelencia
                  estudiantil en ingeniería química, caracterizado por su
                  impacto en la comunidad académica, la industria y la sociedad,
                  su capacidad de innovación en actividades de formación y
                  divulgación, y por ser un espacio de integración y desarrollo
                  profesional para sus miembros.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Carrusel />
        <section className="flex flex-col lg:flex-row">
          {/* Descripción del comité */}
          <div className="bg-white w-full lg:flex-[3] lg:pl-56 lg:pr-16 lg:py-10 order-1 lg:order-1">
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
                className="leading-relaxed text-gray-700 lg:pt-10 p-10 text-justify animate-fade-in-delayed"
              >
                {selectedComite ? selectedComite.description : defaultText}
              </p>
            </div>
          </div>

          {/* Selector de comité con estructura vertical */}
          <div className="w-full lg:flex-[2] order-2 lg:order-2 flex flex-col">
            <ComiteSelector onComiteSelect={setSelectedComite} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}