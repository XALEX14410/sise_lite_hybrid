'use client'; 
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${BACK_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // 🔑 envía la cookie de sesión
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      console.log('Login exitoso:', data);
      router.push('/inicio'); 
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el backend');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-80 bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          Ingresar
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
