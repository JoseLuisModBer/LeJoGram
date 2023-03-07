// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../../helpers');

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY deleteLikeInDbQuery %%%%%%%%%%%%%%%%%

// Función query que elimina un like de la tabla likes de la DB:

const deleteLikeInDbQuery = async (id, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [existingLike] = await connection.query(
      `
        SELECT id
        FROM likes
        WHERE user_id = ? AND entry_id = ?
      `,
      [userId, id]
    );

    if (existingLike.length < 1) {
      generateError('El like a borrar no existe.', 404);
    }

    await connection.query(
      `
        DELETE FROM likes
        WHERE user_id=? AND entry_id=?
      `,
      [userId, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteLikeInDbQuery %%%%%%%%%%%%%%%%%%%%

module.exports = deleteLikeInDbQuery;
