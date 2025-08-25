const API_URL = "http://172.16.1.203:9000"; // Cambia si tu backend corre en otro puerto

// OBTENER usuarios
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Error obteniendo usuarios");
  return await res.json();
}

// CREAR usuario
export async function createUsuario(usuario) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error("Error creando usuario");
  return await res.json();
}

// ELIMINAR usuario
export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error eliminando usuario");
  return await res.json();
}
