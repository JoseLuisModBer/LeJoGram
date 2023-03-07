// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const fs = require('fs/promises');

const { UPLOADS_DIR } = process.env;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN generateError %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Función para crear errores controlados que serán enviados al MIDDLEWARE de errores controlados de server.js.
const generateError = (message, status) => {
  const error = new Error(message);
  error.statusCode = status;
  throw error;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN savePhoto %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Función que crea la carpeta UPLOADS, reescala las imágenes, da un nombre único (uuid) y guarda las imágenes en UPLOADS.
const savePhoto = async (img) => {
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  sharpImg.resize(500);

  const imgName = `${uuid.v4(25)}.jpg`;

  const imgPath = path.join(uploadsPath, imgName);

  await sharpImg.toFile(imgPath);

  return imgName;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN deletePhoto %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const deletePhoto = async (imgName) => {
  const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

  try {
    await fs.access(imgPath);
  } catch {
    return;
  }

  await fs.unlink(imgPath);
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
module.exports = {
  generateError,
  savePhoto,
  deletePhoto,
};
