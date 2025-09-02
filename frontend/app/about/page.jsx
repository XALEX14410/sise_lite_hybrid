export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Acerca de (About) 🧑‍💻</h1>
      <p className="text-lg text-gray-700 mb-6">Esta es la página de Acerca de. Aquí puedes poner información sobre el proyecto o el autor.</p>
      <a href="/" className="text-blue-600 hover:underline">Volver al inicio</a>
    </div>
  );
}
