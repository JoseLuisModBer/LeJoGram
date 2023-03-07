/**#################################################################
 * ## SCRIPT QUE CREA LAS TABLAS EN LA DB: FUNCIÓN createTablesDB ##
 * #################################################################
 */
// Función createTablesDB que obtendrá una conexión a la DB (usando la función getDbConnection) y creará las tablas en la DB.

// Para ejecutar initDB introducir este comendo (OJO: esto borrará y creará de nuevo las tablas en la DB!!!):
//      node ./DB/initDB.js

`use strict`;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%%%%%%%%%%

require('dotenv').config();

const { getDB } = require('./getDbConnection');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN createTablesDB %%%%%%%%%%%%%%%%%%%%%%%%%%%

let connection;

async function createTablesDB() {
  try {
    connection = await getDB();

    // ELIMINAR LAS TABLAS (DROPS):
    console.log('Eliminando las tablas existentes en la DB...');
    await connection.query(`DROP TABLE IF EXISTS photos;`);
    await connection.query(`DROP TABLE IF EXISTS comments;`);
    await connection.query(`DROP TABLE IF EXISTS likes;`);
    await connection.query(`DROP TABLE IF EXISTS entries;`);
    await connection.query(`DROP TABLE IF EXISTS users;`);

    // CREAR LAS TABLAS:
    console.log('Creando tablas en la DB...');
    // Crear la tabla users:
    await connection.query(`
        CREATE TABLE users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            avatar TINYINT UNSIGNED
        );
    `);
    // Crear la tabla entries:
    await connection.query(`
        CREATE TABLE entries (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            place VARCHAR(100),
            description TEXT NOT NULL,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
    // Crear la tabla photos:
    await connection.query(`
        CREATE TABLE photos (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            photo_name VARCHAR(100) NOT NULL,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
    `);
    // Crear la tabla likes:
    await connection.query(`
        CREATE TABLE likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
    `);
    // Crear la tabla comments:
    await connection.query(`
        CREATE TABLE comments (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            comment VARCHAR (250),
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
    `);

    console.log('¡Tablas creadas!');
  } catch (error) {
    console.error('ERROR:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    process.exit();
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% LLAMADA A FUNCIÓN MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

createTablesDB();
