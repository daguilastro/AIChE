"use client";

import { useState } from "react";
import Image from "next/image";

interface CarruselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const items: CarruselItem[] = [
  {
    id: 1,
    title: "Visitas técnicas",
    description: "Organizamos recorridos a plantas industriales, centros de investigación y empresas del sector químico y de procesos. Estos espacios permiten conocer de primera mano cómo se aplican los conocimientos adquiridos en clase, comprender los retos de la industria y establecer contactos con profesionales del área.",
    imageUrl: "/assets/Img/visitasTecnicas.jpeg"
  },
  {
    id: 2,
    title: "Foros académicos",
    description: "Creamos escenarios de discusión y aprendizaje en torno a temas actuales y relevantes de la ingeniería química, la investigación y la sostenibilidad. Invitamos a expertos nacionales e internacionales, profesores y egresados que comparten su experiencia, generando un diálogo enriquecedor entre la academia y la industria.",
    imageUrl: "/assets/Img/foros.jpg"
  },
  {
    id: 3,
    title: "Actividades académicas",
    description: "Ofrecemos talleres, cursos, charlas y seminarios que refuerzan la formación de nuestros miembros. Estas actividades buscan complementar la educación universitaria con habilidades prácticas, conocimientos especializados y perspectivas globales que preparan a los estudiantes para los retos profesionales.",
    imageUrl: "/assets/Img/actividadesacademicas.jpeg"
  },
  {
    id: 4,
    title: "Actividades lúdicas",
    description: "Creemos en el valor de la integración y el bienestar, por eso realizamos actividades culturales, deportivas y recreativas que promueven el trabajo en equipo, la creatividad y la unión de nuestra comunidad. Estas experiencias nos permiten crecer no solo como ingenieros, sino también como personas.",
    imageUrl: "/assets/Img/actividadesculturales.jpeg"
  }
];

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="w-full py-12 bg-[#15325b]">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        ¿Qué hacemos?
      </h2>
      
      <div className="relative max-w-6xl mx-auto px-8">
        {/* Flechas de navegación en escritorio */}
        <button 
          onClick={prevSlide}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md -ml-6"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6 text-[#0B2A54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Contenedor del carrusel */}
        <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Imagen (izquierda en desktop, arriba en móvil) */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Contenido (derecha en desktop, abajo en móvil) */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#2A6E97]">
                {currentItem.title}
              </h3>
              <p className="text-gray-700 text-justify">
                {currentItem.description}
              </p>
              
              {/* Indicadores de posición */}
              <div className="flex justify-center mt-8 gap-2">
                {items.map((item, index) => (
                  <button 
                    key={item.id}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex 
                        ? "bg-[#EF8C44]" 
                        : "bg-gray-300"
                    }`}
                    aria-label={`Ver ${item.title}`}
                  />
                ))}
              </div>
              
              {/* Flechas de navegación en móvil */}
              <div className="flex justify-center mt-6 gap-8 md:hidden">
                <button 
                  onClick={prevSlide}
                  className="bg-white/80 hover:bg-white p-3 rounded-full shadow-md"
                  aria-label="Anterior"
                >
                  <svg className="w-6 h-6 text-[#0B2A54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={nextSlide}
                  className="bg-white/80 hover:bg-white p-3 rounded-full shadow-md"
                  aria-label="Siguiente"
                >
                  <svg className="w-6 h-6 text-[#0B2A54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flecha derecha en escritorio */}
        <button 
          onClick={nextSlide}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md -mr-6"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6 text-[#0B2A54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}