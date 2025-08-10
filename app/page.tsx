export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header con botón hamburguesa */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="flex items-center px-4 py-3">
          {/* Botón hamburguesa */}
          <button 
            className="p-2 rounded-lg hover:bg-gray-300 active:bg-gray-300 transition-colors duration-400 touch-manipulation"
            aria-label="Abrir menú de navegación"
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
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
          
          {/* Logo/Título (opcional para después) */}
          <div className="ml-4">
            <h1 className="text-lg font-semibold text-gray-800">AIChE</h1>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-400 mb-4">
              Bienvenido a AIChE
            </h1>
            <p className="text-xl text-blue-500 mb-8">
              Capítulo Estudiantil - American Institute of Chemical Engineers
            </p>
            
            {/* Contenido temporal */}
            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl text-gray-800 font-semibold mb-4">¿Quiénes somos?</h2>
              <p className="text-gray-700 leading-relaxed">
                Somos el capítulo estudiantil de AIChE, una organización dedicada 
                al desarrollo profesional y académico de estudiantes de ingeniería 
                química y carreras afines.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}