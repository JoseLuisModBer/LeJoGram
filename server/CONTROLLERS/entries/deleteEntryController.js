// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const deleteEntryQuery = require('../../DB/queries/entries/deleteEntryQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA deleteEntryController %%%%%%%

const deleteEntryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;

    // Eliminamos la entrada.
    await deleteEntryQuery(idUser, id);

    res.status(200).send({
      status: 'ok',
      message: 'Entrada eliminada',
    });
  } catch (err) {
    next(err);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS deleteEntryController %%%%%%%%%%%%%%%%%

module.exports = deleteEntryController;
