// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const createNewEntryAndPhotosInDbQuery = require('../../DB/queries/entries/createNewEntryAndPhotosInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA newEntryController %%%%%%%%%%%%

// Función que recibe una petición tipo form-data con un campo "description" y "place" opcional, y uno o tres campos "photo" (file) al menos uno obligatorio.
// Crea la entrada en la tabla Entries (savePhoto crea la carpeta "uploads" con las fotos) y mete el nombre de la foto generado con uuid en la tabla "photos".

const newEntryController = async (req, res, next) => {
  try {
    const { description, place } = req.body;

    const userId = req.user.id;

    if (!req.files?.photo_1) {
      generateError('Debe haber al menos una foto.', 400);
    }

    const reqFiles = req.files;

    // Llamamos a la FUNCIÓN QUERY createNewEntryAndPhotosInDbQuery de (DB/queries/entries):
    const data = await createNewEntryAndPhotosInDbQuery(
      description,
      place,
      userId,
      reqFiles
    );

    res.status(201).send({
      status: 'ok',
      message: `Entry creada en la DB con ID: (${data}) Photo/s creada/s en la tabla photos`,
      data: {
        id: data,
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS newEntryController %%%%%%%%%%%%%%%%%%%%%%

module.exports = newEntryController;
