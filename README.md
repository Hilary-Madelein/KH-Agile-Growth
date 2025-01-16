# Sistema para Determinar el Modelo de Madurez de un Software

### Título del Proyecto
**Desarrollo de un Sistema para la Evaluación y Mejora del Modelo de Madurez de Software**

### Repositorio del Frontend
El proyecto del frontend se encuentra disponible en el siguiente repositorio:
[https://github.com/KBGR55/kh-agile-growth-frontend.git](https://github.com/KBGR55/kh-agile-growth-frontend.git)

---

## Instrucciones de Instalación y Ejecución del Backend

### Clonar el Repositorio

1. Abre una terminal y clona el repositorio:

   ```bash
   git clone https://github.com/Hilary-Madelein/KH-Agile-Growth.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd KH-Agile-Growth
   ```

### Instalación de Dependencias

1. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

### Configurar y Levantar el Servidor

1. Inicia el servidor del backend:

   ```bash
   npm start
   ```

2. Accede al backend a través de [http://localhost:3006](http://localhost:3006).

---

## Configuración de la Base de Datos

Antes de ejecutar el backend, asegúrese de configurar la base de datos. A continuación, se detallan los pasos:

### Crear y Configurar la Base de Datos

1. Ingresa a MySQL utilizando un usuario con privilegios de administrador:

   ```bash
   mysql -u root -p
   ```

2. Crea la base de datos y un usuario con todos los privilegios:

   ```sql
   CREATE DATABASE db_khagile;
   CREATE USER 'desarrollo'@'localhost' IDENTIFIED BY 'desarrollo';
   GRANT ALL PRIVILEGES ON db_khagile.* TO 'desarrollo'@'localhost';
   FLUSH PRIVILEGES;
   exit;
   ```

3. Ingresa nuevamente a MySQL con el usuario creado:

   ```bash
   mysql -h 127.0.0.1 -u desarrollo -p
   ```

4. Selecciona la base de datos:

   ```sql
   USE db_khagile;
   ```

5. Ejecuta el siguiente script para crear las tablas y datos iniciales:

   ```sql
   USE db_khagile;

   START TRANSACTION;

   -- Tabla rol
   INSERT INTO rol (id, external_id, estado, nombre, createdAt, updatedAt) 
   VALUES
       (1, '1376cf7e-907c-11ef-8f4d-30e37a2aa82d', 1, 'ADMINISTRADOR SYS', '2024-10-19 05:30:36', '2024-10-19 05:30:36'),
       (2, '2df3ca7a-8e05-11ef-80ac-b48c9d91f915', 1, 'EQUIPO DE DESARROLLO', '2024-10-19 05:30:36', '2024-10-19 05:30:36');

   -- Tabla entidad
   INSERT INTO entidad (id, external_id, estado, foto, nombres, apellidos, fecha_nacimiento, telefono, createdAt, updatedAt) 
   VALUES 
       (1, '93a9e3f1-907c-11ef-8f4d-30e37a2aa82d', 1, '3efe8462-5255-4839-b694-c269ca4475b3.jpeg', 'KAREN BRIGITH', 'GONZAGA RIVAS', '2003-12-05 00:00:00', '0980735351', '2024-10-22 08:50:19', '2024-10-22 08:50:19'),
       (2, '93a9e97e-907c-11ef-8f4d-30e37a2aa82d', 1, '2307fd96-9917-4da1-a666-90d0711162c3.jpeg', 'HILARY MADELEY', 'CALVA CAMACHO', '1995-08-15 00:00:00', '0980735352', '2024-10-22 08:50:19', '2024-10-22 08:50:19'),
       (3, '93a9eb2d-907c-11ef-8f4d-30e37a2aa82d', 1, 'USUARIO_ICONO.png', 'MARÍA ELENA', 'PÉREZ MARTÍNEZ', '1998-03-22 00:00:00', '0980735353', '2024-10-22 08:50:19', '2024-10-22 08:50:19'),
       (4, '25b65566-907d-11ef-8f4d-30e37a2aa82d', 1, 'USUARIO_ICONO.png', 'PEDRO ANTONIO', 'RAMÍREZ VARGAS', '1987-07-30 00:00:00', '0980735354', '2024-10-22 08:50:19', '2024-10-22 08:50:19'),
       (5, '93a9ed2c-907c-11ef-8f4d-30e37a2aa82d', 1, 'USUARIO_ICONO.png', 'ANA MARÍA', 'TORRES QUINTERO', '2000-11-10 00:00:00', '0980735355', '2024-10-22 08:50:19', '2024-10-22 08:50:19'),
       (6, '93a9ee14-907c-11ef-8f4d-30e37a2aa82d', 1, 'USUARIO_ICONO.png', 'SOFÍA ALEJANDRA', 'MENDOZA PÉREZ', '2003-12-05 00:00:00', '0980735356', '2024-10-22 08:50:19', '2024-10-22 08:50:19');

   -- Tabla cuenta
   INSERT INTO cuenta (id, external_id, estado, correo, clave, createdAt, updatedAt, id_entidad) 
   VALUES 
       (1, '594760f1-907e-11ef-8f4d-30e37a2aa82d', 1, 'karen.b.gonzaga@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 1),
       (2, '59476a5b-907e-11ef-8f4d-30e37a2aa82d', 1, 'hilary.calva@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 2),
       (3, '59476cb2-907e-11ef-8f4d-30e37a2aa82d', 1, 'maria.perez@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 3),
       (4, '59476e19-907e-11ef-8f4d-30e37a2aa82d', 1, 'pedro.ramirez@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 4),
       (5, '59476f57-907e-11ef-8f4d-30e37a2aa82d', 1, 'ana.torres@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 5),
       (6, '594770e6-907e-11ef-8f4d-30e37a2aa82d', 1, 'sofia.mendoza@unl.edu.ec', '$2a$08$vcbwdzAoBjH027Yt6B9PwO3G65afLhrMfejne1EJ7uoPGuLslHLC6', '2024-10-22 09:03:00', '2024-10-22 09:03:00', 6);

   -- Tabla rol_entidad
   INSERT INTO rol_entidad (external_id, estado, createdAt, updatedAt, id_entidad, id_rol)
   VALUES 
       (UUID(), 1, NOW(), NOW(), 1, 1),
       (UUID(), 1, NOW(), NOW(), 2, 2);

   -- Tabla proyecto
   INSERT INTO proyecto (external_id, estado, nombre, fecha_inicio, descripcion, createdAt, updatedAt)
   VALUES
       (UUID(), 1, 'ADMINISTRADOR SYS', '2024-10-22 09:08:40', 'Encargado de gestionar el sistema', NOW(), NOW());

   -- Tabla rol_proyecto
   INSERT INTO rol_proyecto (external_id, estado, horasDiarias, createdAt, updatedAt, id_proyecto, id_rol_entidad)
   VALUES 
       (UUID(), 1, 8, NOW(), NOW(), 
           (SELECT id FROM proyecto WHERE nombre = 'ADMINISTRADOR SYS'),
           (SELECT id FROM rol_entidad WHERE id_entidad = 1 AND id_rol = 1));

   COMMIT;
   ```

---

## Desarrolladores

- **Karen Gonzaga** - [GitHub](https://github.com/KBGR55)
- **Hilary Calva** - [GitHub](https://github.com/Hilary-Madelein)

### Instructor

- **Ing. Cristian Narvaez** - [GitHub](https://github.com/codernarvaez)
