const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");
const dbURL = require("./properties").DB;

let db = new sqlite3.Database(dbURL, error => {
  if (error) {
    console.log(error.message);
    throw error;
  } else {
    console.log("Connected");
    db.run(
      `CREATE TABLE "usuario" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "nombre"	varchar(80) NOT NULL,
        "apellido"	varchar(80) NOT NULL,
        "correo"	varchar(50) NOT NULL,
        "username"	varchar(70) UNIQUE,
        "password"	varchar(8) NOT NULL,
        "id_travel"	INTEGER,
        FOREIGN KEY("id_travel") REFERENCES "Travel"("id")
    )`,
      error => {
        if (error) {
          //
        } else {
          //
        }
      }
    );
    db.run(
      `CREATE TABLE "travel" (
            "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "distancia"	Int NOT NULL,
            "cash"	Int NOT NULL
        )`,
      error => {
        if (error) {
          //
        } else {
          //
        }
      }
    );
    db.run(
      `CREATE TABLE "libro" (
            "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "titulo"	Varchar(90) NOT NULL,
            "autor"	Varchar(80) NOT NULL,
            "precio"	Int NOT NULL,
            "fechaPublicacion"	Date NOT NULL,
            "descripcion"	Varchar(800) NOT NULL,
            "link_book"	Varchar(200) NOT NULL
        )`,
      error => {
        if (error) {
          //
        } else {
          //
        }
      }
    );
    db.run(
      `CREATE TABLE "libro_Ganado" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "id_libro"	INTEGER,
        "id_usuario"	INTEGER,
        FOREIGN KEY("id_libro") REFERENCES "libros"("id"),
        FOREIGN KEY("id_usuario") REFERENCES "Usuario"("id")
    )`,
      error => {
        if (error) {
          //
        } else {
          //
        }
      }
    );
  }
});

module.exports = db;
