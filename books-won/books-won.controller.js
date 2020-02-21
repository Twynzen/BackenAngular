/* const bodyPart = require('./body-parts.model');*/
const booksWonCtrl = {};
const db = require("../config/db");
const md5 = require("md5");

booksWonCtrl.getBooksWon = (req, res, next) => {
  const sql = "select * from libro_Ganado";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
};

booksWonCtrl.getBookWon = (req, res, next) => {
  const sql = "select * from libro_Ganado where id = ?";
  const params = [req.params.id];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row[0]
    });
  });
};

booksWonCtrl.updateBookWon = (req, res, next) => {
  var data = {
    id_libro: req.body.id_libro,
    id_usuario: req.body.id_usuario
  };
  db.run(
    `UPDATE libro_Ganado set 
           id_libro = COALESCE(?,id_libro), 
           id_usuario = COALESCE(?,id_usuario)
           WHERE id = ?`,
    [data.id_libro, data.id_usuario, req.params.id],
    function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: {...data, id: req.params.id},
        changes: this.changes
      });
    }
  );
};

booksWonCtrl.createBookWon = (req, res, next) => {
  var data = {
    id_libro: req.body.id_libro,
    id_usuario: req.body.id_usuario
  };
  var sql = "INSERT INTO libro_Ganado (id_libro, id_usuario) VALUES (?,?)";
  var params = [data.id_libro, data.id_usuario];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {...data, id: this.lastID},
      id: this.lastID
    });
  });
};

booksWonCtrl.deletebookWon = (req, res, next) => {
  db.run("DELETE FROM libro_Ganado WHERE id = ?", req.params.id, function(
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
};

module.exports = booksWonCtrl;
