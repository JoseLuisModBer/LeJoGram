// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY selectAllCommentsQuery %%%%%%%%%%%%%%%%%%

// Función que se encarga de listar los comentarios en orden ascendente de creación.
// El id de después de keyword es el id de usuario.
const selectAllCommentsQuery = async (id) => {
  let connection;

  try {
    connection = await getDB();

    const [comments] = await connection.query(
      `
        SELECT c.id, c.created_at, c.comment, c.user_id, c.entry_id, u.name, e.id
        FROM comments AS c
        LEFT JOIN users AS u ON (u.id = user_id)
        LEFT JOIN entries AS e ON (e.id = entry_id)
        ORDER BY c.created_at ASC;

      `,
      [id]
    );
    return comments;
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS selectAllCommentsQuery %%%%%%%%%%%%%%%%%%%%%%

module.exports = selectAllCommentsQuery;
