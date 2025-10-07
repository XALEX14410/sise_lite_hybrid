import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RegisterPageProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    carrera: '',
    semestre: '',
    nip: '',
    confirmarNip: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombreCompleto || !formData.email || !formData.nip || !formData.confirmarNip) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    if (formData.nip !== formData.confirmarNip) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.nip.length < 6) {
      alert('El NIP debe tener al menos 6 caracteres');
      return;
    }
    
    // Simular registro exitoso
    onRegister();
  };

  const carreras = [
    'Ingeniería en Sistemas Computacionales',
    'Ingeniería Industrial',
    'Ingeniería en Gestión Empresarial',
    'Ingeniería Electromecánica',
    'Licenciatura en Administración',
    'Licenciatura en Contaduría Pública',
    'Licenciatura en Turismo',
    'Arquitectura'
  ];

  const semestres = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Mountain background */}
      <div className="flex-1 relative min-h-[200px] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-400">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1566082990412-86f779f19bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHB1cnBsZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTgxNDE1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mountain landscape"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-4 sm:space-y-6 max-h-screen overflow-y-auto">
          {/* University Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">UVDO</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs sm:text-sm text-gray-600">UNIVERSIDAD</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-800">DEL VALLE</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-800">DE ORIZABA</div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
            REGISTRO
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="nombreCompleto" className="text-gray-600 mb-1 block text-sm">
                Nombre Completo *
              </Label>
              <Input
                id="nombreCompleto"
                type="text"
                value={formData.nombreCompleto}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Ingrese su nombre completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-600 mb-1 block text-sm">
                Correo Electrónico *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono" className="text-gray-600 mb-1 block text-sm">
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="(272) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="carrera" className="text-gray-600 mb-1 block text-sm">
                Carrera
              </Label>
              <select
                id="carrera"
                value={formData.carrera}
                onChange={(e) => handleInputChange('carrera', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base bg-white"
              >
                <option value="">Seleccione su carrera</option>
                {carreras.map((carrera, index) => (
                  <option key={index} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="semestre" className="text-gray-600 mb-1 block text-sm">
                Semestre
              </Label>
              <select
                id="semestre"
                value={formData.semestre}
                onChange={(e) => handleInputChange('semestre', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base bg-white"
              >
                <option value="">Seleccione semestre</option>
                {semestres.map((semestre, index) => (
                  <option key={index} value={semestre}>
                    {semestre}° Semestre
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="nip" className="text-gray-600 mb-1 block text-sm">
                NIP (Contraseña) *
              </Label>
              <Input
                id="nip"
                type="password"
                value={formData.nip}
                onChange={(e) => handleInputChange('nip', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmarNip" className="text-gray-600 mb-1 block text-sm">
                Confirmar NIP *
              </Label>
              <Input
                id="confirmarNip"
                type="password"
                value={formData.confirmarNip}
                onChange={(e) => handleInputChange('confirmarNip', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Confirme su contraseña"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-medium transition-colors text-sm sm:text-base mb-3"
              >
                Registrarse
              </Button>
              
              <Button
                type="button"
                onClick={onBackToLogin}
                variant="outline"
                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 py-2 px-4 sm:py-3 sm:px-6 rounded-full font-medium transition-colors text-sm sm:text-base"
              >
                Volver al Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}