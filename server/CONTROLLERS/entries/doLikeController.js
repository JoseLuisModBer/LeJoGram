// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const createLikeInDbQuery = require('../../DB/queries/entries/createLikeInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA doLikeController %%%%%%%%%%%%%

// Función controladora para crear un like a una entrada de la DB:

const doLikeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    // Llamamos a la FUNCIÓN QUERY createLikeInDbQuery de (DB/queries/entries):
    await createLikeInDbQuery(id, userId);

    res.status(200).send({
      status: 'ok',
      message: 'Like a la entrada correcto.',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS doLikeController %%%%%%%%%%%%%%%%%%%%%%

module.exports = doLikeController;
