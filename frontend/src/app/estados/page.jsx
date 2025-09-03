"use client";

import { useEffect, useState } from "react";

export default function EstadosPage() {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState("");

  // Obtener lista de estados
  useEffect(() => {
    fetch("http://172.16.1.203:4000/api/estados")
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error("Error al obtener estados:", err));
  }, []);

  // Crear nuevo estado
  const handleAddEstado = async () => {
    if (!nuevoEstado.trim()) return;

    const res = await fetch("http://172.16.1.203:4000/api/estados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_estado: nuevoEstado }),
    });

    const data = await res.json();
    setEstados([...estados, data]); // agrega al listado
    setNuevoEstado("");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estados</h1>

      {/* Lista */}
      <ul className="mb-6">
        {estados.map((estado) => (
          <li key={estado.idEstado} className="border p-2 rounded mb-2">
            {estado.nombre_estado}
          </li>
        ))}
      </ul>

      {/* Formulario */}
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Nuevo estado"
          value={nuevoEstado}
          onChange={(e) => setNuevoEstado(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddEstado}
        >
          Agregar
        </button>
      </div>
    </main>
  );
}
