// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const jwt = require('jsonwebtoken');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN isAuthOptional %%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Función que comprueba si eres el dueño de una entrada.

const isAuthOptional = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      let tokenInfo;

      try {
        tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
      } catch (err) {
        console.error(err);
      }
      req.user = tokenInfo;
    }

    next();
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS isAuthOptional %%%%%%%%%%%%%%%%%%%%%%%%%%%%

module.exports = isAuthOptional;
