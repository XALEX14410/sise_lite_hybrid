"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPerfil = async () => {
<<<<<<< HEAD
      console.log('Iniciando fetchPerfil...');
=======
      console.log("Iniciando fetchPerfil...");
>>>>>>> backend
      try {
        const res = await fetch(`${BACK_URL}/auth/perfil`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const text = await res.text();
<<<<<<< HEAD
        console.log('Texto crudo recibido:', text);

        const data = JSON.parse(text);
        console.log('JSON parseado:', data);
=======
        console.log("Texto crudo recibido:", text);
>>>>>>> backend

        const data = JSON.parse(text);
        console.log("JSON parseado:", data);

<<<<<<< HEAD
        setUsuario(data.Datos_Personales);
      } catch (err) {
        console.error('Error en fetchPerfil:', err);
        setError(err.message || 'Error desconocido');
=======
        if (!res.ok) throw new Error(data.error || "No hay sesión activa");

        setUsuario(data.Datos_Personales);
      } catch (err) {
        console.error("Error en fetchPerfil:", err);
        setError(err.message || "Error desconocido");
>>>>>>> backend
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
<<<<<<< HEAD
    console.log('🚪 Intentando cerrar sesión...');
=======
    console.log("🚪 Intentando cerrar sesión...");
>>>>>>> backend
    try {
      const res = await fetch(`${BACK_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
<<<<<<< HEAD
      if (!res.ok) throw new Error(data.error || 'Error al cerrar sesión');

      console.log('Logout exitoso, redirigiendo...');
      router.push('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setError(err.message || 'No se pudo cerrar sesión');
=======
      if (!res.ok) throw new Error(data.error || "Error al cerrar sesión");

      console.log("Logout exitoso, redirigiendo...");
      router.push("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError(err.message || "No se pudo cerrar sesión");
>>>>>>> backend
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

<<<<<<< HEAD
return (
  <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-96 text-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Perfil del Usuario</h1>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}
      </p>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>Usuario:</strong> {usuario.usuario}
      </p>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>Correo:</strong> {usuario.correo}
      </p>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>CURP:</strong> {usuario.curp}
      </p>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>Estado:</strong> {usuario.estado}
      </p>
      <p className="text-gray-900 dark:text-gray-200">
        <strong>Municipio:</strong> {usuario.municipio}
      </p>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => router.push('/inicio')}
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          ← Regresar al inicio
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Cerrar sesión
        </button>
=======
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Perfil del Usuario
        </h1>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Usuario:</strong> {usuario.usuario}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Perfil:</strong> {usuario.perfil}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Correo:</strong> {usuario.correo}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>CURP:</strong> {usuario.curp}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Estado:</strong> {usuario.estado}
        </p>
        <p className="text-gray-900 dark:text-gray-200">
          <strong>Municipio:</strong> {usuario.municipio}
        </p>
        

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => router.push("/inicio")}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            ← Regresar al inicio
          </button>

          {/* 🔹 Mostrar botón solo si el usuario es admin */}
          {(usuario.perfil === 'Administrador' || usuario.perfil === 'Superadmin') && (
            <button
              onClick={() => router.push("/admin")}
              className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
            >
              Panel de administración
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            Cerrar sesión
          </button>
        </div>
>>>>>>> backend
      </div>
    </div>
  </main>
);
}
