export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hamburger Menu */}
      <header className="relative">
        <div className="p-4 md:p-6">
          {/* Hamburger Menu Button */}
          <button 
            className="flex flex-col justify-center w-8 h-8 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 p-1"
            aria-label="Menú de navegación"
            aria-expanded="false"
          >
            <span className="w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out"></span>
            <span className="w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out"></span>
            <span className="w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              AIChE
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 mb-8">
              American Institute of Chemical Engineers
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Grupo estudiantil dedicado a promover la excelencia en ingeniería química 
              y profesiones relacionadas.
            </p>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Nuestra Misión</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fomentar el desarrollo profesional y académico de futuros ingenieros químicos.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Actividades</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Conferencias, talleres, proyectos de investigación y networking profesional.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Únete</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Forma parte de nuestra comunidad y construye tu futuro profesional.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg">
              Conoce Más
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
          <p>© 2024 Grupo AIChE. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
