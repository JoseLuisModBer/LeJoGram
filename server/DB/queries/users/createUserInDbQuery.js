// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY createUserInDbQuery %%%%%%%%%%%%%%%%%

// Función que crea un usuario en la DB y devuelve su id:

const createUserInDbQuery = async (name, email, password, avatar) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (users.length > 0) {
      generateError('Ya existe un usuario con ese email', 409);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPass, avatar]
    );
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createUserInDbQuery %%%%%%%%%%%%%%%%%%%%

module.exports = createUserInDbQuery;
