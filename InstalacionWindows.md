Docker Compose es una herramienta que permite definir y ejecutar aplicaciones multicontenedor usando un solo archivo (docker-compose.yml).
Con él puedes levantar tu base de datos, servidor backend y frontend juntos con un solo comando.

## Instalación
Debes tener Docker Desktop instalado previamente.

Verifica que Docker Compose está disponible con el siguiente comando en terminal:
`docker compose version`

## Comandos para Docker Compose
Dentro de la carpeta donde existe `docker-compose.yml`:

- Levantar los servicios
`docker compose up`
(agrega `-d` para que corra en segundo plano).

- Detener los servicios
`docker compose down`

- Reiniciar un servicio específico
`docker compose restart web`

- Ver logs
`docker compose logs -f`

- Ejecutar un comando dentro de un contenedor
`docker compose exec db bash`

## Buenas prácticas
- Usa **volúmenes** para no perder datos al reiniciar contenedores.
- Define variables sensibles en un archivo `.env` y cárgalas en `docker-compose.yml`.
- Versiona tu `docker-compose.yml` en Git, pero no tus datos.
- Usa `depends_on` para manejar dependencias de arranque.

## Recursos extra
- Documentación oficial: [docs.docker.com/compose]