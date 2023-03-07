// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const deleteUserQuery = require('../../DB/queries/users/deleteUserQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA deleteUserController %%%%%%%%%%%%

const deleteUserController = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    // Eliminamos el usuario.
    await deleteUserQuery(idUser);

    res.status(200).send({
      status: 'ok',
      message: 'Usuario eliminado',
    });
  } catch (err) {
    next(err);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteUserController %%%%%%%%%%%%%%%%%%%%%%

module.exports = deleteUserController;
