"use client";
import { useState } from "react";
import Image from "next/image";

export default function ComiteSelector({ onComiteSelect }) {
  const [bgColor, setBgColor] = useState("#EF8C44");

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
      name: "Planeación",
      image: "/assets/comites/planeacion.png",
      color: "#EF8C44",
      description:
        "Órgano de coordinación general del Capítulo que diseña la planeación estratégica semestral. Coordina, supervisa y articula las actividades de todos los comités de trabajo, realizando seguimiento al cumplimiento de objetivos y del cronograma establecido. Convoca y preside reuniones periódicas para evaluar avances, identificar necesidades y tomar decisiones estratégicas.",
    },
    {
      id: 4,
      name: "Registro e Integración",
      image: "/assets/comites/registro_integracion.png",
      color: "#629031",
      description:
        "Responsable del control interno del capítulo y del seguimiento a la participación estudiantil. Mantiene actualizada la base de datos de miembros activos, registra la asistencia a reuniones y eventos de todos los comités, y facilita la integración efectiva de nuevos miembros al capítulo, asegurando su adaptación y participación en las actividades.",
    },
    {
      id: 5,
      name: "Relaciones",
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
  };

  return (
    <div
      className="flex flex-col basis-[38.2%] transition-all duration-500 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="text-center lg:hidden text-white text-xl font-bold mb-6">
        ¡Conoce los Comités!
      </h3>

      <div className="flex flex-col lg:flex-1 lg:pl-8 lg:flex-row lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 place-items-center lg:flex-shrink-0">
          {comites.map((comite) => (
            <div
              key={comite.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3 h-36 flex flex-col justify-between"
              onClick={() => handleComiteClick(comite)}
            >
            <div className="h-8"></div> {/* Espaciador superior */}
              <div className="relative h-20 w-20 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg group-hover:bg-white/30 group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden mx-auto">
                <div className="relative h-12 w-12">
                  <Image
                    src={comite.image}
                    alt={comite.name}
                    layout="fill"
                    objectFit="contain"
                    className="filter brightness-0 invert"
                  />
                </div>
              </div>
              <div className="h-8 flex items-start justify-center mt-2">
                <p className="text-center text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-20 break-words leading-tight">
                  {comite.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:ml-8">
          <h3 className="text-white text-4xl font-bold text-center">
            ¡Conoce los Comités!
          </h3>
        </div>
      </div>
    </div>
  );
}
