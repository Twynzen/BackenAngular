/* const bodyPart = require('./body-parts.model');*/
const bookCtrl = {};
const db = require("../config/db");
const md5 = require("md5");

bookCtrl.getBooks = (req, res, next) => {
  const sql = "select * from libro";
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

bookCtrl.getBook = (req, res, next) => {
  const sql = "select * from libro where id = ?";
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

bookCtrl.getBookNo = (req, res, next) => {
  const sql = `SELECT *
  FROM libro
  WHERE NOT EXISTS (SELECT * 
                    FROM libro_Ganado
                    WHERE libro_Ganado.id_libro = libro.id AND libro_Ganado.id_usuario = ?)`;
  const params = [req.params.id];
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

bookCtrl.updateBook = (req, res, next) => {
  var data = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    precio: req.body.precio,
    fechaPublicacion: req.body.fechaPublicacion,
    descripcion: req.body.descripcion,
    link_book: req.body.link_book
  };
  db.run(
    `UPDATE libro set 
           titulo = COALESCE(?,titulo), 
           autor = COALESCE(?,autor), 
           precio = COALESCE(?,precio),
           fechaPublicacion = COALESCE(?,fechaPublicacion),
           descripcion = COALESCE(?,descripcion),
           link_book = COALESCE(?,link_book)
           WHERE id = ?`,
    [
      data.titulo,
      data.autor,
      data.precio,
      data.fechaPublicacion,
      data.descripcion,
      data.link_book,
      req.params.id
    ],
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

bookCtrl.createBook = (req, res, next) => {
  var errors = [];
  var data = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    precio: req.body.precio,
    fechaPublicacion: req.body.fechaPublicacion,
    descripcion: req.body.descripcion,
    link_book: req.body.link_book
  };
  var sql =
    "INSERT INTO libro (titulo, autor, precio, fechaPublicacion, descripcion, link_book) VALUES (?,?,?,?,?,?)";
  var params = [
    data.titulo,
    data.autor,
    data.precio,
    data.fechaPublicacion,
    data.descripcion,
    data.link_book
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {...data, id: this.lastID}
    });
  });
};

bookCtrl.deleteBook = (req, res, next) => {
  db.run("DELETE FROM libro WHERE id = ?", req.params.id, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
};

module.exports = bookCtrl;
