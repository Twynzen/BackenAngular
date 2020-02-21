const users = require("./users.controller");
module.exports = router => {
  router.get("/users", users.getUsers);
  router.get("/users/:id", users.getUser);
  router.post("/users", users.createUser);
  router.post("/usersLogin", users.loginUser);
  router.patch("/users/:id", users.updateUser);
  router.delete("/users/:id", users.deleteUser);
};
