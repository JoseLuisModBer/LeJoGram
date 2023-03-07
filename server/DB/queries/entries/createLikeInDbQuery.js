// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

const { generateError } = require('../../../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY createLikeInDbQuery %%%%%%%%%%%%%%%%%

// Función query que se encarga de crear un like a una entrada en la tabla likes de la DB:

const createLikeInDbQuery = async (id, userId) => {
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

    if (existingLike.length > 0) {
      generateError('Ya has dado like a esta entrada', 403);
    }

    await connection.query(
      `
        INSERT INTO likes (user_id, entry_id)
        VALUES (?,?)
      `,
      [userId, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createLikeInDbQuery %%%%%%%%%%%%%%%%%%%%%

module.exports = createLikeInDbQuery;
