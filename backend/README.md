Instrucciones de Ejecución del Backend
Este documento detalla cómo poner en marcha el servidor backend del proyecto.

Requisitos:
Para ejecutar el servidor es necesario tener instalado:
- Node.js: Versión 18 o superior.
- Docker Desktop. Incluye en su instalación el Docker Compose.

Ejecución con Docker
- Navegar al directorio del proyecto: La carpeta sise_lite_hybrid
- Levantar el servidor con Docker compose: docker-compose up (Se creó una versión simple de docker-compose.yml que solo levanta el servicio para realizar pruebas)

El servidor estará disponible en: http://localhost:9000, y podrás ver una respuesta JSON con el mensaje: {"message":"mensaje"} para verificar que funciona correctamente.
