select * from tipo_impresora;

INSERT INTO tipo_impresora (nombre) VALUES ('Láser');
INSERT INTO tipo_impresora (nombre) VALUES ('Sistema Continuo');
UPDATE tipo_impresora SET id_tipo_impresora = 2 WHERE id_tipo_impresora = 5;

delete from tipo_impresora where id_tipo_impresora = 2;
delete from tipo_impresora where id_tipo_impresora = 3;
delete from tipo_impresora where id_tipo_impresora = 4;

CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    tipo_printer INT,
    FOREIGN KEY (tipo_printer) REFERENCES tipo_impresora(id_tipo_impresora) ON DELETE SET NULL 
);

CREATE TABLE impresoras (
    id_impresora INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50),
    numero_serie VARCHAR (50),
    num_inventario INT,
    tipo INT ,
    propiedad ENUM('propia', 'alquilada'),
    contador_impresiones INT DEFAULT 0,
    ubicacion VARCHAR(100),
    fecha_registro DATE,
    id_area INT,
    FOREIGN KEY (id_area) REFERENCES areas(id_area) ON DELETE SET NULL,
    FOREIGN KEY (tipo) REFERENCES tipo_impresora(id_tipo_impresora) ON DELETE SET NULL
);

INSERT INTO impresoras (marca, modelo, tipo, propiedad, contador_impresiones, ubicacion, fecha_registro, id_area)
VALUES ('HP', 'LaserJet Pro', 1, 'propia', 500, 'Oficina Central', '2024-11-13', 2);
INSERT INTO impresoras (marca, modelo, tipo, propiedad, contador_impresiones, ubicacion, fecha_registro, id_area)
VALUES ('BROTHER', 'L5650', 1, 'alquilada', 500, 'compras', '2024-11-13', 2);

ALTER TABLE impresoras MODIFY fecha_registro datetime default current_timestamp ;

select * from impresoras;

CREATE TABLE mantenimientos (
    id_mantenimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_impresora INT,
    id_servicio INT,
    fecha DATE,
    observaciones TEXT,
    FOREIGN KEY (id_impresora) REFERENCES impresoras(id_impresora),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
);

CREATE TABLE contadores_impresiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_impresora INT,
    contador INT,
    fecha datetime default current_timestamp,
    FOREIGN KEY (id_impresora) REFERENCES impresoras(id_impresora)
);

-- tabla de usuarios
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(40) not null,
    apellido varchar(40) not null,
    mail varchar(50) not null unique,
    pass varchar(255) not null,
    fecha_creacion datetime default current_timestamp,
    telefono varchar(30),
    id_printer INT,
    FOREIGN KEY (id_printer) REFERENCES impresoras(id_impresora)
);

select * from usuario;
delete  from usuario where id_usuario = 6

