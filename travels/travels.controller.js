/* const bodyPart = require('./body-parts.model');*/
const travelCtrl = {};
const db = require("../config/db");
const md5 = require("md5");

travelCtrl.getTravels = (req, res, next) => {
  const sql = "select * from travel";
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

travelCtrl.getTravel = (req, res, next) => {
  const sql = "select * from travel where id = ?";
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

travelCtrl.updateTravel = (req, res, next) => {
  var data = {
    distancia: req.body.distancia,
    cash: req.body.cash
  };
  db.run(
    `UPDATE travel set 
           distancia = COALESCE(?,distancia), 
           cash = COALESCE(?,cash)
           WHERE id = ?`,
    [data.distancia, data.cash, req.params.id],
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

travelCtrl.createTravel = (req, res, next) => {
  var errors = [];
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    distancia: req.body.distancia,
    cash: req.body.cash
  };
  var sql = "INSERT INTO travel (distancia, cash) VALUES (?,?)";
  var params = [data.distancia, data.cash];
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

travelCtrl.deleteTravel = (req, res, next) => {
  db.run("DELETE FROM travel WHERE id = ?", req.params.id, function(
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

module.exports = travelCtrl;
