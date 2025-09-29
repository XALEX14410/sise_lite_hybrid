-- 03-perfiles.sql

INSERT INTO dbo_login_perfil (nombre, descripcion)
VALUES
('superadmin', 'Acceso total al sistema, incluyendo gestión de usuarios y configuraciones críticas'),
('admin', 'Gestión operativa del sistema, sin acceso a configuraciones sensibles'),
('docente', 'Acceso a módulos académicos, gestión de cursos y estudiantes'),
('alumno', 'Acceso limitado a contenidos, tareas y seguimiento académico personal');