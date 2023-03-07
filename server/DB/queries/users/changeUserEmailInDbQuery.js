// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY changeUserEmailInDbQuery %%%%%%%%%%%%

// Función que modifica el email de usuario:

const changeUserEmailInDbQuery = async (userId, email) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
      UPDATE users
      SET email=?
      WHERE id=?
      `,
      [email, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserEmailInDbQuery %%%%%%%%%%%%%%

module.exports = changeUserEmailInDbQuery;
