// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%

const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN isAuth %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Función que usaremos recurrentemente para verificar si un usuario está logueado.
// La usaremos antes de lanzar los middleware-EndPoints de peticiones que exijan TOKEN.

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateError('Falta la cabecera de autenticación (TOKEN)', 400);
    }

    let tokenInfo;
    tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS isAuth %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = isAuth;
