"use client";
import { useState } from "react";
import Image from "next/image";

export default function ComiteSelector({ onComiteSelect }) {
  const [bgColor, setBgColor] = useState("#EF8C44");
  const [currentComiteIndex, setCurrentComiteIndex] = useState(0);

  const comites = [
    {
      id: 1,
      name: "Académico",
      image: "/assets/comites/academico.png",
      color: "#EF8C44",
      description:
        "Fortalece la formación profesional de las y los estudiantes mediante actividades de carácter académico. Diseña, planea y ejecuta talleres, cursos, seminarios y conferencias especializadas en ingeniería química. Investiga temas de interés actual en el campo profesional y elabora documentos técnicos para difundir conocimiento especializado a través de los canales oficiales del capítulo.",
    },
    {
      id: 2,
      name: "Cultural",
      image: "/assets/comites/cultural.png",
      color: "#629031",
      description:
        "Fomenta la integración, el sentido de pertenencia y el bienestar de los miembros del capítulo. Organiza eventos culturales, recreativos y deportivos que promuevan la diversidad y el bienestar emocional de la comunidad. Crea espacios de interacción social que fortalezcan los vínculos entre miembros y generen un ambiente de camaradería y apoyo mutuo.",
    },
    {
      id: 3,
      name: "de Planeación",
      image: "/assets/comites/planeacion.png",
      color: "#EF8C44",
      description:
        "Órgano de coordinación general del Capítulo que diseña la planeación estratégica semestral. Coordina, supervisa y articula las actividades de todos los comités de trabajo, realizando seguimiento al cumplimiento de objetivos y del cronograma establecido. Convoca y preside reuniones periódicas para evaluar avances, identificar necesidades y tomar decisiones estratégicas.",
    },
    {
      id: 4,
      name: "de Registro e Integración",
      image: "/assets/comites/registro_integracion.png",
      color: "#629031",
      description:
        "Responsable del control interno del capítulo y del seguimiento a la participación estudiantil. Mantiene actualizada la base de datos de miembros activos, registra la asistencia a reuniones y eventos de todos los comités, y facilita la integración efectiva de nuevos miembros al capítulo, asegurando su adaptación y participación en las actividades.",
    },
    {
      id: 5,
      name: "de Relaciones",
      image: "/assets/comites/relaciones.png",
      color: "#EF8C44",
      description:
        "Establece vínculos estratégicos con actores externos para fortalecer el capítulo. Promueve la divulgación científica y técnica a través de colaboraciones con otros capítulos estudiantiles, la industria y la academia. Coordina la participación del capítulo en eventos interinstitucionales y gestiona convenios y alianzas estratégicas para el desarrollo de actividades conjuntas.",
    },
    {
      id: 6,
      name: "Social",
      image: "/assets/comites/social.png",
      color: "#629031",
      description:
        "Encargado de la imagen pública del capítulo y su presencia digital. Diseña y ejecuta estrategias de comunicación en redes sociales, crea contenido gráfico, audiovisual e informativo sobre las actividades del capítulo. Apoya la difusión de eventos y campañas tanto internas como externas para maximizar el alcance e impacto del capítulo en la comunidad.",
    },
  ];

  const handleComiteClick = (comite) => {
    setBgColor(comite.color);
    onComiteSelect(comite);
    setCurrentComiteIndex(comite.id - 1);
  };

  return (
    <div
      className="flex flex-col h-full transition-colors duration-300 py-8 px-6"
      style={{ backgroundColor: bgColor }}
    >
      {/* Título arriba */}
      <div className="text-center mb-8">
        <h3 className="text-3xl lg:text-4xl font-bold text-white">
          ¡Conoce los Comités!
        </h3>
      </div>

      {/* Grid de botones en el centro - ahora más pequeños */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 lg:gap-4 max-w-85 mx-auto">
          {comites.map((comite) => (
            <button
              key={comite.id}
              onClick={() => handleComiteClick(comite)}
              className="aspect-square bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl p-3 lg:p-4 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              aria-label={`Ver información del Comité ${comite.name}`}
            >
              <Image
                src={comite.image}
                alt={`Icono del Comité ${comite.name}`}
                width={60}
                height={60}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
