// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY changeUserAvatarInDbQuery %%%%%%%%%%%

// Función que modifica el avatar de usuario:

const changeUserAvatarInDbQuery = async (userId, avatar) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
      UPDATE users
      SET avatar=?
      WHERE id=?
      `,
      [avatar, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserAvatarInDbQuery %%%%%%%%%%%%%%

module.exports = changeUserAvatarInDbQuery;
