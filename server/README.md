# **TÍTULO DEL PROYECTO:**

- App de fotos (clon de Instagram).

## **DESCRIPCIÓN DEL PROYECTO**

- Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas.

## **AUTORES:**

- Leticia Pérez Sanz & Jose Luis Modroño Berdiñas.

########################################################################################################

## **INSTALAR:**

- Crear una base de datos (DB) vacía en una instancia de MySQL local. | En la carpeta "documentation/Modelo-Fisico-DDL", abrir el archivo DDL.sql y ejecutar las siguientes líneas para crear y usar la DB "lejogram":

```
  DROP DATABASE IF EXISTS lejogram;
  CREATE DATABASE IF NOT EXISTS lejogram DEFAULT CHARACTER SET utf8;
  USE lejogram;
```

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar `node ./DB/initDB.js` para crear las tablas necesarias en la DB "lejogram" anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para poner en escucha el servidor.

- En POSTMAN: ir haciendo las peticiones que sean necesarias según el caso.

  - En las carpetas "documentation/Postman" podrás encontrar la librería de Postman para este proyecto, con las diversas request de los diversos controladores ya creadas

  - Es necesario que, en cada caso, se varíen ciertos datos de cada petición, según lo que se desee peticionar.

########################################################################################################

## **ENTIDADES:**

En la carpeta "documentation" podrás encontrar el modelo conceptual MER (creado con ERDPLUS), el modelo lógico MR y el modelo físico DDL (ambos creados con workbench). Respecto al DDL, la información que contendrán las tablas de la database (a la que hemos llamado "lejogram") es la siguiente:

### users:

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - name VARCHAR(100) NOT NULL,
    - email VARCHAR(100) UNIQUE NOT NULL,
    - password VARCHAR(512) NOT NULL,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    - avatar TINYINT UNSIGNED

### entries:

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - place VARCHAR(100),
    - description TEXT NOT NULL,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id)

### photos:

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - photo_name VARCHAR(100) NOT NULL,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

### likes:

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

### comments:

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - comment VARCHAR (250),
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

########################################################################################################

## **ENDPOINTS:**

### users:

```
1. POST - [/users] - Registro | Crear un usuario. ✅

2. POST - [/users/login] - Login | Hará el login de un usuario y devolverá el TOKEN. ✅

3. GET [/users/:id] - Ver el perfil de un usuario con su galería de fotos. ✅

4. EXTRA PARA REACT - GET [/users/:id] - Ver el perfil de un usuario con su galería de fotos [Además muestra el email del usuario] | [Token-obligatorio]. ✅

5. EXTRA PARA REACT - DELETE [/users] Borrar un usuario | [Token-obligatorio]. | [OPCIONAL]. ✅

6a. PUT [/users/username] - Gestión del perfil (cambiar el nombre de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL]. ✅

6b. PUT [/users/email] - Gestión del perfil (cambiar el email de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL]. ✅

6c. PUT [/users/avatar] - Gestión del perfil (cambiar el avatar de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL]. ✅
```

### entries:

```
1. POST [/entries] - Hacer una publicación con un máximo de 3 fotos y obligatorio que al menos haya una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle una descripción. | [Token-obligatorio]. ✅

2. GET [/entries] - Ver las últimas entradas publicadas por otros usuarios de la más reciente a la más antigua (además obtiene las fotos, comentarios y likes de cada entrada). ✅

3. GET [/entries/:id] - Buscar entradas por id. Solo funcional para usuarios registrados | [Token-obligatorio]. ✅

4. EXTRA PARA REACT - DELETE [/entries/:id] - Borrar una entrada de un usuario. | [Token-obligatorio]. | [OPCIONAL]. ✅

5. POST - [/entries/:id/likes] - Hacer un "like" a una entrada | [Token-obligatorio]. ✅

6. DELETE - [/entries/:id/likes] - Eliminar un "like" de una entrada | [Token-obligatorio]. ✅

7. POST [/entries/:id/comment] - Comentar una entrada (no se permiten comentarios a comentarios) | [Token-obligatorio] | [OPCIONAL]. ✅

8. EXTRA PARA REACT - GET [/comments] - NOTA: En el Front, finalmente, no usamos este endpoint porque con "listeEntriesController" ya traemos toda la info de los comentarios, fotos y likes de cada entrada. ✅
```

########################################################################################################

> ## **LETICIA PÉREZ SANZ & JOSE LUIS MODROÑO BERDIÑAS | 2023**
