import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center transform transition hover:scale-105 hover:shadow-blue-200">
        <Image
          src="/next.svg" // asegúrate de tener el archivo en /public
          alt="Next.js Logo"
          width={80}
          height={80}
          className="mx-auto mb-6 animate-pulse"
        />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bienvenido 👋
        </h1>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Esta es la página de inicio (index)</h2>
          <p className="text-md text-gray-500 mb-6">Estás en la raíz del proyecto Next.js, usando React y JavaScript (.jsx).</p>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Esta es una página de ejemplo creada con{" "}
          <span className="font-semibold text-blue-600">Next.js</span> y{" "}
          <span className="font-semibold text-sky-500">Tailwind CSS</span>.
        </p>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Navega a otras páginas:</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-blue-600 hover:underline">Ir a Acerca de (About) - Personaje: 🧑‍💻</a>
              </li>
              <li>
                <a href="/contact" className="text-blue-600 hover:underline">Ir a Contacto (Contact) - Personaje: 📞</a>
              </li>
              <li>
                <a href="/galeria" className="text-blue-600 hover:underline">Ir a Galería (Galeria) - Personaje: 🖼️</a>
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <p className="text-sm text-gray-400">Este proyecto está hecho con <span className="font-bold text-blue-500">React</span> y <span className="font-bold text-sky-500">Next.js</span>. Puedes crear más páginas agregando archivos en la carpeta <code className="bg-gray-100 px-2 py-1 rounded">app/</code>.</p>
          </div>
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          Aprende más sobre Next.js 🚀
        </a>
      </div>
    </div>
  );
}
