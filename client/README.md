# **PROYECTO LEJOGRAM - FRONTEND (carpeta _"client"_):**

## **1. AUTORES:**

- Leticia Pérez Sanz.
- Jose Luis Modroño Berdiñas.

#

## **2. PLANTEAMIENTO DEL FRONTEND:**

El proyecto _**LeJoGram**_ consta de tres carpetas principales:

- Carpeta _"documentation"_: contiene toda la documentación complementaria.
- Carpeta _"Client"_: contiene todos los archivos del frontend.
- Carpeta _"Server"_: contiene todos los archivos del backend.

Teniendo en cuenta los requisitos mínimos, y partiendo del backend que desarrollamos como proyecto anterior, planteamos el proyecto de la siguiente manera:

### **2.1. DISEÑO DE UN WIDEFRAME:**

- Utilizando la aplicación "FIGMA" diseñamos un wideframe provisional de nuestra aplicación (se puede consultar dentro de la carpeta _"server / documentation / wideframe"_).

- Elegimos un nombre para nuestra aplicación, que fuese definitorio de la misma. Optamos por _**LeJoGram**_ como una fusión de Leticia + Jose + Instagram.

- Diseñamos un logotipo que evoque la esencia de nuestra app, es decir, la fotografía.

- Creamos el favicon en base al logotipo.

### **2.2. CREACIÓN DEL PROYECTO DE REACT:**

Pese a que en nuestra formación trabajamos con "npx create-react-app" en este caso quisimos utilizar VITE para enfrentarnos a una forma distinta de trabajar con React. Por tanto los documentos que antes eran .js ahora son .jsx.

### **2.3. ESTRUCTURA INTERNA DEL FRONTEND (carpeta _"client"_):**

En la raíz de la carpeta _"client"_ contamos con diversos archivos. Los más destacables son:

- **README.md:** este es el readme correspondiente al FRONTEND.
- **index.html** es el html base del proyecto.

#### **2.3.1 CARPETA _"public"_:**

La carpeta _"public"_ contiene todos los archivos que tienen que ver con imágenes:

- Flechas de dirección (izda y dcha), diseñadas por nosotros, que usaremos como botones para los slider de fotografías.
- Favicon, diseñado por nosotros.
- Logotipo LeJoGram, diseñado por nosotros.
- Carpeta _"avatars"_, que contiene 16 fotos de perfil (el usuario podrá elegir uno de estos 16 avatares).
- Icono de corazón para los likes.

#### **2.3.2 CARPETA _"src"_:**

En la raíz de la carpeta _"src"_ tenemos los siguientes archivos y carpetas:

- **TokenContext.jsx:** (EXTRA) Componente en el que creamos un contexto para evitar mandar como props el token del usuario a los diversos componentes en los que se usa. | ACTUALIZACIÓN: Decidimos enviar también a través del contexto los datos del usuario logueado para mayor comodidad en el código del componente OwnProfile.
- **main.jsx + index.css:** En el componente main establecemos App.jsx como componente principal. En este caso va rodeado de "BrowserRouter" y "TokenProvider" para poder establecer en él las "Routes" y para que el token esté disponible en todos los componentes que deriven de App.jsx.
- **App.jsx + App.css:** App.jsx contiene la función App, que será el componente principal de nuestra aplicación. Este componente retorna lo siguiente:
  - Una llamada al componente "Header".
  - Establece "Routes" que contendrá diversas "Route" a diversos componentes.
  - Una llamada al componente "Footer".
- **Carpeta _"Data"_:** (EXTRA) Esta carpeta contiene un único archivo llamado "AvatarList.json" en el que tenemos un array de objetos con los id de cada una de las 16 fotografías de avatar (las cuales están en la carpeta "avatars" de dentro de la carpeta "public").
- **Carpeta _"components"_:** Esta carpeta contiene, a su vez, 11 carpetas. Cada una de estas carpetas contiene el .jsx y el .css de cada componente que deriva del componente App.jsx.

  - **Header:** El header siempre muestra el logo y nombre de nuestra app y diversos botones que cambian en función de si el usuario está o no logueado.
    - Si el usuario NO está logueado:
      - Botón de inicio.
      - Botón de Registro.
      - Botón de Login.
    - Si el usuario está logueado:
      - Botón que dirige al perfil del usuario logueado (componente "OwnProfile").
      - Botón Inicio.
      - Botón Publicar (componente "CreateEntry").
      - Botón Logout (que borra el token del localhost).
  - **Register:** Componente en el que se solicitan diversos datos del nuevo usuario (nombre, email, contraseña, avatar (EXTRA)) y se envían al backend.
  - **Login:** Componente en el que se solicitan el email y la contraseña para cotejarlos con el backend y permitir el inicio de sesión al usuario ya creado.
  - **CreateEntry:** Componente en el que se solicitan, al usuario logueado, los datos necesarios para crear una entrada en el backend.
    - Entre una y tres fotografías.
    - Localización (obligatorio).
    - Descripción (obligatorio).
  - **EntrySearch:** Este componente es el que utilizaremos como página de inicio.
    - Muestra un formulario para poder buscar entradas en base a una keyword.
    - Hace una petición al backend para obtener los datos de todas la entradas y envía los datos de cada entrada al componente "Entry".
  - **Entry:** Este componente se encarga de pintar cada una de las entradas, que contarán de las siguientes partes:
    - Un header con el avatar y nombre de usuario (que redirigen al componente "Profile") + la fecha de creación de la entrada.
    - Un main en el que se pintan la ubicación, se llama al componente "Slider", se pinta la descripción de la entrada y se muestran los comentarios + un input para comentar en caso de estar loguedo.
    - Un footer con un botón para dar o quitar like, un contador de likes y, en caso de ser el creador de la entrada, un botón para eliminarla (EXTRA).
  - **Slider:** (EXTRA) En este caso hemos optado por crear desde cero un slider para las fotografías. De esta forma, además de ser más visual, ahorramos espacio al no tener que mostrar todas las fotografías a la vez. Como curiosidad, quisimos probar a trabajar con el css de este componente de forma modular.
  - **Comments:** Este componente muestra los comentarios de cada entrada + un formulario para crear un nuevo comentario. Como curiosidad, los comentarios solo se mostrarán en caso de que haya comentarios y el formulario solo aparecerá en caso de que un usuario esté logueado.
  - **Profile:** Componente en el que se muestran los datos del usuario que ha creado una entrada (accedemos a este componente desde el avatar o nombre de usuario de cada Entry). Profile muestra los siguientes datos:
    - Avatar, nombre, fecha de creación del usuario, Galería de fotos del usuario.
  - **OwnProfile:** (EXTRA) Componente muy similar a "Profile" pero con algunas diferencias. Este es el perfil del usuario que está logueado. Además de lo mostrado en "Profile" se muestra el email del usuario, botones para modificar los datos de usuario y otro para borrar el usuario. | ACTUALIZACIÓN: dado que en el componente Profile.jsx ya se muestran las fotos, hemos decidido no mostrarlas en OwnProfile.jsx. | ACTUALIZACIÓN: Hemos decidio hacer window.location.reload(); tras cada modificación de datos de usuario para que el OwnProfile se pinte correctamente con los nuevos datos.
  - **Footer:** Compoente en el que se muestra el copyright de la aplicacón.

### **2.4 MODIFICACIONES DEL BACKEND:**

Para poder llevar a cabo el proyecto e implementar todo lo necesario y los EXTRAS, hemos tenido que modificar algunos controladores y querys del backend, así como crear otros nuevos.

Puedes consultar la lista final de controladores y querys en el archivo "README.md" de la carpeta _"server"_:

#

## **3. INSTALACIÓN Y CONFIGURACIÓN:**

Para ver cómo configurar tanto el FRONTEND como el BACKEND de _**LeJoGram**_ consulta el archivo README.md que encontrarás en la raíz del respositorio (a la altura de las carpetas _"documentation"_, _"server"_ y _"client"_).

#

## **4. CONTACTO:**

### Jose Luis Modroño Berdiñas: "[Link al perfil de LinkedIn de Jose Luis](https://www.linkedin.com/in/joseluismodro%C3%B1oberdi%C3%B1as/)"

### Leticia Pérez Sanz: "[Link al perfil de LinkedIn de Leticia](https://www.linkedin.com/in/leticia-perez-sanz-89d/)"

#

# &copy;2023
