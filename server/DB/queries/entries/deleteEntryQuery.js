// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

const { generateError, deletePhoto } = require('../../../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY deleteEntryQuery %%%%%%%

const deleteEntryQuery = async (idUser, id) => {
  let connection;

  try {
    connection = await getDB();

    // Seleccionamos la entrada a borrar.
    const [entry] = await connection.query(
      `SELECT user_id FROM entries WHERE id = ?`,
      [id]
    );

    // Comprobamos si la persona que está intentando eliminar la entrada es la propietaria de la entrada.
    if (entry[0].user_id !== idUser) {
      throw generateError('No tienes suficientes permisos', 401);
    }

    // Borramos en la DB todos los likes relacionados con la entrada que queremos eliminar.
    await connection.query(`DELETE FROM likes WHERE entry_id = ?`, [id]);

    // Borramos en la DB todos los comentarios relacionados con la entrada que queremos eliminar.
    await connection.query(`DELETE FROM comments WHERE entry_id = ?`, [id]);

    // Borramos de la carpeta uploads todas las fotos relaccionadas con la entrada que queremos eliminar.
    const [photos] = await connection.query(
      `SELECT photo_name FROM photos WHERE entry_id = ?`,
      [id]
    );

    for (const photo of photos) {
      await deletePhoto(photo.photo_name);
    }

    // Borramos en la DB todas las fotografías relacionados con la entrada que queremos eliminar.
    await connection.query(`DELETE FROM photos WHERE entry_id = ?`, [id]);

    // Borramos la entrada.
    await connection.query(`DELETE FROM entries WHERE id = ?`, [id]);
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteEntryQuery %%%%%%%%%%

module.exports = deleteEntryQuery;
