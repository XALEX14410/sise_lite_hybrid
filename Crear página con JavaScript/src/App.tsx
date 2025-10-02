import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';

type AppState = 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');

  const handleLogin = () => {
    setCurrentState('dashboard');
  };

  const handleRegister = () => {
    // En una aplicación real, aquí podrías mostrar un mensaje de confirmación
    // o redirigir al login para que inicien sesión con sus nuevas credenciales
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setCurrentState('login');
  };

  const handleLogout = () => {
    setCurrentState('login');
  };

  const handleGoToRegister = () => {
    setCurrentState('register');
  };

  const handleBackToLogin = () => {
    setCurrentState('login');
  };

  return (
    <div className="size-full">
      {currentState === 'dashboard' && (
        <DashboardPage onLogout={handleLogout} />
      )}
      {currentState === 'login' && (
        <LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
      )}
      {currentState === 'register' && (
        <RegisterPage onRegister={handleRegister} onBackToLogin={handleBackToLogin} />
      )}
    </div>
  );
}