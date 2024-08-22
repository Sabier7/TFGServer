CREATE DATABASE IF NOT EXISTS mi_basededatos;
USE mi_basededatos;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    orden_de_trabajo INT,
    mecanico BOOLEAN,
    electrico BOOLEAN,
    fecha_de_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descripcion TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE inventarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_nombre VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    descripcion TEXT,
    fecha_de_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE codigos_qr (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    codigo_qr VARCHAR(255) NOT NULL,
    tipo ENUM('personal', 'producto'),
    fecha_de_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
