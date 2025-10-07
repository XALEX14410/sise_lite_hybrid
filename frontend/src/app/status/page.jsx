'use client';
import { useEffect, useState } from 'react';

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function StatusPage() {
  const [status, setStatus] = useState('⏳ Conectando al backend...');

  useEffect(() => {
    fetch(`${BACK_URL}/api/status`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con el backend');
        return res.json();
      })
      .then((data) => setStatus(`✅ Conectado: ${data.message}`))
      .catch((err) => {
        console.error(err);
        setStatus('❌ No se pudo conectar al backend');
      });
  }, []);

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center">{status}</h1>
      </div>
    </main>
  );
}
