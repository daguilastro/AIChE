"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "~/app/components/sidebar";
import Footer from "~/app/components/footer";
import HeroBackground from "~/app/components/hero_background";

// --- TIPOS (AÑADIENDO SOPORTE PARA POSTS) ---
type InstagramPost = {
  imageUrl: string;
  postUrl: string;
  caption: string;
};

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
  instagramPosts?: InstagramPost[]; // Propiedad opcional para el nuevo proyecto
};

// --- ARRAY DE PROYECTOS (CON EL NUEVO PROYECTO AÑADIDO) ---
const projects: Project[] = [
  {
    id: 1,
    title: "Sembrando Semillas",
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
    title: "Chem-E-Car",
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
    title: "Olimpiadas de Termodinámica (OUT)",
    shortTitle: "OUT",
    category: "competition",
    color: "#16A34A",
    icon: "🧪",
    description: "Competencia académica de termodinámica e ingeniería química",
    longDescription: `Las Olimpiadas de Termodinámica son una competencia académica que pone a prueba los conocimientos y habilidades de los estudiantes en temas fundamentales de la ingeniería química. A través de retos teóricos y prácticos, los equipos fortalecen su razonamiento, aplican conceptos de manera creativa y fomentan el trabajo en equipo.\n\nEste proyecto tiene su propia identidad dentro del Capítulo y un espacio activo en redes sociales, donde se comparten convocatorias, resultados y momentos destacados.`,
    images: ["/assets/Img/olimpiadaster/1.jpeg"],
    logo: "/assets/Img/olimpiadaster/logoolimter.png",
    instagram: "@out_unal",
  },
  {
    id: 4,
    title: "K–12",
    shortTitle: "K–12",
    category: "initiative",
    color: "#2A6E97",
    icon: "🧬",
    description: "Divulgación científica en colegios y comunidades",
    longDescription: `Este proyecto busca acercar la ingeniería química a niños y jóvenes de colegios mediante actividades prácticas, demostraciones y charlas interactivas. El objetivo es despertar su interés por la ciencia y mostrar el papel de la ingeniería química en la vida cotidiana.\n\nA través de K–12, los voluntarios del capítulo desarrollan habilidades de comunicación, liderazgo y enseñanza, mientras inspiran a las nuevas generaciones a explorar el mundo de la ingeniería y la innovación.`,
    images: ["/assets/Img/K-12/1.jpg"],
    logo: "/assets/Img/K-12/logok12.png",
    instagram: "@k12_unal",
  },
  {
    id: 5,
    title: "OCUN — Olimpiadas de Cerveza",
    shortTitle: "OCUN",
    category: "competition",
    color: "#EF8C44",
    icon: "🍺",
    description: "Competencia de elaboración y evaluación de cervezas artesanales",
    longDescription: `OCUN es un proyecto que combina el aprendizaje técnico con la diversión y el trabajo en equipo, mediante la elaboración y evaluación de cervezas artesanales. En esta actividad, los participantes aplican principios de ingeniería química, microbiología y procesos de fermentación para desarrollar productos innovadores y de calidad.\n\nMás allá de la competencia, OCUN promueve la integración entre estudiantes, el intercambio de conocimientos y la experimentación con nuevas técnicas y sabores. Actualmente, OCUN es un proyecto inactivo, pero se espera su reactivación en próximos semestres.`,
    images: ["/assets/Img/OCUN/1.png", "/assets/Img/OCUN/2.png"],
    logo: "/assets/Img/OCUN/logoocun.png",
    instagram: "@olimpiadasdecervezaunal",
  },
  {
    id: 6,
    title: "AIChE te cuenta",
    shortTitle: "AIChE te cuenta",
    category: "initiative",
    color: "#D62976",
    icon: "💬",
    description: "Divulgación de ciencia e ingeniería en redes sociales.",
    longDescription: `AIChE te cuenta es un espacio creado para compartir contenido divulgativo, curioso y actual sobre el mundo de la Ingeniería Química y sus múltiples aplicaciones. A través de publicaciones breves y visuales, buscamos acercar el conocimiento científico y técnico a toda la comunidad estudiantil.\n\nCada publicación presenta datos interesantes, avances de investigación o procesos industriales explicados de manera sencilla y accesible. Nuestro objetivo es despertar la curiosidad y fomentar el aprendizaje autónomo.\n\nAdemás, si deseas profundizar en los temas, puedes acceder a los documentos y artículos que hemos recopilado en la carpeta de recursos del capítulo. ¡Explora, aprende y comparte!`,
    images: [],
    logo: "/assets/Img/aiche_cuenta/logo.png",
    instagram: "@aiche_te_cuenta",
    link: "https://drive.google.com/drive/folders/1K6YzdbN4uTODIRdmp7BRkqgGaypQ_Pn2?usp=drive_link",
    instagramPosts: [
      {
        imageUrl: "/assets/Img/aiche_cuenta/post1.png",
        postUrl: "https://www.instagram.com/p/DP4zStOjWIW/",
        caption: "Post sobre la historia de la ingeniería química.",
      },
      {
        imageUrl: "/assets/Img/aiche_cuenta/post2.png",
        postUrl: "https://www.instagram.com/p/DJDD3IWNlX2/",
        caption: "Post sobre los diferentes tipos de reactores.",
      },
      {
        imageUrl: "/assets/Img/aiche_cuenta/post3.png",
        postUrl: "https://www.instagram.com/p/DFQ6m3dv5CE/",
        caption: "Post explicando el proceso de destilación.",
      },
      {
        imageUrl: "/assets/Img/aiche_cuenta/post4.png",
        postUrl: "https://www.instagram.com/p/DCU5yc3S9fM/",
        caption: "Post sobre la importancia de la termodinámica.",
      },
    ],
  },
];

const useInView = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref]);
  return isInView;
};

// --- COMPONENTE ProjectSection CORREGIDO ---
const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef);
  const isEven = index % 2 === 0;

  // Lógica del carrusel, solo para la sección de Instagram
  const posts = project.instagramPosts || [];
  const postsToShow = 4;
  const canScroll = posts.length > postsToShow;
  const maxIndex = canScroll ? posts.length - postsToShow : 0;
  const [currentIndex, setCurrentIndex] = useState(maxIndex);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // --- ÚNICO CAMBIO: LÓGICA PARA EL TAMAÑO DEL LOGO ---
  const isLargeLogo = project.id === 1 || project.id === 3;
  const logoContainerClasses = isLargeLogo
    ? "relative w-60 h-60 md:w-80 md:h-48" // Tamaño más grande
    : "relative w-32 h-32 md:w-40 md:h-40"; // Tamaño por defecto

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-4 md:px-8 transition-all duration-1000 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isEven ? "bg-white" : "bg-[#F8F9FA]"}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-5 py-2 rounded-full text-xs font-bold text-white tracking-widest uppercase" style={{ backgroundColor: project.color }}>
              {project.category === "competition" ? "Competencia" : "Iniciativa"}
            </span>
          </div>
          {project.logo && (
            <div className="flex justify-center mb-6">
              {/* Aplicamos las clases de tamaño condicionales aquí */}
              <div className={logoContainerClasses}>
                <img src={project.logo} alt={`Logo ${project.title}`} className="w-full h-full object-contain drop-shadow-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: project.color }}>
            {project.title}
          </h2>
          <div className="h-1.5 w-24 rounded-full mx-auto" style={{ backgroundColor: project.color }} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {project.longDescription}
          </p>
          <div className="flex gap-4 flex-wrap mt-8 justify-center">
            {project.instagram && !project.instagramPosts && (
              <a href={`https://instagram.com/${project.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: project.color }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                {project.instagram}
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 border-2 shadow-lg hover:shadow-xl bg-white" style={{ color: project.color, borderColor: project.color }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Ver más
              </a>
            )}
          </div>
        </div>
        
        {posts.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden -mx-2">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ width: `${(posts.length / postsToShow) * 100}%`, transform: `translateX(-${(currentIndex * 100) / posts.length}%)` }}>
                {posts.map((post, idx) => (
                  <div key={idx} style={{ width: `${100 / posts.length}%` }} className="p-2">
                    <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-square block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                      <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center p-4">
                        <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072C2.693.28 1.002 1.97.804 6.418.746 7.699.732 8.107.732 11.358s.014 3.659.072 4.948c.2 4.448 1.892 6.138 6.34 6.34 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.448-.202 6.14-1.892 6.34-6.34.058-1.28.072-1.689.072-4.948s-.014-3.659-.072-4.948C23.198 1.97 21.506.28 17.058.082 15.777.024 15.37 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {canScroll && (
              <>
                <button onClick={goPrev} disabled={currentIndex === 0} className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={goNext} disabled={currentIndex === maxIndex} className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        ) : project.images.length > 0 ? (
          <div className={`grid gap-4 ${project.images.length === 1 ? "grid-cols-1" : project.images.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {project.images.map((image, idx) => (
              <div key={idx} className="relative group">
                <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-500 group-hover:opacity-0">
                  <img src={image} alt={`${project.title} - imagen ${idx + 1}`} className="w-full h-64 md:h-80 object-cover" />
                </div>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-[10000] scale-75 group-hover:scale-100">
                  <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white">
                    <img src={image} alt={`${project.title} - imagen completa ${idx + 1}`} className="max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !project.logo && (
          <div className="rounded-xl shadow-lg h-80 flex items-center justify-center text-9xl" style={{ backgroundColor: project.color + "15" }}>
            {project.icon}
          </div>
        )}
      </div>
    </section>
  );
};


export default function ProjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="transition-all duration-500">
        <HeroBackground src="/assets/Img/heroproyecto.jpeg" fit="cover" position="50% 45%" minHClassName="min-h-[340px] md:min-h-[400px]" withOverlay={true} overlayClassName="bg-gradient-to-b from-[#15325b]/95 via-[#15325b]/85 to-[#15325b]/95">
          {!isSidebarOpen && (
            <button onClick={toggleSidebar} className="fixed top-4 left-4 p-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-md shadow-md transition-all duration-200 z-[60]" aria-label="Abrir menú de navegación">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          )}
          <div className="h-full w-full flex items-center justify-center text-center px-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Proyectos</h1>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">Iniciativas académicas, competencias internacionales y proyectos de impacto social</p>
            </div>
          </div>
        </HeroBackground>
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