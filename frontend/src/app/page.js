"use client";
import { useState, useEffect } from "react";
import { getUsuarios, createUsuario, deleteUsuario } from "@/lib/api";

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  // Cargar usuarios desde el backend
  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setRows(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Crear usuario de prueba
  const seed = async () => {
    await createUsuario({
      id: Date.now(),
      name: "Nuevo Usuario",
      email: "nuevo@example.com",
      role: "Viewer",
    });
    loadUsuarios();
  };

  // Eliminar usuario
  const remove = async (id) => {
    if (!confirm(`¿Eliminar el usuario #${id}?`)) return;
    await deleteUsuario(id);
    loadUsuarios();
  };

  // Filtrado
  const filtered = rows.filter((r) =>
    [r.name, r.email, r.role].some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">CRUD de Usuarios</h1>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 border border-gray-600"
          />
          <button
            onClick={seed}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
          >
            Crear demo
          </button>
        </div>
      </header>

      <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No hay registros
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-gray-700">
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.role}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-3 py-1 bg-yellow-600 rounded">
                      Editar
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="px-3 py-1 bg-red-600 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
