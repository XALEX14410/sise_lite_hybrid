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

-- NOTA: Asumo que las tablas dbo_estados y dbo_municipios ya existen y están pobladas.
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
('Licenciatura en Administración', 8, 'Carrera enfocada en la gestión de empresas, recursos humanos y financieros.', 1),
('Licenciatura en Contaduría', 8, 'Carrera que forma profesionales en contabilidad, finanzas y auditoría.', 1),
('Licenciatura en Mercadotecnia', 8, 'Carrera orientada al análisis de mercados, publicidad y estrategias comerciales.', 1),
('Licenciatura en Negocios y Comercio Internacional', 8, 'Carrera enfocada en operaciones internacionales, logística y relaciones comerciales globales.', 1),
('Licenciatura en Ciencias de la Comunicación', 9, 'Carrera dedicada al estudio de los medios, comunicación organizacional y periodismo.', 1),
('Licenciatura en Educación', 8, 'Carrera centrada en la formación pedagógica, docencia y desarrollo educativo.', 1),
('Licenciatura en Derecho', 8, 'Carrera que forma profesionales del ámbito jurídico con enfoque en leyes y justicia.', 1),
('Licenciatura en Ingeniería en Sistemas Computacionales', 9, 'Carrera enfocada en el desarrollo de software, redes y soluciones tecnológicas.', 1),
('Licenciatura en Gestión Ambiental', 8, 'Carrera orientada a la sostenibilidad, manejo de recursos naturales y protección ambiental.', 1);

-- -----------------------------------------------------------------
-- 2. Población de tablas con dependencias (personas y usuarios)
-- -----------------------------------------------------------------

-- Datos para dbo_persona (Personas genéricas y de ejemplo)
INSERT INTO dbo_persona (nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio)
VALUES
('GEN', 'SUPERADMIN', 'GEN', '2000-01-01', 'M', 'GENSADM000101HDFR1', 1, 1001),
('GEN', 'ADMIN', 'GEN', '2000-01-01', 'M', 'GENADM000101HDFR2', 1, 1001),
('GEN', 'DOCENTE', 'GEN', '2000-01-01', 'M', 'GENDOC000101HDFR3', 1, 1001),
('JOSEPH EMILIANO', 'RUANO', 'GALVEZ', '2001-08-07', 'M', 'JERG010807HDFALU01', 1, 1001),
('ALEXIS EMMANUEL', 'FERNANDEZ', 'GONZALEZ', '2003-09-21', 'M', 'AEFG030921HDFALU02', 1, 1001),
('PEDRO PABLO', 'MORA', 'FLORES', '2003-06-29', 'M', 'PPMF030629HDFALU03', 1, 1001),
('DANIEL DE JESUS', 'NOGALES', 'ESCALONA', '2003-07-03', 'M', 'DJNE030703HDFALU04', 1, 1001),
('JESUS ALEJANDRO', 'LARA', 'CASTRO', '2003-09-05', 'M', 'JALC030905HDFALU05', 1, 1001,
('CLAUDIO', 'CARRERA', 'HERNANDEZ', '2001-10-30', 'M', 'CACH011030HDFALU06', 1, 1001);

-- Datos para dbo_usuario
-- Nota: 'idGrupo' se dejará como NULL por ahora para evitar un error, ya que no se ha poblado 'dbo_grupo'.
-- Se actualizará más tarde.
INSERT INTO dbo_usuario (idPersona, nuevoUsuario, Usuario, Contraseña, correo_electronico, fecha_de_creacion, fecha_de_modificacion, status, ultimo_login, idGrupo)
VALUES
(1, 1, 0001, '0001', 'superadmin@email.com', NOW(), NOW(), 1, CURDATE(), NULL),             -- Usuario id 1
(2, 1, 0002, '0002', 'admin@email.com', NOW(), NOW(), 1, CURDATE(), NULL),                  -- Usuario id 2
(3, 1, 0003, '0003', 'docente@email.com', NOW(), NOW(), 1, CURDATE(), NULL),                -- Usuario id 3
(4, 1, 22103001, '1234', 'joseph.ruano@email.com', NOW(), NOW(), 1, CURDATE(), NULL),       -- Usuario id 4
(5, 1, 22103002, '1234', 'alexis.fernandez@email.com', NOW(), NOW(), 1, CURDATE(), NULL),   -- Usuario id 5
(6, 1, 22103003, '1234', 'pedro.mora@email.com', NOW(), NOW(), 1, CURDATE(), NULL),         -- Usuario id 6
(7, 1, 22103004, '1234', 'daniel.nogales@email.com', NOW(), NOW(), 1, CURDATE(), NULL),     -- Usuario id 7
(8, 1, 22103005, '1234', 'jesus.lara@email.com', NOW(), NOW(), 1, CURDATE(), NULL),         -- Usuario id 8
(9, 1, 22103007, '1234', 'claudio.carrera@email.com', NOW(), NOW(), 1, CURDATE(), NULL);    -- Usuario id 9

-- -----------------------------------------------------------------
-- 3. Población de tablas secundarias (docentes, alumnos, etc.)
-- -----------------------------------------------------------------

-- Datos para dbo_docente
INSERT INTO dbo_docente (idUsuario) VALUES (3); -- El usuario con id=3 es el docente.

-- Datos para dbo_alumno
INSERT INTO dbo_alumno (idUsuario, idCarrera, matricula, semestre_actual) VALUES
(4, 1, '22103001', '1'), -- Joseph Emiliano Ruano Galvez
(5, 1, '22103002', '1'), -- Alexis Emmanuel Fernandez Gonzalez
(6, 1, '22103003', '1'), -- Pedro Pablo Mora Flores
(7, 1, '22103004', '1'), -- Daniel de Jesus Nogales Escalona
(8, 1, '22103005', '1'), -- Jesus Alejandro Lara Castro
(9, 1, '22103007', '1'); -- Claudio Carrera Hernandez

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
(4, 4), -- Usuario 4 (Joseph Emiliano Ruano) -> Perfil 4 (Alumno)
(5, 4), -- Usuario 5 (Alexis Emmanuel Fernandez) -> Perfil 4 (Alumno)
(6, 4), -- Usuario 6 (Pedro Pablo Mora) -> Perfil 4 (Alumno)
(7, 4), -- Usuario 7 (Daniel de Jesus Nogales) -> Perfil 4 (Alumno)
(8, 4), -- Usuario 8 (Jesus Alejandro Lara) -> Perfil 4 (Alumno)
(9, 4); -- Usuario 9 (Claudio Carrera) -> Perfil 4 (Alumno)

-- Re-activar la comprobación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;