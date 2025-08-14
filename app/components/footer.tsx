import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex bg-gray-800 text-white">
      <div className="flex flex-1 flex-row py-8 px-56 gap-x-4">
        <Image
          src="/assets/logos/logo_dark_hd.png"
          alt="Descripción de la imagen"
          width={200}
          height={150}
        />
        <div className="h-full bg-gray-700 w-0.5" />
        <div className="flex flex-col">
          <h1 className="mb-2 font-semibold">Contáctanos</h1>
          <a
            href="mailto:aiche_fibog@unal.edu.co"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2CAAEC] dark:hover:text-[#EF8C44] transition-colors duration-200"
          >
            aiche_fibog@unal.edu.co
          </a>
        </div>
      </div>
    </footer>
  );
}
