// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../helpers');

const changeUserAvatarInDbQuery = require('../../DB/queries/users/changeUserAvatarInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA changeUserAvatarController %%%%

// Función controladora para cambiar el avatar de usuario.

const changeUserAvatarController = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const { userId } = req.body;

    if (!avatar) {
      throw generateError('Debes enviar un nuevo avatar', 400);
    }

    // Llamamos a la FUNCIÓN QUERY changeUserAvatarInDbQuery de (DB/queries/users)
    await changeUserAvatarInDbQuery(userId, avatar);

    res.send({
      status: 'ok',
      message: 'Avatar del usuario modificado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserAvatarController %%%%%%%%%%

module.exports = changeUserAvatarController;
