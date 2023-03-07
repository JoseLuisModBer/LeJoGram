// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const createCommentInDbQuery = require('../../DB/queries/entries/createCommentInDbQuery');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = require('../../DB/queries/users/selectUserByIdQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA createCommentController %%%%%%%

// Función controladora para crear un like a una entrada de la DB:
const createCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const { comment } = req.body;

    // FIX ME: Esto se debería de validar con JOI.
    if (!comment) {
      throw generateError(
        'Debes enviar un comentario de hasta 250 caracteres.',
        400
      );
    }

    // Llamamos a la FUNCIÓN QUERY createCommentInDbQuery de (DB/queries/entries):
    const idComment = await createCommentInDbQuery(id, userId, comment);

    const user = await selectUserByIdQuery(userId);

    res.status(200).send({
      status: 'ok',
      message: 'Comentario a la entrada correcto.',
      data: {
        comment: {
          id: idComment,
          comment,
          user: user.name,
          user_id: userId,
          userAvatar: user.avatar,
          entry_id: Number(id),
          created_at: new Date(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS createCommentController %%%%%%%%%%%%%%%%%

module.exports = createCommentController;
