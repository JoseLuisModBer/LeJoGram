// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY selectAllEntriesQuery %%%%%%%%%%%%%%%%%%

// Función que se encarga de listar (en base a una keyword de búsqueda) todas las entradas, con sus respectivas fotos, en orden descendente de creación.
// El id de después de keyword es el id de usuario.
const selectAllEntriesQuery = async (keyword = '', id) => {
  let connection;

  try {
    connection = await getDB();

    const [entries] = await connection.query(
      `
        SELECT 
          e.id, 
          e.created_at, 
          e.place, 
          e.description, 
          e.user_id, 
          u.email, 
          u.name,
          u.avatar,
          COUNT(l.id) AS likes, 
          BIT_OR(l.user_id=?) AS likedByMe,
          e.user_id = ? AS owner
        FROM entries AS e
        LEFT JOIN users AS u ON u.id = e.user_id
        LEFT JOIN likes AS l ON l.entry_id = e.id
        WHERE e.description LIKE ?
        GROUP BY e.id
        ORDER BY e.created_at DESC;
      `,
      [id, id, `%${keyword}%`]
    );

    for (const entry of entries) {
      const [photos] = await connection.query(
        `SELECT * FROM photos WHERE entry_id = ?`,
        [entry.id]
      );

      const [comments] = await connection.query(
        ` 
          SELECT c.*, u.name AS user, u.avatar AS userAvatar
          FROM comments AS c
          INNER JOIN users AS u ON u.id = c.user_id 
          WHERE entry_id = ?
          ORDER BY c.created_at ASC;
        `,
        [entry.id]
      );

      entry.photos = photos;
      entry.comments = comments;
    }

    return entries;
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS selectAllEntriesQuery %%%%%%%%%%%%%%%%%%%%%%

module.exports = selectAllEntriesQuery;
