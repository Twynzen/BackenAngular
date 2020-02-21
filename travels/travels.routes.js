const travels = require("./travels.controller");
module.exports = router => {
  router.get("/travels", travels.getTravels);
  router.get("/travels/:id", travels.getTravel);
  router.post("/travels", travels.createTravel);
  router.patch("/travels/:id", travels.updateTravel);
  router.delete("/travels/:id", travels.deleteTravel);
};
