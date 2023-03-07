// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY changeUserNameInDbQuery %%%%%%%%%%%%%

// Función que modifica el nombre de usuario:

const changeUserNameInDbQuery = async (userId, name) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
      UPDATE users
      SET name=?
      WHERE id=?
      `,
      [name, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserNameInDbQuery %%%%%%%%%%%%%%%%

module.exports = changeUserNameInDbQuery;
