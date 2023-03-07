// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const selectAllEntriesQuery = require('../../DB/queries/entries/selectAllEntriesQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA listEntriesController %%%%%%%%%%%

// Función Controladora que se encarga de conectar con la función query selectAllEntriesQuery para listar (en base a una keyword de búsqueda) todas las entradas, con sus respectivas fotos, en orden descendente de creación.

const listEntriesController = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    // Llamamos a la FUNCIÓN QUERY selectAllEntriesQuery de (DB/queries/entries):
    const entriesAndPhotos = await selectAllEntriesQuery(keyword, req.user?.id);

    res.send({
      status: 'ok',
      message: 'Listado de entradas (entries) con sus respectivas photos:',
      data: entriesAndPhotos,
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS listEntriesController %%%%%%%%%%%%%%%%%%%%%

module.exports = listEntriesController;
