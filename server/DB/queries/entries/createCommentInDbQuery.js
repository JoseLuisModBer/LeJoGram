// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY createCommentInDbQuery %%%%%%%%%%%%%%%%%

// Función query que se encarga de crear un like a una entrada en la tabla likes de la DB:

const createCommentInDbQuery = async (id, userId, text) => {
  let connection;

  try {
    connection = await getDB();

    const [comment] = await connection.query(
      `
        INSERT INTO comments (user_id, entry_id, comment)
        VALUES (?,?,?)
      `,
      [userId, id, text]
    );

    return comment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createCommentInDbQuery %%%%%%%%%%%%%%%%%%%%%

module.exports = createCommentInDbQuery;
