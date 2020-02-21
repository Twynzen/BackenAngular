/* const bodyPart = require('./body-parts.model');*/
const userCtrl = {};
const db = require("../config/db");
const md5 = require("md5");

userCtrl.getUsers = (req, res, next) => {
  const sql = "select * from usuario";
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

userCtrl.loginUser = (req, res, next) => {
  errors = []
  console.log(req.body);
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.username) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "select * from usuario where username = ? and password = ?";
  const params = [req.body.username, md5(req.body.password)];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(403).json({ error: err.message });
      return;
    }
    if (!row[0]) {
      res.status(404).json({ data: { message: "No data" } });
      return;
    }
    res.json({
      message: "success",
      data: row[0]
    });
  });
};

userCtrl.getUser = (req, res, next) => {
  const sql = "select * from usuario where id = ?";
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

userCtrl.updateUser = (req, res, next) => {
  var data = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    password: req.body.password ? md5(req.body.password) : null,
    username: req.body.username
  };
  db.run(
    `UPDATE usuario set 
           nombre = COALESCE(?,nombre), 
           apellido = COALESCE(?,apellido), 
           correo = COALESCE(?,correo),
           password = COALESCE(?,password),
           username = COALESCE(?,username) 
           WHERE id = ?`,
    [
      data.nombre,
      data.apellido,
      data.correo,
      data.password,
      data.username,
      req.params.id
    ],
    function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: {
          ...data,
          id: req.params.id
        },
        changes: this.changes
      });
    }
  );
};

userCtrl.createUser = (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.username) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    password: md5(req.body.password),
    username: req.body.username,
    id_travel: req.body.id_travel
  };
  var sql =
    "INSERT INTO usuario (nombre, apellido, correo, password, username, id_travel) VALUES (?,?,?,?,?,?)";
  var params = [
    data.nombre,
    data.apellido,
    data.correo,
    data.password,
    data.username,
    data.id_travel
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { ...data, id: this.lastID }
    });
  });
};

userCtrl.deleteUser = (req, res, next) => {
  db.run("DELETE FROM usuario WHERE id = ?", req.params.id, function(
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

module.exports = userCtrl;
