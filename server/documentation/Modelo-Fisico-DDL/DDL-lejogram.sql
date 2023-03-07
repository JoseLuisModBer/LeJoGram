-- Borramos la DB si existe | La creamos si no existe | La usamos:
DROP DATABASE IF EXISTS lejogram;
CREATE DATABASE IF NOT EXISTS lejogram DEFAULT CHARACTER SET utf8;
USE lejogram;

-- Ordenamos los drop en este orden, en función de las relacciones de tablas.
DROP TABLE IF EXISTS photos; -- contiene referencias a entries.
DROP TABLE IF EXISTS comments; -- contiene referencias a entries y users.
DROP TABLE IF EXISTS likes; -- contiene referencias a entries y users.
DROP TABLE IF EXISTS entries; -- contiene referencias a users.
DROP TABLE IF EXISTS users; -- NO contiene referencias a ninguna de las otras.

-- Creamos la tabla users:
CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(512) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar TINYINT UNSIGNED
);

-- Creamos la tabla entries:
CREATE TABLE entries (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    place VARCHAR(100),
    description TEXT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creamos la tabla photos:
CREATE TABLE photos (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    photo_name VARCHAR(100) NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
    entry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (entry_id) REFERENCES entries(id)
);

-- Creamos la tabla likes:
CREATE TABLE likes (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    entry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (entry_id) REFERENCES entries(id)
);

-- Creamos la tabla comments (para endpoint opcional):
CREATE TABLE comments (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	comment VARCHAR (250),
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	entry_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (entry_id) REFERENCES entries(id)
);