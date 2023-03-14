# **PROYECTO LEJOGRAM - BACKEND (carpeta _"server"_):**

## **1. AUTORÍA / CONTACTO:**

- Jose Luis Modroño Berdiñas: "[Link al perfil de LinkedIn de Jose Luis](https://www.linkedin.com/in/joseluismodro%C3%B1oberdi%C3%B1as/)"

- Leticia Pérez Sanz: "[Link al perfil de LinkedIn de Leticia](https://www.linkedin.com/in/leticia-perez-sanz-89d/)"

#

## **2. PLANTEAMIENTO DEL FRONTEND:**

El proyecto _**LeJoGram**_ consta de tres carpetas principales:

- Carpeta _"documentation"_: contiene toda la documentación complementaria.
- Carpeta _"Client"_: contiene todos los archivos del frontend.
- Carpeta _"Server"_: contiene todos los archivos del backend.

Teniendo en cuenta los requisitos mínimos, y dejando pendiente el desarrollo del frontend para más adelante, partimos del desarrollo del backend.

### **2.1 CREACIÓN DE LOS MODELOS CONCEPTUAL (MER) Y LÓGICO (MR):**

En la carpeta _"documentation"_ podrás encontrar el modelo conceptual MER (creado con ERDPLUS), el modelo lógico MR (creado con Workbench). Decidimos crear ambos modelos ya que nos pareció un buen punto de partida para estructurar el diseño del backend de _**LeJoGram**_.

### **2.2 CREACIÓN DEL MODELO FÍSICO (DDL) - ENTIDADES:**

Seguidamente creamos el modelo físico DDL (también con workbench). Las tres primeras líneas de este documento sirven para borrar, crear y utilizar una DB(base de datos) que decidimos llamar "lejogram". Además contiene el código necesario para crear las diferentes tablas de nuestra DB y su contenido.

Las tablas de la DB "lejogram" (y sus campos) son los siguientes:

#### **2.2.1 TABLA "users":**

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - name VARCHAR(100) NOT NULL,
    - email VARCHAR(100) UNIQUE NOT NULL,
    - password VARCHAR(512) NOT NULL,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    - avatar TINYINT UNSIGNED

#### **2.2.2 TABLA "entries":**

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - place VARCHAR(100),
    - description TEXT NOT NULL,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id)

#### **2.2.3 TABLA "photos":**

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - photo_name VARCHAR(100) NOT NULL,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

#### **2.2.4 TABLA "likes":**

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

#### **2.2.5 TABLA "comments":**

    - id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    - created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    - comment VARCHAR (250),
    - user_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (user_id) REFERENCES users(id),
    - entry_id INT UNSIGNED NOT NULL,
    - FOREIGN KEY (entry_id) REFERENCES entries(id)

### **2.3. ESTRUCTURA INTERNA DEL BACKEND (carpeta _"server"_):**

En la raíz de la carpeta _"server"_ contamos con diversos archivos. Los más destacables son:

- **README.md:** este es el readme correspondiente al BACKEND.
- **.env.example:** archivo modelo con las variables de entorno a cubrir por quien ejecute el backend.
- **server.js:** Es el documento principal de nuestro backend.
- **helpers.js:** Documento que contiene las funciones generateError, savePhoto y deletePhoto.
- **.eslintrc.json:** configuración de ESLINT.
- **.prettierrc.json:** configuración de PRETTIER.

#### **2.3.1 CARPETA _"MIDDLEWARES"_:**

La carpeta _"MIDDLEWARES"_ contiene los siguietes tres middlewares:

- **entryExists.js:** Middleware que comprueba si una entrada existe en la DB.
- **isAuth.js:** Middleware que comrprueba su un usuario tiene TOKEN.
- **isAuthOptional.js:** Middleware que comprueba si eres el dueño de una entrada.

#### **2.3.2 CARPETA _"CONTROLLERS"_:**

La carpeta _"CONTROLLERS"_ contiene, a su vez, dos carpetas; _"users"_ y _"entries"_. Cada una de ellas contiene todos los controladores que se usan tanto para users como para entries. Además cada una de las carpetas contiene un "index.js" que utilizamos para exportar y, posteriormente, importar de forma más eficiente los diversos controladores en el archivo principal "server.js".

La lista de controladores es la siguiente:

- **_"CONTROLLERS/users"_:**

  - **changeUserAvatarController.js:**
  - **changeUserEmailController.js:**
  - **changeUserNameController.js:**
  - **createUserController.js:**
  - **deleteUserController.js:**
  - **getOwnUserController.js:**
  - **getUserController.js:**
  - **loginUserController.js:**

- **_"CONTROLLERS/entries"_:**
  - **createCommentController.js:**
  - **deleteEntryController.js:**
  - **deleteLikeController.js:**
  - **doLikeController.js:**
  - **getEntryByIdController.js:**
  - **listCommentsController.js:**
  - **listEntriesController.js:**
  - **newEntryController.js:**

#### **2.3.3 CARPETA _"DB"_:**

La carpeta _"DB"_ contiene dos archivos:

- **getDbConnection.js:** este archivo obtiene la conexión con la DB.
- **initDB.js:** este archivo, utilia la conexión anterior para borrar las tablas de la DB y crearlas de nuevo (para crear la DB seguiremos los pasos especificados en el README.md de la raiz de LeJoGram).

Además, la carpeta _"DB"_ contiene la carpeta _"queries"_, que a su vez contiene las carpetas _"entries"_ y _"users"_ en la que se encuentras las queries que utilizan los controladores tanto de users como de entries.

La lista de queries es la siguiente:

- **_"DB/queries/users"_:**

  - **changeUserAvatarInDbQuery.js:**
  - **changeUserEmailInDbQuery.js:**
  - **changeUserNameInDbQuery.js:**
  - **createUserInDbQuery.js:**
  - **deleteUserQuery.js:**
  - **selectUserByEmailInDbQuery.js:**
  - **selectUserByIdQuery.js:**

- **_"DB/queries/entries"_:**
  - **createCommentInDbQuery.js:**
  - **createLikeInDbQuery.js:**
  - **createNewEntryAndPhotosInDbQuery.js:**
  - **deleteEntryQuery.js:**
  - **deleteLikeInDbQuery.js:**
  - **getEntrieAndPhotosFromDbQuery.js:**
  - **selectAllCommentsQuery.js:**
  - **selectAllEntriesQuery.js:**

#### **2.3.4 CARPETA _"UPLOADS"_:**

La carpeta _"UPLOADS"_ se generará automáticamente gracias a las funciones de "helpers.js" en el momento en el que el primer usuario suba alguna fotografía. Esta carpeta contendrá las fotografías que los usuarios suban con sus entradas.

Cada fotografía estará relaccionada con su referencia en la tabla "photos" de la DB.

Cuando una entrada o un usuario sean eliminados de la DB se borrarán las correspondientes fotografías de la carpeta _"UPLOADS"_ automáticamente.

### **2.4 INFORMACIÓN SOBRE LOS ENDPOINTS DE USUARIOS Y ENTRADAS (Y SUS CONTROLADORES Y QUERIES)**

A la hora de desarrollar el FRONTEND, para poder llevar a cabo el proyecto e implementar todo lo necesario/obligatorio y los EXTRAS, hemos tenido que modificar algunos controladores y querys del backend, así como crear otros nuevos.

La lista final de controladores y querys es la siguiente:

- NOTA: Componente de React en el que se usa (OBLIGATORIEDAD | requisitos de TOKEN | funciónalidad) - (ruta) - Middlewares, controladores y queries.

#### **2.4.1 ENDPOINTS PARA USERS:**

```
//--------------------------------------------------------------------------
1. Register (OBLIGATORIO | Registro de Usuario) - (POST a /users) - createUserController + createUserInDbQuery
//--------------------------------------------------------------------------
2. Login (OBLIGATORIO | devuelve TOKEN del usuario | Login de Usuario) (POST a /users/login) - loginUserController + selectUserByEmailInDbQuery
//--------------------------------------------------------------------------
3. Profile (OBLIGATORIO | TOKEN opcional | ver el perfil de un usuario con su galería de fotos) - (GET a /users/:id) - isAuthOptional + getUserController + selectUserByIdQuery
//--------------------------------------------------------------------------
4. OwnProfile (EXTRA | Exije TOKEN | Ver el perfil de un usuario logueado y su email) - (GET a /users) - isAuthOptional + getOwnUserController + selectUserByIdQuery
//--------------------------------------------------------------------------
5. OwnProfile (EXTRA | Exije TOKEN | Borrar usuario) - (DELETE a /users) - isAuth + deleteUserController + deleteUserQuery
//--------------------------------------------------------------------------
6a. OwnProfile (OPCIONAL | Exije TOKEN | Modificar nombre de usuario) (PUT /users/username) - isAuth + changeUserNameController + changeUserNameInDbQuery
//--------------------------------------------------------------------------
6b. OwnProfile (OPCIONAL | Exije TOKEN | Modificar email de usuario) - (PUT /users/email) - isAuth + changeUserEmailController + changeUserEmailInDbQuery
//--------------------------------------------------------------------------
6c. OwnProfile (OPCIONAL | Exije TOKEN | Modificar avatar de usuario) - (PUT /users/avatar) - isAuth + changeUserAvatarController + changeUserAvatarInDbQuery
//--------------------------------------------------------------------------
```

#### **2.4.2 ENDPOINTS PARA ENTRIES:**

```
//--------------------------------------------------------------------------
1. CreateEntry (OBLIGATORIO | Exige TOKEN | Hacer una publicación con un máximo de 3 fotos y obligatorio que al menos haya una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle una descripción.) - (POST /entries) - isAuth + newEntryController + createNewEntryAndPhotosInDbQuery
//--------------------------------------------------------------------------
2. EntrySearch (OBLIGATORIO | TOKEN opcional | Obtener las últimas entradas publicadas por otros usuarios de la más reciente a la más antigua, además obtiene las fotos, comentarios y likes de cada entrada) - (GET /entries) - isAuthOptional + listEntriesController + selectAllEntriesQuery
//--------------------------------------------------------------------------
3. Entry (OBLIGATORIO | TOKEN opcional | Obtener entradas por su id) - (GET /entries/:id) - isAuthOptional + entryExists + getEntryByIdController + getEntrieAndPhotosFromDbQuery
//--------------------------------------------------------------------------
4. Entry (EXTRA | Exige TOKEN | Borrar Entradas) - (DELETE /entries/:id) - isAuth + entryExists + deleteEntryController + deleteEntryQuery
//--------------------------------------------------------------------------
5. Entry (OBLIGATORIO| Exige TOKEN | Dar like a una Entrada) - (POST /entries/:id/likes) - isAuth + entryExists + doLikeController + createLikeInDbQuery
//--------------------------------------------------------------------------
6. Entry (OBLIGATORIO| Exige TOKEN | Quitar like a una Entrada) (DELETE /entries/:id/likes) - isAuth + entryExists + deleteLikeController + deleteLikeInDbQuery
//--------------------------------------------------------------------------
7. Comments (OPCIONAL | Exige TOKEN | Comeantar una entrada. No se permiten comentarios a comentarios) - (POST /entries/:id/comment) - isAuth + entryExists + createCommentController + deleteLikeInDbQuery
//--------------------------------------------------------------------------
8. (EN DESUSO | NOTA: finalmente, no usamos este endpoint porque con "listeEntriesController" ya traemos toda la info de los comentarios, fotos y likes de cada entrada) - (GET /comments) - isAuthOptional + listCommentsController + selectAllCommentsQuery
//--------------------------------------------------------------------------
```

#

## **3. INSTALACIÓN Y CONFIGURACIÓN:**

Para ver cómo configurar tanto el FRONTEND como el BACKEND de _**LeJoGram**_ consulta el archivo README.md que encontrarás en la raíz del respositorio (a la altura de las carpetas _"documentation"_, _"server"_ y _"client"_).

#

# &copy;2023
