# Usamos la imagen oficial de MariaDB como base
FROM mariadb:11

# Copiar el SQL de entidades federativas
COPY ./Entidades_federativas/01-Entidades_federativas.sql /docker-entrypoint-initdb.d/

# Copiar el SQL al directorio de inicialización de MariaDB
COPY ./Sistema/02-sisesqlhybrid.sql /docker-entrypoint-initdb.d/

# Copiar el SQL de datos iniciales al directorio de inicialización de MariaDB
COPY ./Poblado_inicial/03-poblado_inicial.sql /docker-entrypoint-initdb.d/