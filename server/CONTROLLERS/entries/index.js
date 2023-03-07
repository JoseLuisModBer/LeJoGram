// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const newEntryController = require('./newEntryController');
const listEntriesController = require('./listEntriesController');
const getEntryByIdController = require('./getEntryByIdController');
const doLikeController = require('./doLikeController');
const deleteLikeController = require('./deleteLikeController');
const createCommentController = require('./createCommentController');
const listCommentsController = require('./listCommentsController');
const deleteEntryController = require('./deleteEntryController');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = {
  newEntryController,
  listEntriesController,
  getEntryByIdController,
  doLikeController,
  deleteLikeController,
  createCommentController,
  listCommentsController,
  deleteEntryController,
};
