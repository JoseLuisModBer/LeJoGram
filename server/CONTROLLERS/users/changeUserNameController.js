// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../helpers');
const changeUserNameInDbQuery = require('../../DB/queries/users/changeUserNameInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA changeUserNameController %%%%%%

// Función controladora para cambiar el nombre de usuario.

const changeUserNameController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { userId } = req.body;

    if (!name) {
      throw generateError('Debes enviar un nuevo nombre', 400);
    }

    // Llamamos a la FUNCIÓN QUERY changeUserNameInDbQuery de (DB/queries/users)
    await changeUserNameInDbQuery(userId, name);

    res.send({
      status: 'ok',
      message: 'Nombre de usuario modificado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserNameController %%%%%%%%%%%%%%%

module.exports = changeUserNameController;
