# Tablas de Entidades Federativas y Municipios de México

Este documento describe la estructura y uso de las tablas principales para la gestión de entidades federativas y municipios en México dentro del sistema.

---

## Tabla `dbo_estados`

Almacena la información de los estados de México, permitiendo su identificación y relación con otras entidades.

### Estructura

- **idEstado**: Identificador único del estado (entero, clave primaria).
- **estado**: Nombre completo del estado (cadena, hasta 70 caracteres).
- **alias**: Abreviatura del estado (cadena, hasta 10 caracteres).

### Ejemplo de registros

| idEstado | estado           | alias |
|----------|------------------|-------|
| 1        | Aguascalientes   | AGS   |
| 7        | Ciudad de México | CDMX  |
| 15       | Jalisco          | JAL   |

### Usos comunes

- Listar estados en formularios y reportes.
- Relacionar municipios, personas u otras entidades con su estado.
- Filtrar y buscar información por estado o alias.

### Notas

- Se integra con otras tablas, como `dbo_municipios`, mediante el campo `idEstado`.
- El campo `alias` permite visualización y filtrado eficiente.

---

## Tabla `dbo_municipios`

Contiene los municipios de México y su relación directa con los estados.

### Estructura

- **idMunicipio**: Identificador único del municipio (entero, clave primaria).
- **municipio**: Nombre completo del municipio (cadena, hasta 80 caracteres).
- **idEstado**: Identificador del estado al que pertenece (entero, clave foránea).

### Relación

Cada municipio está vinculado a un estado por el campo `idEstado`, facilitando la organización territorial.

### Ejemplo de registros

| idMunicipio | municipio       | idEstado |
|-------------|----------------|----------|
| 1001        | Aguascalientes | 1        |
| 7001        | Acacoyagua     | 7        |
| 15025       | Chalco         | 15       |

---

## Ventajas de la organización

- Permite una gestión eficiente de la información territorial.
- Facilita la integración y consulta entre diferentes entidades administrativas.
- Optimiza búsquedas y reportes por estado y municipio.

