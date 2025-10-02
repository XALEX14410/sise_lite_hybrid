import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
  const [numeroControl, setNumeroControl] = useState('');
  const [nip, setNip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numeroControl && nip) {
      onLogin();
    }
  };

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

      {/* Right side - Login form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          {/* University Logo */}
          <div className="text-center mb-6 sm:mb-8">
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

          <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6 sm:mb-8">
            BIENVENIDO
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="numeroControl" className="text-gray-600 mb-2 block text-sm">
                Número de Control
              </Label>
              <Input
                id="numeroControl"
                type="text"
                value={numeroControl}
                onChange={(e) => setNumeroControl(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder=""
              />
            </div>

            <div>
              <Label htmlFor="nip" className="text-gray-600 mb-2 block text-sm">
                NIP
              </Label>
              <Input
                id="nip"
                type="password"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder=""
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-medium transition-colors text-sm sm:text-base mb-3"
            >
              Ingresar
            </Button>
          </form>

          {/* Link to register */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={onGoToRegister}
                className="text-purple-600 hover:text-purple-700 font-medium underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}