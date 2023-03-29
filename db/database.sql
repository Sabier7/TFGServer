    create database if not exists mi_basededatos;
    CREATE TABLE informacion (
    nombre VARCHAR(50),
    apellidos VARCHAR(50),
    telefono VARCHAR(20),
    orden_de_trabajo INT,
    tipo_de_trabajo ENUM('mecanico', 'electrico'),
    fecha_de_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
DESCRIBE informacion;