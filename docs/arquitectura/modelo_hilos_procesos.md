# Modelo de hilos y procesos para **SISE Lite Hybrid**

---

## 📑 Índice

- [1. Contexto operativo actual](#1-contexto-operativo-actual)
- [2. Objetivos del modelo de concurrencia](#2-objetivos-del-modelo-de-concurrencia)
- [3. Arquitectura propuesta de procesos e hilos](#3-arquitectura-propuesta-de-procesos-e-hilos)
- [4. Flujo end-to-end propuesto](#4-flujo-end-to-end-propuesto)
- [5. Pseudocódigo de referencia](#5-pseudocódigo-de-referencia)
- [6. Justificación técnica](#6-justificación-técnica)
- [7. Librerías/APIs recomendadas](#7-libreríasapis-recomendadas)
- [8. Plan de implementación y validación](#8-plan-de-implementación-y-validación)

---

## 1. Contexto operativo actual

- El backend del proyecto expone un **servidor Express único** que concentra *middlewares* de sesión, registro y CORS.  
- Publica rutas REST para dominios funcionales como:
  - Usuarios
  - Login
  - Carreras
  - Inscripciones
  - Grupos
  - Horarios
  - Docentes
  - Alumnos  
- Las operaciones de datos se realizan mediante un **pool de conexiones MariaDB** con un límite de **5 sesiones concurrentes**, lo que:
  - Protege a la base de datos de sobrecarga.
  - Introduce una restricción explícita de paralelismo en el acceso a datos.  
- Los controladores están escritos con **async/await**, aprovechando la naturaleza **no bloqueante de Node.js** para consultas SQL y manejo de sesión.

---

## 2. Objetivos del modelo de concurrencia

- Aprovechar todos los **núcleos disponibles** del servidor sin romper la semántica del código existente.  
- Separar **cargas de trabajo I/O vs. CPU** para mantener baja latencia.  
- Garantizar comunicación **eficiente y segura** entre procesos e hilos.  
- Facilitar operaciones y monitoreo mediante **herramientas estandarizadas**.  
- Proveer un **plan de validación** junto al equipo backend liderado por **@Joseph Ruano**.  

---

## 3. Arquitectura propuesta de procesos e hilos

| **Capa**                        | **Responsabilidad**                                                                 | **Comunicación**                                                                 |
|---------------------------------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Coordinador (Proceso maestro)** | Inicializa clúster, distribuye *workers*, aplica política de reintentos y health-check. | Mensajes de control (`cluster.on('message')`), métricas externas (PM2).          |
| **Workers HTTP (Procesos forked)** | Ejecutan la app Express existente y reutilizan el pool MariaDB; cada worker mantiene su propio *event loop*. | Balanceo round-robin del cluster o **PM2 + sticky sessions** si se usa WebSocket. |
| **Worker Threads** (por proceso) | Ejecutan tareas **CPU-intensivas** (reportes, cifrado, validaciones masivas).       | `parentPort.postMessage()` y colas de trabajo (BullMQ).                         |
| **Cola de trabajos / tareas diferidas** | Procesamiento asíncrono (correos, integraciones con sistemas legados).              | Redis + BullMQ o RabbitMQ + amqplib.                                            |
| **Módulo de observabilidad**     | Monitoreo, métricas y logging centralizado.                                         | PM2, Prometheus exporters, Elastic Stack.                                       |

> El código actual se mantiene en los **workers HTTP** sin cambios disruptivos.  
> Coordinador y *worker threads* se encapsulan en archivos nuevos.  
> El pool puede ampliarse (`connectionLimit`) o replicarse por *worker* según crecimiento.

---

## 4. Flujo end-to-end propuesto

```mermaid
flowchart LR
    subgraph Master["Proceso maestro (cluster/PM2)"]
      A[Arranque del orquestador]
      A --> B{¿Worker saludable?}
      B -- No --> C[Reemplazar worker]
    end

    subgraph WorkerHTTP["Worker HTTP (Express + pool MariaDB)"]
      D[Petición entrante]
      D --> E{¿Tarea CPU intensiva?}
      E -- No --> F[Ejecutar controlador async/await\n(consultas vía pool)]
      E -- Sí --> G[Publicar tarea en cola\n+ invocar worker thread]
    end

    subgraph TareasAsincronas["Worker thread / Job queue"]
      G --> H[Procesar en worker thread]
      H --> I[Devolver resultado\npor mensajes]
    end

    F --> J[Responder HTTP]
    I --> J
```

> **Nota:** Para visualizar el diagrama, asegúrate de que tu visor de Markdown soporte [Mermaid](https://mermaid-js.github.io/mermaid/#/) (por ejemplo, VS Code con la extensión adecuada, GitHub, o herramientas compatibles).


---

## 5. Pseudocódigo de referencia

```js
// master.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
    const cpuCount = os.availableParallelism();
    for (let i = 0; i < cpuCount; i++) cluster.fork();

    cluster.on('exit', (worker, code) => {
        console.warn(`Worker ${worker.process.pid} terminó con código ${code}. Reiniciando...`);
        cluster.fork();
    });
} else {
    require('./server'); // archivo existente de Express
}

// workerTask.js
const { parentPort } = require('worker_threads');

parentPort.on('message', async (payload) => {
    const result = await runHeavyTask(payload);
    parentPort.postMessage(result);
});

// controlador (extracto)
const { Worker } = require('worker_threads');

async function generarReporte(req, res, next) {
    if (!req.query.fullScan) return next();
    const worker = new Worker(new URL('./workerTask.js', import.meta.url));
    worker.postMessage({ userId: req.session.usuario.id });

    worker.once('message', (resultado) => res.json(resultado));
    worker.once('error', next);
}
```

---

## 6. Justificación técnica

- **Escalamiento horizontal:** Cluster/PM2 ejecuta múltiples instancias Express sobre varios núcleos físicos sin reescribir la lógica.
- **Protección del event loop:** Las consultas I/O siguen con async/await. Tareas pesadas pasan a worker threads.
- **Resiliencia y operaciones:** PM2 facilita despliegue zero-downtime y supervisión. Colas desacoplan tareas no críticas.
- **Comunicación eficiente:** Uso de IPC nativo (cluster, parentPort) y colas persistentes uniformes y observables.

---

## 7. Librerías/APIs recomendadas

- **Node.js cluster:** creación de procesos hijo y round-robin balancing.
- **Node.js worker_threads:** paralelización de CPU-bound.
- **PM2:** process manager con métricas y despliegue sin downtime.
- **BullMQ o Agenda + Redis:** colas persistentes.
- **RabbitMQ (AMQP):** alternativa corporativa.
- **prom-client + Prometheus:** métricas.
- **winston:** logging estructurado.

---

## 8. Plan de implementación y validación

- **Semana 1 (PoC técnica):** rama laboratorio con master.js + server.js, 2 workers, medir throughput vs instancia única.
- **Semana 2 (Pruebas regresión):** ejecutar pruebas funcionales + carga ligera con Locust/K6.
- **Semana 3 (Worker threads):** migrar endpoints candidatos (ej. generación de reportes).
- **Semanas 3-4 (Observabilidad):** configurar PM2 + dashboards en Grafana/Keymetrics.
- **DB Capacity Check:** ajustar connectionLimit (10–15 conexiones).
- **Validación final:** resultados + checklist de riesgos a @Joseph Ruano, documentar en /docs/arquitectura.

---
