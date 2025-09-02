# Tabla `dbo_estados`

Esta tabla almacena la información de las entidades federativas (estados) de México. Es utilizada para identificar y relacionar los estados en el sistema.

## Estructura de la tabla

- **idEstado**: Identificador único para cada estado (entero, clave primaria).
- **estado**: Nombre completo del estado (cadena de hasta 70 caracteres).
- **alias**: Abreviatura o alias del estado (cadena de hasta 10 caracteres).

## Ejemplo de uso
La tabla puede ser utilizada para:
- Mostrar la lista de estados en formularios o reportes.
- Relacionar municipios, personas u otras entidades con el estado correspondiente.
- Realizar búsquedas o filtros por estado.

## Ejemplo de registro
| idEstado | estado           | alias |
|----------|------------------|-------|
| 1        | Aguascalientes   | AGS   |
| 7        | Ciudad de México | CDMX  |
| 15       | Jalisco          | JAL   |

## Notas
- La tabla está diseñada para integrarse con otras tablas, como `dbo_municipios`, mediante el campo `idEstado`.
- El campo `alias` facilita la visualización y el filtrado rápido por abreviatura.
