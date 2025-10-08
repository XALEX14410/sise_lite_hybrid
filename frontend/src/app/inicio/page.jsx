'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function InicioPage() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchInicio = async () => {
      try {
        const res = await fetch(`${BACK_URL}/inicio`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.mensaje || 'Error al obtener datos');

        console.log('✅ Respuesta del backend:', data); // 👈 para depurar
        setDatos(data);
      } catch (err) {
        console.error('❌ Error en fetchInicio:', err);
        setError(err.message);
      }
    };

    fetchInicio();
  }, []);

  if (error)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-2xl text-center">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    );

  if (!datos)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg">⏳ Cargando inicio...</p>
      </main>
    );

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{datos.mensaje}</h1>

        {datos.datosGenerales ? (
          <div className="grid grid-cols-2 gap-4 text-left">
            {Object.entries(datos.datosGenerales).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 rounded">
                <p className="font-semibold capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </p>
                <p className="text-xl">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 mt-4">No hay datos generales disponibles.</p>
        )}

        <button
          onClick={() => router.push('/perfil')}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Ver perfil
        </button>
      </div>
    </main>
  );
}
