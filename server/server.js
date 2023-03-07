// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INIT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
`use strict`;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DEPENDENCIES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const morgan = require(`morgan`);
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MIDDLEWARES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Dependencias a usar:
app.use(cors());
app.use(express.static('uploads'));
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());

// MIDDLEWARE isAuth - para verificar que un usuario está logueado (Authorization Token):
const isAuth = require('./MIDDLEWARES/isAuth');

// MIDDLEWARE isAuthOptional - para verificar que un usuario es el creador de una entrada:
const isAuthOptional = require('./MIDDLEWARES/isAuthOptional');

// MIDDLEWARE entryExists - para verificar si una entrada (path param con id en la petición) existe en la DB:
const entryExists = require('./MIDDLEWARES/entryExists');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% CONTROLLERS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/**#######################
 * ## USERS CONTROLLERS ##
 * #######################
 */
const {
  createUserController,
  loginUserController,
  getUserController,
  getOwnUserController,
  deleteUserController,
  changeUserNameController,
  changeUserEmailController,
  changeUserAvatarController,
} = require('./CONTROLLERS/users/index');

/**#########################
 * ## ENTRIES CONTROLLERS ##
 * #########################
 */
const {
  newEntryController,
  listEntriesController,
  getEntryByIdController,
  doLikeController,
  deleteLikeController,
  createCommentController,
  listCommentsController,
  deleteEntryController,
} = require('./CONTROLLERS/entries/index');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ENDPOINTS (PETICIONES) %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/**#####################
 * ## USERS ENDPOINTS ##
 * #####################
 */
//--------------------------------------------------------------------------
// - 1. POST - [/users] - Registro | Crear un usuario.
app.post('/users', createUserController);
//      - createUserController requiere la FUNCIÓN QUERY createUserInDbQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - 2. POST - [/users/login] - Login | Hará el login de un usuario y devolverá el TOKEN.
app.post('/users/login', loginUserController);
//      - loginUserController requiere la FUNCIÓN QUERY selectUserByEmailInDbQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - 3. GET [/users/:id] - Ver el perfil de un usuario con su galería de fotos
app.get('/users/:id', isAuthOptional, getUserController);
//      - getUserController pasa por el middleware isAuthOptional.
//      - getUserController requiere, finalmente, la FUNCIÓN QUERY selectUserByIdQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - EXTRA PARA REACT - GET [/users/:id] - Ver el perfil de un usuario con su galería de fotos [Además muestra el email del usuario] | [Token-obligatorio]
app.get('/users', isAuth, getOwnUserController);
//      - getOwnUserController pasa por el middleware isAuthOptional.
//      - getOwnUserController requiere, finalmente, la FUNCIÓN QUERY selectUserByIdQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - EXTRA PARA REACT - DELETE [/users] Borrar un usuario | [Token-obligatorio]. | [OPCIONAL].
app.delete('/users', isAuth, deleteUserController);
//      - deleteUserController pasa por el middleware isAuth.
//      - deleteUserController requiere, finalmente, la FUNCIÓN QUERY deleteUserQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - 4a. PUT [/users/username] - Gestión del perfil (cambiar el nombre de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL].
app.put('/users/username', isAuth, changeUserNameController);
//      - changeUserNameController pasa por el middleware isAuth.
//      - changeUserNameController requiere, finalmente, la FUNCIÓN QUERY changeUserNameInDbQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - 4b. PUT [/users/email] - Gestión del perfil (cambiar el email de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL].
app.put('/users/email', isAuth, changeUserEmailController);
//      - changeUserEmailController pasa por el middleware isAuth.
//      - changeUserEmailController requiere, finalmente, la FUNCIÓN QUERY changeUserEmailInDbQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------
// - 4c. PUT [/users/avatar] - Gestión del perfil (cambiar el avatar de usuario) | Solo el propio usuario | [Token-obligatorio] | [OPCIONAL].
app.put('/users/avatar', isAuth, changeUserAvatarController);
//      - changeUserAvatarController pasa por el middleware isAuth.
//      - changeUserAvatarController requiere, finalmente, la FUNCIÓN QUERY changeUserAvatarInDbQuery.js de (DB/queries/users).
//--------------------------------------------------------------------------

/**#######################
 * ## ENTRIES ENDPOINTS ##
 * #######################
 */
//--------------------------------------------------------------------------
// - 1. POST [/entries] - Hacer una publicación con un máximo de 3 fotos y obligatorio que al menos haya una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle una descripción. | [Token-obligatorio].
app.post('/entries', isAuth, newEntryController);
//      - newEntryController pasa por el middleware isAuth.
//      - newEntryController requiere, finalmente, la FUNCIÓN QUERY createNewEntryAndPhotosInDbQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - 2. GET [/entries] - Ver las últimas entradas publicadas por otros usuarios de la más reciente a la más antigua (además obtiene las fotos, comentarios y likes de cada entrada).
app.get('/entries', isAuthOptional, listEntriesController);
//      - listEntriesController pasa por el middleware isAuthOptional.
//      - listEntriesController requiere la FUNCIÓN QUERY selectAllEntriesQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - 3. GET [/entries/:id] - Buscar entradas por id. Solo funcional para usuarios registrados | [Token-obligatorio].
app.get('/entries/:id', isAuthOptional, entryExists, getEntryByIdController);
//      - getEntryByIdController pasa por el middleware isAuthOptinal y luego por el middleware entryExists.
//      - getEntryByIdController requiere, finalmente, la FUNCIÓN QUERY getEntrieAndPhotosFromDbQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - EXTRA PARA REACT - DELETE [/entries/:id] - Borrar una entrada de un usuario. | [Token-obligatorio]. | [OPCIONAL].
app.delete('/entries/:id', isAuth, entryExists, deleteEntryController);
//      - deleteEntryController pasa por el middleware isAuth y luego por el middleware entryExists.
//      - deleteEntryController requiere, finalmente, la FUNCIÓN QUERY deleteEntryQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - 4. POST - [/entries/:id/likes] - Hacer un "like" a una entrada | [Token-obligatorio].
app.post('/entries/:id/likes', isAuth, entryExists, doLikeController);
//      - doLikeController pasa por el middleware isAuth y luego por el middleware entryExists.
//      - doLikeController requiere, finalmente, la FUNCIÓN QUERY createLikeInDbQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - 5. DELETE - [/entries/:id/likes] - Eliminar un "like" de una entrada | [Token-obligatorio].
app.delete('/entries/:id/likes', isAuth, entryExists, deleteLikeController);
//      - deleteLikeController pasa por el middleware isAuth y luego por el middleware entryExists.
//      - deleteLikeController requiere, finalmente, la FUNCIÓN QUERY deleteLikeInDbQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - 6. POST [/entries/:id/comment] - Comentar una entrada (no se permiten comentarios a comentarios) | [Token-obligatorio] | [OPCIONAL].
app.post('/entries/:id/comment', isAuth, entryExists, createCommentController);
//      - createCommentController pasa por el middleware isAuth y luego por el middleware entryExists.
//      - createCommentController requiere, finalmente, la FUNCIÓN QUERY deleteLikeInDbQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------
// - EXTRA PARA REACT - GET [/comments]
// NOTA: En el Front, finalmente, no usamos este endpoint porque con "listeEntriesController" ya traemos toda la info de los comentarios, fotos y likes de cada entrada.
app.get('/comments', isAuthOptional, listCommentsController);
//      - listCommentsController pasa por el middleware isAuthOptional.
//      - listCommentsController requiere la FUNCIÓN QUERY selectAllCommentsQuery.js de (DB/queries/entries).
//--------------------------------------------------------------------------

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ERROR MIDDLEWARES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/**##################################
 * ## CONTROLLED ERRORS MIDDLEWARE ##
 * ##################################
 */
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message,
  });
});

/**######################################
 * ## ROUTE NOT FOUND ERROR MIDDLEWARE ##
 * ######################################
 */
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SERVER ACTIVATION MIDDLEWARE %%%%%%%%%%%%%%%%%%%%%%%%%%

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://127.0.0.1:${PORT}`);
});
