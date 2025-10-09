'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login'); // redirige a la página de login
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Bienvenido a Sise Lite Hybrid</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Accede con tu usuario y contraseña.</p>
        <button
          onClick={goToLogin}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
        >
          Iniciar Sesión
        </button>
      </div>
    </main>
  );
}
