// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const deleteLikeInDbQuery = require('../../DB/queries/entries/deleteLikeInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA deleteLikeController %%%%%%%%%%%%

// Función controladora para eliminar un like a una entrada de la DB:

const deleteLikeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    // Llamamos a la FUNCIÓN QUERY createUserInDv de (DB/queries/users):
    await deleteLikeInDbQuery(id, userId);

    res.status(200).send({
      status: 'ok',
      message: 'Like borrado correctamente.',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteLikeController %%%%%%%%%%%%%%%%%%%%%%

module.exports = deleteLikeController;
