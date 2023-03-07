// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../DB/getDbConnection');

const { generateError } = require('../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN entryExists %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// FUNCIÓN MIDDLEWARE que se encarga de comprobar si existe una determinada entrada (en base al id de la entrada que pasamos por path param):
const entryExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [entries] = await connection.query(
      `
        SELECT id
        FROM entries
        WHERE id = ?
      `,
      [id]
    );

    if (entries.length === 0) {
      generateError('Entrada no presente', 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS entryExists %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = entryExists;
