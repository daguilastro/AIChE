"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "~/app/components/sidebar";
import Footer from "~/app/components/footer";

type Project = {
  id: number;
  title: string;
  shortTitle: string;
  category: "competition" | "initiative";
  color: string;
  icon: string;
  description: string;
  longDescription: string;
  images: string[];
  logo?: string;
  instagram?: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "🌱 Sembrando Semillas",
    shortTitle: "Sembrando Semillas",
    category: "initiative",
    color: "#2A6E97",
    icon: "🌱",
    description: "Programa de mentoría y acompañamiento estudiantil",
    longDescription: `Sembrando Semillas es un programa de acompañamiento entre estudiantes que busca fortalecer la comunidad AIChE. En él, miembros con más experiencia ("mentores") acompañan a nuevos integrantes ("semillas") en su proceso de adaptación a la vida universitaria, compartiendo herramientas, consejos y experiencias.\n\nAdemás, el programa cuenta con un sistema de puntos que incentiva la participación y el compromiso en las diferentes actividades del Capítulo. Las tres parejas con mayor puntaje al cierre del semestre reciben un gran premio especial.`,
    images: [
      "/assets/Img/sembrando_semillas/1.jpg",
      "/assets/Img/sembrando_semillas/2.jpg",
      "/assets/Img/sembrando_semillas/3.jpeg",
    ],
    logo: "/assets/Img/sembrando_semillas/logosembrando.png",
    link: "https://docs.google.com/spreadsheets/d/1WLPkcOGuoJokGQYu1KOV1t7G_mFv6RsB/edit",
  },
  {
    id: 2,
    title: "🏎️ Chem-E-Car",
    shortTitle: "Chem-E-Car",
    category: "competition",
    color: "#EF8C44",
    icon: "🏎️",
    description: "Competencia internacional de vehículos impulsados por reacciones químicas",
    longDescription: `Chem-E-Car es una competencia internacional del AIChE en la que los estudiantes diseñan y construyen un carro impulsado por una reacción química. El reto consiste en que el vehículo recorra una distancia determinada y se detenga con la mayor precisión posible, sin utilizar fuentes convencionales de energía.\n\nEste proyecto fomenta la creatividad, el trabajo en equipo y la aplicación práctica de los conocimientos de ingeniería química, desde el diseño de reacciones y control de procesos, hasta la seguridad y sostenibilidad. Participar en Chem-E-Car permite a los miembros del capítulo representar a la universidad en competencias nacionales e internacionales, fortaleciendo tanto sus habilidades técnicas como su espíritu innovador.`,
    images: [
      "/assets/Img/Chem-E-Car/1.jpg",
      "/assets/Img/Chem-E-Car/2.jpg",
      "/assets/Img/Chem-E-Car/3.jpg",
    ],
    logo: "/assets/Img/Chem-E-Car/logochemcar.png",
    instagram: "@chemecar_unalbog",
  },
  {
    id: 3,
    title: "🧪 Olimpiadas de Termodinámica (OUT)",
    shortTitle: "OUT",
    category: "competition",
    color: "#16A34A",
    icon: "🧪",
    description: "Competencia académica de termodinámica e ingeniería química",
    longDescription: `Las Olimpiadas de Termodinámica son una competencia académica que pone a prueba los conocimientos y habilidades de los estudiantes en temas fundamentales de la ingeniería química. A través de retos teóricos y prácticos, los equipos fortalecen su razonamiento, aplican conceptos de manera creativa y fomentan el trabajo en equipo.\n\nEste proyecto tiene su propia identidad dentro del Capítulo y un espacio activo en redes sociales, donde se comparten convocatorias, resultados y momentos destacados.`,
    images: [
      "/assets/Img/olimpiadaster/1.jpeg",
    ],
    logo: "/assets/Img/olimpiadaster/logoolimter.png",
    instagram: "@out_unal",
  },
  {
    id: 4,
    title: "🧬 K–12",
    shortTitle: "K–12",
    category: "initiative",
    color: "#2A6E97",
    icon: "🧬",
    description: "Divulgación científica en colegios y comunidades",
    longDescription: `Este proyecto busca acercar la ingeniería química a niños y jóvenes de colegios mediante actividades prácticas, demostraciones y charlas interactivas. El objetivo es despertar su interés por la ciencia y mostrar el papel de la ingeniería química en la vida cotidiana.\n\nA través de K–12, los voluntarios del capítulo desarrollan habilidades de comunicación, liderazgo y enseñanza, mientras inspiran a las nuevas generaciones a explorar el mundo de la ingeniería y la innovación.`,
    images: [
      "/assets/Img/K-12/1.jpg",
    ],
    logo: "/assets/Img/K-12/logok12.png",
    instagram: "@k12_unal",
  },
  {
    id: 5,
    title: "🍺 OCUN — Olimpiadas de Cerveza",
    shortTitle: "OCUN",
    category: "competition",
    color: "#EF8C44",
    icon: "🍺",
    description: "Competencia de elaboración y evaluación de cervezas artesanales",
    longDescription: `OCUN es un proyecto que combina el aprendizaje técnico con la diversión y el trabajo en equipo, mediante la elaboración y evaluación de cervezas artesanales. En esta actividad, los participantes aplican principios de ingeniería química, microbiología y procesos de fermentación para desarrollar productos innovadores y de calidad.\n\nMás allá de la competencia, OCUN promueve la integración entre estudiantes, el intercambio de conocimientos y la experimentación con nuevas técnicas y sabores. Actualmente, OCUN es un proyecto inactivo, pero se espera su reactivación en próximos semestres.`,
    images: [
      "/assets/Img/OCUN/1.png",
      "/assets/Img/OCUN/2.png",
    ],
    logo: "/assets/Img/OCUN/logoocun.png",
    instagram: "@olimpiadasdecervezaunal",
  },
];

// ✅ SOLUCIÓN: Cambiar el tipo del parámetro para aceptar null
const useInView = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // ✅ Verificar que ref.current existe antes de observar
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    // ✅ Guardar referencia para el cleanup
    const currentRef = ref.current;

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return isInView;
};

// Componente para cada proyecto
const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-4 md:px-8 transition-all duration-1000 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isEven ? "bg-white" : "bg-[#F8F9FA]"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header con Logo */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className="px-5 py-2 rounded-full text-xs font-bold text-white tracking-widest uppercase"
              style={{ backgroundColor: project.color }}
            >
              {project.category === "competition" ? "Competencia" : "Iniciativa"}
            </span>
          </div>
          
          {/* Logo del proyecto */}
          {project.logo && (
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <img
                  src={project.logo}
                  alt={`Logo ${project.title}`}
                  className="w-full h-full object-contain drop-shadow-lg transition-opacity duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: project.color }}
          >
            {project.title}
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto"
            style={{ backgroundColor: project.color }}
          />
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {project.longDescription}
          </p>

          {/* Enlaces */}
          <div className="flex gap-4 flex-wrap mt-8 justify-center">
            {project.instagram && (
              <a
                href={`https://instagram.com/${project.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: project.color }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {project.instagram}
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 border-2 shadow-lg hover:shadow-xl bg-white"
                style={{
                  color: project.color,
                  borderColor: project.color,
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver más
              </a>
            )}
          </div>
        </div>

        {/* Galería de imágenes con efecto hover expandido */}
        {project.images.length > 0 && (
          <div className={`grid gap-4 ${
            project.images.length === 1 
              ? "grid-cols-1" 
              : project.images.length === 2 
              ? "grid-cols-1 md:grid-cols-2" 
              : project.images.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}>
            {project.images.map((image, idx) => (
              <div
                key={idx}
                className="relative group"
              >
                {/* Imagen normal */}
                <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-500 group-hover:opacity-0">
                  <img
                    src={image}
                    alt={`${project.title} - imagen ${idx + 1}`}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                {/* Imagen expandida centrada - Fixed position */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-[10000] scale-75 group-hover:scale-100">
                  <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white">
                    <img
                      src={image}
                      alt={`${project.title} - imagen completa ${idx + 1}`}
                      className="max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin imágenes - mostrar ícono grande */}
        {project.images.length === 0 && !project.logo && (
          <div
            className="rounded-xl shadow-lg h-80 flex items-center justify-center text-9xl transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: project.color + "15" }}
          >
            {project.icon}
          </div>
        )}
      </div>
    </section>
  );
};

export default function ProjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="transition-all duration-500">
        {/* Hero Section */}
        <section className="relative px-8 md:px-8 lg:px-56 py-8 lg:py-30 bg-[#15325b] text-white overflow-hidden">
          <div
            className="absolute inset-0 w-full h-[170%] bg-cover bg-no-repeat -top-[60%] bg-[center_-10px] md:bg-[center_-250px]"
            style={{
              backgroundImage: "url('/assets/Img/heroproyecto.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#15325b]/95 via-[#15325b]/85 to-[#15325b]/95" />

          {/* Botón del menú */}
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

          {/* Contenido del hero */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Nuestros Proyectos
            </h1>
            <p className="text-lg text-center text-gray-200 max-w-3xl mx-auto">
              Iniciativas académicas, competencias internacionales y proyectos de impacto social
            </p>
          </div>
        </section>

        {/* Proyectos */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectSection key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}