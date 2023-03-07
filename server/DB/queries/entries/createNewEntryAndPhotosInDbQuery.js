// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { getDB } = require('../../getDbConnection');

const { savePhoto } = require('../../../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN QUERY createNewEntryAndPhotosInDbQuery %%%%%%%

// Función query que crea una nueva entrada y sus fotos relacionadas en la DB (en sus respectivas tablas):

const createNewEntryAndPhotosInDbQuery = async (
  description,
  place,
  userId,
  reqFiles
) => {
  let connection;

  try {
    connection = await getDB();

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    const [result] = await connection.query(
      `
        INSERT INTO entries (description, place,  user_id)
        VALUES (?,?,?)
      `,
      [description, place, userId]
    );

    const { insertId } = result;

    // Gestiono solo las primeras 3 fotos de la petición (limite max de fotos para un post)
    for (let photosData of Object.values(reqFiles).slice(0, 3)) {
      // Mandamos en cada vuelta del bucle la foto correspondiente a la función "savePhoto" de helpers.js.
      const photoName = await savePhoto(photosData);

      // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

      await connection.query(
        `
            INSERT INTO photos (photo_name, entry_id, user_id)
            VALUES(?,?,?)
          `,
        [photoName, insertId, userId]
      );
    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    return insertId;
  } finally {
    if (connection) connection.release();
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createNewEntryAndPhotosInDbQuery %%%%%%%%%%

module.exports = createNewEntryAndPhotosInDbQuery;
