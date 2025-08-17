# Explicación del Diagrama VPP y Uso de SQL en SISE Lite Hybrid

# Índice
1. Nota introductoria
2. Explicación de las tablas y ejemplos
   - Tabla: dbo_usuario
   - Tabla: dbo_login_perfil
3. Aclaraciones previas sobre el diagrama y la sintaxis SQL
4. Ejemplo detallado de uso de SQL LEFT JOIN

# Nota introductoria

**Archivo:** Explicacion_del_diagrama.md
**Diagrama VPP:** sise_sql_hybrid.vpp

Al observar el diagrama VPP (sise_sql_hybrid.vpp), puede parecer abrumador la cantidad de tablas y entidades mostradas. Sin embargo, en este archivo se explica la razón de la estructura y el propósito de cada tabla, utilizando ejemplos concretos de entidades que ya existen en el VPP. Esto ayudará a comprender cómo se relacionan y por qué están organizadas de esa manera.

# Explicación de las tablas y ejemplos


## Tabla: dbo_usuario
Contiene la información de los usuarios del sistema, como sus credenciales, estado y datos relacionados.

**Ejemplo de registros inventados:**

| idUsuario | idPersona | idPerfil | idPlantel | idCarrera | nuevoUsuario | Usuario     | Contraseña | Estado_Usuario | correo_electronico     | fecha_de_creacion | fecha_de_modificacion | modalidad | id_nivel_academico |
|-----------|-----------|----------|-----------|-----------|--------------|-------------|------------|----------------|------------------------|-------------------|----------------------|-----------|--------------------|
| 1         | 101       | 1        | 1         | 1         | 1            | superadmin  | 1234       | activo         | super@admin.com        | 2025-08-01        | 2025-08-10           | escolar   | 1                  |
| 2         | 102       | 2        | 1         | 2         | 0            | admin       | adminpass  | activo         | admin@admin.com        | 2025-08-02        | 2025-08-11           | escolar   | 2                  |
| 3         | 103       | 3        | 2         | 3         | 1            | usuario     | userpass   | inactivo       | usuario@correo.com     | 2025-08-03        | 2025-08-12           | mixta     | 2                  |

**Explicación de campos:**
- `idUsuario` [dbo_usuario]: Identificador único del usuario.
- `idPersona` [dbo_usuario]: Relación con la persona física.
- `idPerfil` [dbo_usuario]: Relación con el tipo de perfil (rol).
- `idPlantel` [dbo_usuario]: Plantel al que pertenece.
- `idCarrera` [dbo_usuario]: Carrera asociada.
- `nuevoUsuario` [dbo_usuario]: Indica si es usuario nuevo (1) o no (0).
- `Usuario` [dbo_usuario]: Nombre de usuario para login.
- `Contraseña` [dbo_usuario]: Contraseña del usuario.
- `Estado_Usuario` [dbo_usuario]: Estado (activo/inactivo).
- `correo_electronico` [dbo_usuario]: Email del usuario.
- `fecha_de_creacion` [dbo_usuario]: Fecha de creación del registro.
- `fecha_de_modificacion` [dbo_usuario]: Fecha de última modificación.
- `modalidad` [dbo_usuario]: Modalidad de estudio.
- `id_nivel_academico` [dbo_usuario]: Nivel académico.

## Tabla: dbo_login_perfil
Define los perfiles o roles que pueden tener los usuarios.

**Ejemplo de registros inventados:**

| idPerfil | perfil      |
|----------|-------------|
| 1        | superadmin  |
| 2        | admin       |


**Explicación de campos:**
- `idPerfil` [dbo_login_perfil]: Identificador único del perfil.
- `perfil` [dbo_login_perfil]: Nombre del perfil (rol).

# Aclaraciones previas sobre el diagrama y la sintaxis SQL

**1. Sobre el uso de los puntos en SQL (alias y campos):**
En SQL, el punto (.) se utiliza para especificar a qué tabla y, opcionalmente, a qué base de datos pertenece cada campo. El formato general es `[nombre base de datos].[nombre tabla].[nombre campo]`, aunque normalmente basta con `[nombre tabla].[nombre campo]` si ya se está trabajando dentro de una base de datos específica. Esto es útil para evitar ambigüedades cuando hay varias tablas con campos similares o cuando se usan alias en las consultas.

Por ejemplo, en `dbo_usuario.idUsuario`, "dbo_usuario" es el nombre de la tabla y "idUsuario" es el campo. Si se usa un alias, como en `u.idUsuario`, "u" representa la tabla dbo_usuario.

**2. ¿Por qué el diagrama VPP parece confuso?**
El diagrama VPP muestra muchas tablas y relaciones, lo que puede parecer complejo a primera vista. Sin embargo, esta sección del archivo está diseñada para explicar la lógica detrás de esa estructura y cómo cada tabla se relaciona, facilitando la comprensión del modelo de datos.

# Ejemplo detallado de uso de SQL LEFT JOIN

El LEFT JOIN en SQL permite combinar registros de dos tablas, mostrando todos los registros de la tabla izquierda (por ejemplo, dbo_usuario) y los registros coincidentes de la tabla derecha (por ejemplo, dbo_login_perfil). Si no hay coincidencia, los campos de la tabla derecha aparecerán como NULL.

**Supongamos que queremos obtener la lista de usuarios junto con el nombre de su perfil:**

```sql
SELECT u.idUsuario, u.Usuario, u.Estado_Usuario, p.perfil
FROM dbo_usuario u
LEFT JOIN dbo_login_perfil p ON u.idPerfil = p.idPerfil;
```

**Explicación del query:**
- `SELECT u.idUsuario, u.Usuario, u.Estado_Usuario, p.perfil`: Selecciona el ID, nombre de usuario, estado y el nombre del perfil.
- `FROM dbo_usuario u`: Indica que la tabla principal es dbo_usuario, con alias "u".
- `LEFT JOIN dbo_login_perfil p ON u.idPerfil = p.idPerfil`: Une la tabla dbo_login_perfil (alias "p") usando la relación entre idPerfil de ambas tablas. El LEFT JOIN asegura que todos los usuarios se muestren, incluso si no tienen perfil asignado.

**Ejemplo de resultado con todos los campos:**
| idUsuario | idPersona | idPerfil | idPlantel | idCarrera | nuevoUsuario | Usuario     | Contraseña | Estado_Usuario | correo_electronico     | fecha_de_creacion | fecha_de_modificacion | modalidad | id_nivel_academico | perfil     |
|-----------|-----------|----------|-----------|-----------|--------------|-------------|------------|----------------|------------------------|-------------------|----------------------|-----------|--------------------|------------|
| 1         | 101       | 1        | 1         | 1         | 1            | superadmin  | 1234       | activo         | super@admin.com        | 2025-08-01        | 2025-08-10           | escolar   | 1                  | superadmin |
| 2         | 102       | 2        | 1         | 2         | 0            | admin       | adminpass  | activo         | admin@admin.com        | 2025-08-02        | 2025-08-11           | escolar   | 2                  | admin      |
| 3         | 103       | 3        | 2         | 3         | 1            | usuario     | userpass   | inactivo       | usuario@correo.com     | 2025-08-03        | 2025-08-12           | mixta     | 2                  | NULL       |

En este ejemplo, si el usuario tiene un perfil válido, se muestra el nombre del perfil. Si no existe coincidencia en dbo_login_perfil, el campo "perfil" será NULL.

**Ventajas del LEFT JOIN:**
- Permite identificar usuarios sin perfil asignado.
- Es útil para reportes y auditorías donde se requiere mostrar todos los registros de una tabla principal, independientemente de la existencia de datos relacionados en la tabla secundaria.

**Comentarios en el query:**
```sql
SELECT 
    u.idUsuario,           -- Identificador único del usuario
    u.Usuario,             -- Nombre de usuario
    u.Estado_Usuario,      -- Estado del usuario (activo/inactivo)
    p.perfil               -- Nombre del perfil (puede ser NULL)
FROM dbo_usuario u         -- Tabla principal: usuarios
LEFT JOIN dbo_login_perfil p   -- Tabla secundaria: perfiles
    ON u.idPerfil = p.idPerfil -- Relación entre usuario y perfil
```

Este tipo de consulta es fundamental para obtener información completa y detectar posibles inconsistencias o datos faltantes en la relación entre tablas.

---

> **Nota:** Si alguna parte del contenido no queda clara o surge alguna duda, por favor consulte directamente con el autor del documento para una explicación personalizada.





