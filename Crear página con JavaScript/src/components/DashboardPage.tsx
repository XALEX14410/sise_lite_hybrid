import { LogOut, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface DashboardPageProps {
  onLogout: () => void;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = [
    'Inicio',
    'Datos Personales', 
    'Contexto Académico',
    'Trámites administrativos',
    'Graduación',
    'Vinculación',
    'Documentos',
    'Descargas'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  className="text-sm hover:text-purple-200 transition-colors py-3"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <User className="w-4 h-4" />
                <span>Usuario: [22103002] ALEX EM</span>
              </div>
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-white hover:text-purple-200 hover:bg-purple-600"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Salir
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">UV</span>
                </div>
                <span className="text-sm font-medium">UniVO</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onLogout}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-purple-200 hover:bg-purple-600 p-2"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-purple-200 hover:bg-purple-600 p-2"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="border-t border-purple-600">
                <div className="py-2">
                  <div className="flex items-center space-x-2 px-4 py-2 text-xs border-b border-purple-600">
                    <User className="w-3 h-3" />
                    <span className="truncate">Usuario: [22103002] Em...</span>
                  </div>
                  {navigationItems.map((item, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
          {/* Header with logos */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {/* GEU 2030 Logo */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-white">
                    <div className="text-sm sm:text-lg font-bold">GEU</div>
                    <div className="text-xs">2030</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              {/* University Logo */}
              <div className="flex items-center justify-center mb-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-purple-600 text-xs font-bold">UVDO</div>
                    <div className="text-xs text-purple-600">★</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-0">
                <div>UNIVERSIDAD</div>
                <div>DEL VALLE</div>
                <div>DE ORIZABA</div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">Estimada Comunidad UniVO.</h2>
            
            <div className="text-xs sm:text-sm text-gray-600 space-y-3 sm:space-y-4 max-w-2xl mx-auto">
              <p>
                Con motivo del inicio de este período académico, me da mucho gusto saludarles y 
                tener la oportunidad de comunicarme con ustedes. Como siempre, deseamos que 
                este nuevo semestre nos traiga aún más oportunidades de conectar, conocer sobre 
                sus logros y que se mantengan muy vinculados a UniVO
              </p>
              
              <p>
                Como Grupo Educativo UniVO, compartimos el propósito de transformar la vida 
                de las personas y las comunidades a través de la educación, y tenemos 
                aspiraciones que nos motivan a continuar dando lo mejor de nosotros para 
                beneficio de nuestros y nuestras estudiantes.
              </p>
              
              <div className="mt-4 sm:mt-6">
                <p>Cordialmente,</p>
                <p>Mtra. Mel And </p>
                <p>Secretaria Académica GEU</p>
              </div>
            </div>
          </div>

          {/* Decorative waves */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <svg 
              className="w-48 h-12 sm:w-72 sm:h-16 text-purple-300" 
              viewBox="0 0 300 60"
            >
              <path
                d="M10,30 Q75,10 150,30 T290,30"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="opacity-60"
              />
              <path
                d="M10,35 Q75,15 150,35 T290,35"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="opacity-40"
              />
              <path
                d="M10,40 Q75,20 150,40 T290,40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="opacity-30"
              />
            </svg>
          </div>

          {/* Payment acknowledgment */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-700">
              <strong>Agradecemos su pago efectuado el día 09-07-2025</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}