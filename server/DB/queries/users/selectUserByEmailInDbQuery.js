// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../../helpers');

const { getDB } = require('../../getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY selectUserByEmailInDbQuery %%%%%%%%%%

// Función que busca un usuario en la DB por su email y luego compara la contraseña de ese usuario en la DB con la contraseña introducida en la petición de login.
// Si ambas son iguales, crea un TOKEN de usuario.
const selectUserByEmailInDbQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, password FROM users WHERE email = ?`,
      [email]
    );

    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }

    // Si existe algún usuario, sabemos que como máximo solo puede haber uno dado que el email no puede repetirse. Retornamos al usuario de la posición 0.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS selectUserByEmailInDbQuery %%%%%%%%%%%%%

module.exports = selectUserByEmailInDbQuery;
