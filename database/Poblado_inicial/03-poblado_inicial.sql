-- =============================================================
-- Script de datos iniciales para el sistema 'sisesqlhybrid'
-- =============================================================

-- Desactivar temporalmente las comprobaciones de claves foráneas
-- Esto evita errores al insertar datos en un orden no estricto
-- debido a las relaciones complejas de las tablas.
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------
-- 1. Población de tablas sin dependencias (o con dependencias externas)
-- -----------------------------------------------------------------

-- NOTA: Tablas dbo_estados y dbo_municipios ya existen y están pobladas.
-- Si no, es necesario crearlas e insertar datos básicos.

-- Datos para dbo_login_perfil (Perfiles de acceso)
INSERT INTO dbo_login_perfil (nombre, descripcion) VALUES
('Superadmin', 'Acceso total al sistema y gestion de usuarios.'),
('Administrador', 'Gestión de procesos académicos, administrativos y reportes.'),
('Docente', 'Gestión de materias, grupos y calificaciones.'),
('Alumno', 'Acceso a su información personal, calificaciones y pagos.');

-- Datos para dbo_plantel
INSERT INTO dbo_plantel (idMunicipio, idEstado, nombre_plantel) VALUES
(1001, 1, 'Plantel Orizaba'),
(1002, 1, 'Plantel Córdoba');

-- Datos para dbo_carrera
INSERT INTO dbo_carrera (carrera, duracion_semestres, descripcion, idPlantel) VALUES
('Ingeniería en Sistemas', 9, 'Carrera enfocada en el desarrollo de software y gestión de sistemas.', 1),
('Licenciatura en Administración', 8, 'Carrera enfocada en la gestión de empresas y recursos.', 1);

-- -----------------------------------------------------------------
-- 2. Población de tablas con dependencias (personas y usuarios)
-- -----------------------------------------------------------------

-- Datos para dbo_persona (Personas genéricas y de ejemplo)
INSERT INTO dbo_persona (nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio)
VALUES
('GEN', 'SUPERADMIN', 'GEN', '2000-01-01', 'M', 'GENSADM000101HDFR1', 1, 1001),
('GEN', 'ADMIN', 'GEN', '2000-01-01', 'F', 'GENADM000101HDFR2', 1, 1001),
('GEN', 'DOCENTE', 'GEN', '2000-01-01', 'M', 'GENDOC000101HDFR3', 1, 1001),
('JOSEPH EMILIANO', 'RUANO', 'GALVEZ', '2001-08-07', 'M', 'JERG010807HDFALU01', 1, 1001),
('PEDRO PABLO', 'MORA', 'FLORES', '2003-06-29', 'M', 'PPMF030629HDFALU02', 1, 1002);

-- Datos para dbo_usuario
-- Nota: 'idGrupo' se dejará como NULL por ahora para evitar un error, ya que no se ha poblado 'dbo_grupo'.
-- Se actualizará más tarde.
INSERT INTO dbo_usuario (idPersona, nuevoUsuario, Usuario, Contraseña, correo_electronico, fecha_de_creacion, fecha_de_modificacion, status, ultimo_login, idGrupo)
VALUES
(1, 1, 0001, '0001', 'superadmin@email.com', NOW(), NOW(), 1, CURDATE(), NULL), -- Usuario id 1
(2, 1, 0002, '0002', 'admin@email.com', NOW(), NOW(), 1, CURDATE(), NULL),      -- Usuario id 2
(3, 1, 0003, '0003', 'docente@email.com', NOW(), NOW(), 1, CURDATE(), NULL),      -- Usuario id 3
(4, 1, 22103001, '1234', 'joseph.ruano@email.com', NOW(), NOW(), 1, CURDATE(), NULL),  -- Usuario id 4
(5, 1, 22103003, '1234', 'pedro.mora@email.com', NOW(), NOW(), 1, CURDATE(), NULL);  -- Usuario id 5

-- -----------------------------------------------------------------
-- 3. Población de tablas secundarias (docentes, alumnos, etc.)
-- -----------------------------------------------------------------

-- Datos para dbo_docente
INSERT INTO dbo_docente (idUsuario) VALUES (3); -- El usuario con id=3 es el docente.

-- Datos para dbo_alumno
INSERT INTO dbo_alumno (idUsuario, idCarrera, matricula, semestre_actual) VALUES
(4, 1, '22103001', '1'), -- Usuario id=4, carrera id=1
(5, 1, '22103003', '1'); -- Usuario id=5, carrera id=1

-- Datos para dbo_grupo
-- Se necesitan idDocente y idMateria, por lo que crearemos un grupo de ejemplo.
-- Asumiremos que el idDocente es 1 (el único que hemos insertado)
INSERT INTO dbo_grupo (idDocente, idMateria, preido, clave_grupo, cupo) VALUES
(1, 1, '2025-2', 'SYS-101', 30);

-- -----------------------------------------------------------------
-- 4. Actualización de datos dependientes y vinculación final
-- -----------------------------------------------------------------

-- Actualizar el campo idGrupo en la tabla dbo_usuario
-- Esto lo hacemos una vez que dbo_grupo ya está poblado.
UPDATE dbo_usuario SET idGrupo = 1 WHERE idUsuario IN (1, 2, 3);
UPDATE dbo_usuario SET idGrupo = 1 WHERE idUsuario IN (4, 5);

-- Asignar perfiles a los usuarios
INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil) VALUES
(1, 1), -- Usuario 1 (Superadmin) -> Perfil 1 (Superadmin)
(2, 2), -- Usuario 2 (Admin) -> Perfil 2 (Administrador)
(3, 3), -- Usuario 3 (Docente) -> Perfil 3 (Docente)
(4, 4), -- Usuario 4 (Joseph) -> Perfil 4 (Alumno)
(5, 4); -- Usuario 5 (Pedro) -> Perfil 4 (Alumno)

-- Re-activar la comprobación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;