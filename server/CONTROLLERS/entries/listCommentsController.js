// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const selectAllCommentsQuery = require('../../DB/queries/entries/selectAllCommentsQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA listCommentsController %%%%%%%%%%%

// Función Controladora que se encarga de conectar con la función query selectAllEntriesQuery para listar (en base a una keyword de búsqueda) todas las entradas, con sus respectivas fotos, en orden descendente de creación.

const listCommentsController = async (req, res, next) => {
  try {
    // Llamamos a la FUNCIÓN QUERY selectAllEntriesQuery de (DB/queries/entries):
    const comments = await selectAllCommentsQuery(req.user?.id);

    res.send({
      status: 'ok',
      message: 'Listado de comentarios:',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS listCommentsController %%%%%%%%%%%%%%%%%%%%%

module.exports = listCommentsController;
