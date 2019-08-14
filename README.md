# api-rest-node

- Hacer npm i en la carpeta del proyecto
- Ejecutar el sql para crear la nueva DB con sus tablas
- Configurar usuario, clave y host para la DB en file config.js
- Ejecutar nodemon en la carpeta del proyecto  
- El proyecto se ejecuta en localhost:3000

Rutas: 
  - Get /usuarios (Para traer todos los usuarios)
  - Get /usuarios/:id (Para traer un usuario por su id)
  - Post /usuarios/add (Para insertar un usuario)
    - Se le envia un json {"nombre": xxx, "apellido": xxx, "rut": xxx, "profesion": xxx}
  - Post /usuarios/edit (Para editar un usuario)
    - - Se le envia un json {"id": 1 ,"nombre": xxx, "apellido": xxx, "rut": xxx, "profesion": xxx}
  
CREATE DATABASE test;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `rut` varchar(9) DEFAULT NULL,
  `profesion` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
