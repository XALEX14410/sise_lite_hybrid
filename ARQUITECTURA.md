# Arquitectura del Sistema

## Modelo General
- Arquitectura cliente/servidor.
- Patrón MVC (Modelo-Vista-Controlador).
- Servicio web con PHP y JS.
- Base de datos MariaDB.
- Uso de hilos para operaciones concurrentes.
- Seguridad: autenticación, autorización y cifrado de datos.
- Despliegue en tres contenedores Docker distribuidos en diferentes equipos.

## Diagrama de Arquitectura


flowchart LR
    Cliente["Cliente (JS)"] --> WebServer["Servidor Web (PHP)"]
    WebServer --> DB["Base de Datos (MariaDB)"]
    WebServer --> Archivos["Servicio de Archivos"]
    Cliente <--> WebServer
    subgraph Docker
        Cliente
        WebServer
        DB
    end


## Detalles Técnicos
- Comunicación entre equipos mediante red local y APIs REST.
- Configuración de contenedores Docker para cada módulo.
- Seguridad implementada en cada capa.

## Flujo de Datos
- El cliente (JS) envía solicitudes HTTP al servidor web (PHP), que procesa la lógica y responde con datos o archivos.
- El servidor accede a la base de datos MariaDB para almacenar y recuperar información de calificaciones.
- El servicio de archivos permite la gestión y almacenamiento seguro de documentos escolares.

## Tecnologías Utilizadas
- Frontend: JavaScript, HTML, CSS, frameworks como Vue.js o React (opcional).
- Backend: PHP (con soporte para hilos mediante extensiones o procesos asíncronos).
- Base de datos: MariaDB, con acceso seguro y consultas optimizadas.
- Docker: cada módulo se ejecuta en un contenedor independiente, facilitando la escalabilidad y el despliegue distribuido.

## Ejemplo de Uso de Hilos
- Procesamiento de múltiples solicitudes simultáneas en el backend (PHP) usando hilos para mejorar el rendimiento en operaciones intensivas, como generación de reportes o procesamiento de archivos.

## Consideraciones de Seguridad
- Autenticación de usuarios mediante tokens o sesiones seguras.
- Autorización basada en roles (administrador, docente, alumno).
- Cifrado de datos sensibles en tránsito y en reposo.
- Validación de entradas para prevenir ataques comunes (SQL Injection, XSS).

## Despliegue y Comunicación entre Contenedores
- Los contenedores Docker se comunican mediante una red interna definida en Docker Compose.
- Cada equipo ejecuta un contenedor específico (cliente, servidor, base de datos) y se verifica la conectividad antes de iniciar el desarrollo.
- La integración se realiza mediante APIs REST y pruebas automatizadas para asegurar la compatibilidad entre módulos.

## Escalabilidad y Mantenimiento
- La arquitectura permite agregar nuevos módulos o servicios sin afectar el funcionamiento general.
- El uso de Docker facilita la actualización y mantenimiento de cada componente de forma independiente.

## Documentación y Validación
- Toda la documentación técnica y diagramas se mantienen actualizados en el repositorio GitHub.
- El diagrama de arquitectura debe ser validado y aprobado por el equipo antes de cada entrega parcial.

## Casos de Uso
- Registro y consulta de calificaciones por parte de docentes y alumnos.
- Generación de reportes académicos.
- Gestión y almacenamiento de documentos escolares.
- Administración de usuarios y roles.

## Recuperación ante Fallos
- Respaldos automáticos de la base de datos MariaDB.
- Monitoreo de servicios y reinicio automático de contenedores en caso de error.
- Logs centralizados para análisis de incidencias.

## Monitoreo y Herramientas
- Uso de herramientas como Portainer o Docker Dashboard para monitoreo de contenedores.
- Integración de sistemas de monitoreo como Prometheus y Grafana (opcional) para métricas y alertas.
- Registro de logs con herramientas como ELK Stack (Elasticsearch, Logstash, Kibana).

## Herramientas Recomendadas
- Visual Studio Code para desarrollo colaborativo.
- GitHub para control de versiones y documentación.
- Jira para gestión de tareas y planificación.
- Docker Compose para orquestación de contenedores.

## Escenarios de Integración
- Pruebas de integración entre módulos antes de cada entrega parcial.
- Validación de comunicación y compatibilidad entre equipos mediante APIs REST.

## Buenas Prácticas
- Mantener la documentación actualizada.
- Realizar revisiones de código y pruebas automatizadas.
- Seguir estándares de seguridad y desarrollo seguro.

## Entorno de Simulación y Entrega
- El sistema será entregado funcionando en tiempo real en una computadora con sistema operativo Rocky Linux 10.
- Se simulará un entorno de servidor web profesional, utilizando Docker y configuraciones similares a las de un hosting real o de paga (por ejemplo, Hostinger).
- Esta simulación permitirá validar el despliegue, la seguridad y la comunicación entre módulos como si estuviera en producción.
- El entorno Rocky Linux 10 facilita la compatibilidad y estabilidad para servicios web empresariales.
