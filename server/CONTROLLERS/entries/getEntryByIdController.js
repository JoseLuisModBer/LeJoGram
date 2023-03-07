// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const getEntrieAndPhotosFromDbQuery = require('../../DB/queries/entries/getEntrieAndPhotosFromDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA getEntryByIdController %%%%%%%%%%%

// Función controladora que devuelve una entrada en base al id de la propia entrada. Solo apta para usuarios logueados.

const getEntryByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamamos a la FUNCIÓN QUERY createUserInDv de (DB/queries/users)
    const data = await getEntrieAndPhotosFromDbQuery(id, req.user?.id);

    res.status(200).send({
      status: 'ok',
      message: 'Mostrando entrada:',
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS getEntryByIdController %%%%%%%%%%%%%%%%%%%%%

module.exports = getEntryByIdController;
