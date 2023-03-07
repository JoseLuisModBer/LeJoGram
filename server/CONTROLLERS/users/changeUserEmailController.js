// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../helpers');

const changeUserEmailInDbQuery = require('../../DB/queries/users/changeUserEmailInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA changeUserEmailController %%%%%%%%%%%

// Función controladora para cambiar el email de usuario.

const changeUserEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { userId } = req.body;

    if (!email) {
      throw generateError('Debes enviar un nuevo email', 400);
    }

    // Llamamos a la FUNCIÓN QUERY changeUserEmailInDbQuery de (DB/queries/users)
    await changeUserEmailInDbQuery(userId, email);

    res.send({
      status: 'ok',
      message: 'Email del usuario modificado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS changeUserEmailController %%%%%%%%%%%%%%%%%%%%%%

module.exports = changeUserEmailController;
