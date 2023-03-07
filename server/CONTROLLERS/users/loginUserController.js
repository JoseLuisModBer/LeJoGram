// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const selectUserByEmailInDbQuery = require('../../DB/queries/users/selectUserByEmailInDbQuery');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN CONTROLADORA loginUserController %%%%%%%%%%%%

// Función controladora que permite loguear a un usuario y generar su TOKEN.

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError('Debes enviar un email y una password', 400);
    }

    // Llamamos a la FUNCIÓN QUERY selectUserByEmailInDb de (DB/queries/users):
    const user = await selectUserByEmailInDbQuery(email);

    // Comprobamos si las contraseñas coinciden.
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      generateError('Contraseña incorrecta', 401);
    }

    const tokenInfo = {
      id: user.id,
    };

    // Creamos el token. Le damos una validez de 1 semana (7 días):
    const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.send({
      status: 'ok',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS loginUserController %%%%%%%%%%%%%%%%%%%%%%

module.exports = loginUserController;
