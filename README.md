# **PROYECTO "LEJOGRAM":**

## **1. AUTORÍA:**

- Leticia Pérez Sanz.
- Jose Luis Modroño Berdiñas.

#

## **2. INTRODUCCIÓN:**

_**LeJoGram**_ es nuestro proyecto final del Bootcamp de programación web fullstack que hemos cursado en Hackaboss.

El objetivo del proyecto es desarrollar el backend y el frontend de una aplicación con funcionalidades similares a instagram.

En "[este vídeo](https://youtu.be/75-fqlN8gjg)" puedes ver una breve explicación del funcionamiento de _**LeJoGram**_ y los archivos y utilidades que hemos empleado.

### **2.1 REQUISITOS MÍNIMOS EXIGIDOS PARA EL PROYECTO:**

Partimos de un pdf en el que se nos indicaban los objetivos mínimos a alcanzar en el proyecto (puedes consultar este pdf en la carpeta _"documentation"_).
Estos objetivos a alcanzar son los siguientes:

- _Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas (hacer el backend y el frontend)._

  - **LOS USUARIOS ANÓNIMOS PODRÁN:**

    - Ver las últimas fotos publicadas por otros usuarios.
    - Ver el perfil de un usuario con su galería de fotos.
    - Buscar fotos (por su texto descriptivo).
    - Registrarse.
    - Loguearse.

  - **LOS USUARIOS REGISTRADOS PODRÁN:**

    - Hacer una publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma).
    - Añadir una descripción a sus publicaciones.
    - Dar y quitar un "like" a una foto.
    - De forma opcional:

      - Gestionar su perfil (hacer cambios en los datos de registro).
      - Comentar una foto (no se permiten comentarios a comentarios).

#

## **3. ESTRUCTURA DEL PROYECTO:**

En este repositorio podrás encontrar tres carpetas:

- Documentation
- Server
- Client

### **3.1 DOCUMENTATION:**

En esta carpeta podrás encontrar toda la documentación complementaria del proyecto. A continuación os facilitamos una lista de esta documentación, así como lo programas con los que la hemos creado:

- PDF Con los requisitos exigidos para el proyecto.
- Modelo Conceptual MER (ERDPlus).
- Modelo Lógico MR (Workbench).
- Modelo Físico DDL (Workbench).
- Colección de Postman (Postman).
- Wideframe (Figma).

Toda esta documentación ha sido creada durante las fases iniciales del proyecto, tanto del backend como del frontend, por lo que su contenido ya no es un reflejo fiel del resultado final de nuestro proyecto. No obstante, su creación nos resultó muy útil para partir de una base sólida que nos permitiese llegar a buen puerto.

### **3.2 SERVER:**

Esta carpeta contiene todos los archivos respectivos al backend de _**LeJoGram**_.
La carpeta server es la mente de _**LeJoGram**_, es decir, todo lo necesario para crear y configurar la base de datos que permite operar con el frontend de nuestra aplicación.

Además de Workbench y Postman, hemos utilizado Visual Studio Code y Node.js.

_La carpeta server cuenta con su propio archivo README.md en el que podrás encontrar información más detallada sobre el backend._

### **3.3 CLIENT:**

La carpeta client contiene todos los archivos del frontend de _**LeJoGram**_. Podríamos considerarlo el corazón de LeJoGram al tratarse de la parte más visual del proyecto en relacción estrecha con el backend.

Para trasladar el wideframe creado con Figma a la realidad, hemos utilizado Visual Studio Code y React.js partiendo de VITE.

_La carpeta server cuenta con su propio archivo README.md en el que podrás encontrar información más detallada sobre el backend._

#

## **4. INSTALACIÓN Y CONFIGURACIÓN:**

Para poder ejecutar _**LeJoGram**_ es preciso descargar las carpetas _"server"_ y _"client"_ de nuestro repositorio y seguir los siguientes pasos:

### **4.1 CONFIGURACIÓN DEL SERVER (BACKEND):**

1. Utilizando workbench, abre el archivo _"DDL-lejogram.sql"_ (lo encontrarás en la carpeta _"documentation/Modelo-Fisico-DDL"_). Una vez abierto, ejecuta las tres primeras líneas (de esta forma crearás una nueva DB con el nombre _"lejogram"_):

```
DROP DATABASE IF EXISTS lejogram;
CREATE DATABASE IF NOT EXISTS lejogram DEFAULT CHARACTER SET utf8;
USE lejogram;
```

2. Abre la carpeta _"server"_ con Visual Studio Code u similar.
3. Clona el archivo _".env.example"_, renombrarlo como _".env"_. y cubrir con nuestros datos el valor de las variables de entorno que contiene. A continuación mostramos un ejemplo:

```
PORT=4000
MYSQL_HOST=127.0.0.1
MYSQL_USER=nombreDeTuUsuarioDeMySQL
MYSQL_PASSWORD=passwordDeTuUsuarioDeMySQL
MYSQL_DB=lejogram
JWT_SECRET=asdfg1asdfg2asdfg3asdfg4
UPLOADS_DIR=uploads
```

4. Abre un terminal posicionado en la carpeta _"server"_ e introduce el siguiente comando para instalar todas las dependencias (se creará la carpeta _"node_modules"_ ):

```
npm i
```

5. En el mismo terminal introduce este comando para resetear la base de datos. Este comando tiene una doble función: elimina las tablas de la base de datos y las crea de nuevo.

```
node ./DB/initDB.js
```

6. Ahora tu DB (base de datos) y contiene las cinco tablas necesarias para que _**LeJoGram**_ funcione correctamente (users, entries, photos, likes y comments). Ahora ya puedes poner en escucha el servidor introduciendo el siguiente comando en el terminal:

```
npm start
```

7. Aunque desde la propia aplicación (ejecutando el FRONTEND) hemos programado la funcionalidad de cada elemento para que realice las peticiones oportunas, puedes probar todas las posibles peticiones que admite nuestro servidor utilizando la colección de Postman que incluímos en la carpet _"documentation/Postman"_. Ahí encontrarás el archivo "LeJoGram.postman.collection.json" que podrás abrir utilizando la aplicación "Postman".
   - Es necesario que, en cada caso, se varíen ciertos datos de cada petición, según lo que se desee peticionar.
   - El nombre de cada petición hace referencia al componente de React en el que se utiliza + el controlador de backend que emplea.
   - En Postman, los token se almacenan automáticamente en variables jsonData. Al hacer login con un usuario deberás entrar a la pestaña "Test" e introducir el nombre de dicho usuario para que su token se guarde en una variable con su nombre. Luego podrás acceder a todas las variables con token guardadas usando la pestaña "Enviroment quick look". Además deberás comprobar en otras peticiones que el token que utilizas es el correcto para el usuario que hace dicha petición.

```
// Ejemplo de cómo guardamos en una variable el token del usuario Jose:
var jsonData = pm.response.json();
pm.globals.set("TOKEN_JOSE_LEJOGRAM", jsonData.data.token);
```

### **4.2 CONFIGURACIÓN DEL CLIENT (FRONTEND):**

Ahora que ya tenemos creada la DB (y sus tablas) y el servidor está configurado y en escucha de peticiones, es el momento de configurar y arrancar el frontend de _**LeJoGram**_.

1. Abre la carpeta _"client"_ con Visual Studio Code u similar.
2. Abre un terminal posicionado en la carpeta _"client"_ e introduce el siguiente comando para instalar todas las dependencias (se creará la carpeta _"node_modules"_ ):

```
npm i
```

3. En el mismo terminal ejectuamos el cliente introduciendo el siguiente comando en el terminal:

```
npm run dev
```

El terminal mostrará una url que pdrás pinchar para visualizar _**LeJoGram**_ en tu navegador.

#

## **5. CÓMO USAR LEJOGRAM:**

Ya estás listo para probar _**LeJoGram**_. Te recomendamos crear dos usuarios distintos para poder crear publicaciones con cada uno ha probar todas las funcionalidades de nuestra aplicación haciendo que interactúen entre ellos.

En "[este vídeo](https://youtu.be/75-fqlN8gjg)" puedes ver una breve explicación del funcionamiento de _**LeJoGram**_ y los archivos y utilidades que hemos empleado.

#

## **6. CONTACTO:**

### Jose Luis Modroño Berdiñas: "[Link al perfil de LinkedIn de Jose Luis](https://www.linkedin.com/in/joseluismodro%C3%B1oberdi%C3%B1as/)"

### Leticia Pérez Sanz: "[Link al perfil de LinkedIn de Leticia](https://www.linkedin.com/in/leticia-perez-sanz-89d/)"

#

# &copy;2023
