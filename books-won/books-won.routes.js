const booksWon = require("./books-won.controller");
module.exports = router => {
  router.get("/books-won", booksWon.getBooksWon);
  router.get("/books-won/:id", booksWon.getBookWon);
  router.post("/books-won", booksWon.createBookWon);
  router.patch("/books-won/:id", booksWon.updateBookWon);
  router.delete("/books-won/:id", booksWon.deletebookWon);
};
