'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch(`${BACK_URL}/auth/perfil`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json(); // 🔑 solo una vez

        if (!res.ok) throw new Error(data.error || 'No hay sesión activa');

        setUsuario(data.usuario);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BACK_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json(); // leer json una sola vez

      if (!res.ok) throw new Error(data.error || 'Error al cerrar sesión');

      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo cerrar sesión');
    }
  };

  if (error)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h1 className="text-2xl font-bold text-center text-red-500">{error}</h1>
        </div>
      </main>
    );

  if (!usuario)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg">⏳ Cargando perfil...</p>
      </main>
    );

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-2xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Usuario:</strong> {usuario.usuario}</p>
        <p><strong>Perfil:</strong> {usuario.perfil}</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}
