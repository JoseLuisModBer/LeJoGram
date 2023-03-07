// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const selectUserByIdQuery = require('../../DB/queries/users/selectUserByIdQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA getOwnUserController %%%%%%%%%

// Función controladora para ver el perfil de un usuario con su galería de fotos (y si eres el propio usuario además te mostrará tu email):

const getOwnUserController = async (req, res, next) => {
  try {
    // Llamamos a la FUNCIÓN QUERY selectUserByIdQuery de (DB/queries/users):
    const user = await selectUserByIdQuery(req.user.id);

    res.send({
      status: 'ok',
      message:
        'Listado de entradas (entries) propias con sus respectivas photos.',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS getOwnUserController %%%%%%%%%%%%%%%%%%

module.exports = getOwnUserController;
