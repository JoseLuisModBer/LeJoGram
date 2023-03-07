// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const { generateError } = require('../../helpers');

const createUserInDbQuery = require('../../DB/queries/users/createUserInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA createUserController %%%%%%%%%%%

// Función controladora para crear un usuario en la DB.

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!email || !password) {
      throw generateError('Debes enviar un email y una password', 400);
    }

    // Llamamos a la FUNCIÓN QUERY createUserInDv de (DB/queries/users)
    await createUserInDbQuery(name, email, password, avatar);

    res.send({
      status: 'ok',
      message: 'Usuario creado',
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createUserController %%%%%%%%%%%%%%%%%%%%%%

module.exports = createUserController;
