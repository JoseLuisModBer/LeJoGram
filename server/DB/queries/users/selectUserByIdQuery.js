// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../../helpers');

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY selectUserByIdQuery %%%%%%%%%%%%%%%%%%%%%%%%

// Función query que crea un usuario en la DB y devuelve su id:

const selectUserByIdQuery = async (id) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, name, email, created_at, avatar FROM users WHERE id = ?`,
      [id]
    );

    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }

    const [entries] = await connection.query(
      `SELECT * FROM entries WHERE user_id = ?`,
      [id]
    );

    const [photos] = await connection.query(`SELECT * FROM photos`);

    const entriesWithPhotos = entries.map((entry) => {
      return {
        ...entry,
        photos: photos.filter((photo) => {
          return photo.entry_id === entry.id;
        }),
      };
    });

    return {
      ...users[0],
      entries: entriesWithPhotos,
    };
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS selectUserByIdQuery %%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = selectUserByIdQuery;
