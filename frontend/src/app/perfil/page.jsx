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
      console.log('🟡 Iniciando fetchPerfil...');
      try {
        const res = await fetch(`${BACK_URL}/auth/perfil`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const text = await res.text();
        console.log('📦 Texto crudo recibido:', text);

        const data = JSON.parse(text);
        console.log('✅ JSON parseado:', data);

        if (!res.ok) throw new Error(data.error || 'No hay sesión activa');

        // ✅ Ajuste: el backend devuelve “Datos_Personales”, no “usuario”
        setUsuario(data.Datos_Personales);
      } catch (err) {
        console.error('❌ Error en fetchPerfil:', err);
        setError(err.message || 'Error desconocido');
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    console.log('🚪 Intentando cerrar sesión...');
    try {
      const res = await fetch(`${BACK_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cerrar sesión');

      console.log('✅ Logout exitoso, redirigiendo...');
      router.push('/');
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err);
      setError(err.message || 'No se pudo cerrar sesión');
    }
  };

  if (error)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-2xl text-center">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
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
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}</p>
        <p><strong>Usuario:</strong> {usuario.usuario}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>CURP:</strong> {usuario.curp}</p>
        <p><strong>Estado:</strong> {usuario.estado}</p>
        <p><strong>Municipio:</strong> {usuario.municipio}</p>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => router.push('/inicio')}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            ← Regresar al inicio
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
}
