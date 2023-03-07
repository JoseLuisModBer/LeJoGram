// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../../helpers');

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY getEntrieAndPhotosFromDbQuery %%%%%%%%%%

// Función query que obtiene una entrada y sus fotos de la DB.

const getEntrieAndPhotosFromDbQuery = async (idEntry, idUser) => {
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
          u.name AS user,
          COUNT(l.id) AS likes,
          BIT_OR (l.user_id=?) AS likedByMe
        FROM entries AS e
        LEFT JOIN users AS u ON (u.id = e.user_id)
        LEFT JOIN likes AS l ON (l.entry_id = e.id)
        WHERE e.id = ?
        GROUP BY e.id
      `,
      [idUser, idEntry]
    );

    if (entries.length < 1) {
      generateError('La entrada a buscar no existe.', 404);
    }

    const [photos] = await connection.query(
      `
        SELECT *
        FROM photos
        WHERE entry_id = ?
      `,
      [idEntry]
    );

    const [comments] = await connection.query(
      `
        SELECT c.*, u.name AS user
        FROM comments AS c
        INNER JOIN users AS u ON u.id = c.user_id 
        WHERE entry_id = ?
      `,
      [idEntry]
    );

    return {
      ...entries[0],
      photos,
      comments,
    };
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS getEntrieAndPhotosFromDbQuery %%%%%%%%%%%%%

module.exports = getEntrieAndPhotosFromDbQuery;
