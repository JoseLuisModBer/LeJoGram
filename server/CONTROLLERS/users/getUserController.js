// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const selectUserByIdQuery = require('../../DB/queries/users/selectUserByIdQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA getUserController %%%%%%%%%%%%

// Función controladora para ver el perfil de un usuario con su galería de fotos (y si eres el propio usuario además te mostrará tu email):

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamamos a la FUNCIÓN QUERY selectUserByIdQuery de (DB/queries/users):
    const user = await selectUserByIdQuery(id);

    // NOTA: Con el ? (elvis) le decimos a JS que la propiedad user puede no existir (valor falso):
    if (user.id !== req.user?.id) {
      delete user.email;
    }

    res.send({
      status: 'ok',
      message: 'Listado de entradas (entries) con sus respectivas photos.',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS getUserController %%%%%%%%%%%%%%%%%%%%%%

module.exports = getUserController;
