// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const createUserController = require('./createUserController');
const loginUserController = require('./loginUserController');
const getUserController = require('./getUserController');
const getOwnUserController = require('./getOwnUserController');
const deleteUserController = require('./deleteUserController');
const changeUserNameController = require('./changeUserNameController');
const changeUserEmailController = require('./changeUserEmailController');
const changeUserAvatarController = require('./changeUserAvatarController');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = {
  createUserController,
  loginUserController,
  getUserController,
  getOwnUserController,
  deleteUserController,
  changeUserNameController,
  changeUserEmailController,
  changeUserAvatarController,
};
