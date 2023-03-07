// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');
const { generateError, deletePhoto } = require('../../../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY deleteUserQuery %%%%%%%

const deleteUserQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    // Seleccionamos el usuario a borrar. ✅
    const [user] = await connection.query(`SELECT id FROM users WHERE id = ?`, [
      idUser,
    ]);

    // Comprobamos si la persona que está intentando eliminar el usuario es el propio usuario. ✅
    if (user[0].id !== idUser) {
      throw generateError('No puedes borrar un usuario que no sea tuyo!', 401);
    }

    // Seleccionamos los id de las entradas creadas por el usuario que queremos eliminar. ✅
    const [idOfEntriesOfUserToDelete] = await connection.query(
      `SELECT id FROM entries WHERE user_id = ?`,
      [idUser]
    );

    // Borramos de la carpeta uploads todas las fotos relaccionadas con el usuario que queremos eliminar. ✅
    const [photos] = await connection.query(
      `SELECT photo_name FROM photos WHERE user_id = ?`,
      [idUser]
    );

    for (const photo of photos) {
      await deletePhoto(photo.photo_name);
    }

    // Borramos en la DB todas las fotografías relacionados con la entrada que queremos eliminar. ✅
    await connection.query(`DELETE FROM photos WHERE user_id = ?`, [idUser]);

    // Borramos en la DB todos los comentarios relacionados con entradas del usuario que queremos eliminar.
    for (const entry of idOfEntriesOfUserToDelete) {
      await connection.query(`DELETE FROM comments WHERE entry_id = ?`, [
        entry.id,
      ]);
    }
    // ...y borramos en la DB todos los comentarios que haya hecho el usuario a borrar (por si hizo comentarios a entradas de otros usuarios).
    await connection.query('DELETE FROM comments WHERE user_id = ?', [idUser]);

    // Borramos en la DB todos los likes relacionados con entradas del usuario que queremos eliminar.
    for (const entry of idOfEntriesOfUserToDelete) {
      await connection.query(`DELETE FROM likes WHERE entry_id = ?`, [
        entry.id,
      ]);
    }
    // ...y borramos en la DB todos los likes que haya hecho el usuario a borrar (por si dio like a entradas de otros usuarios).
    await connection.query('DELETE FROM likes WHERE user_id = ?', [idUser]);

    // Borramos las entradas del usuario a eliminar.
    await connection.query(`DELETE FROM entries WHERE user_id = ?`, [idUser]);

    // Borramos el usuario.
    await connection.query(`DELETE FROM users WHERE id = ?`, [idUser]);
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteUserQuery %%%%%%%%%%

module.exports = deleteUserQuery;
