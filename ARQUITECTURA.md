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

```mermaid
flowchart LR
    Cliente[ "Cliente (JS)" ] --> WebServer[ "Servidor Web (PHP)" ]
    WebServer --> DB[ "Base de Datos (MariaDB)" ]
    WebServer --> Archivos[ "Servicio de Archivos" ]
    Cliente <--> WebServer
    subgraph Docker
        Cliente
        WebServer
        DB
    end

```

## Detalles Técnicos
- Comunicación entre equipos mediante red local y APIs REST.
- Configuración de contenedores Docker para cada módulo.
- Seguridad implementada en cada capa.
