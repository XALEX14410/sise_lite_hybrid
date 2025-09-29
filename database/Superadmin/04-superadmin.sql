-- 04-superadmin.sql

INSERT INTO dbo_persona (nombre,idEstado, idMunicipio)
VALUES(
    'superadmin',
    30,
    30119
);

INSERT INTO dbo_usuario (usuario, contrasena, correo_electronico, idPersona)
VALUES(
    25000001,
    1234,
    'superadmin@email.com',
    1
);

INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
VALUES(
    1,
    1
)