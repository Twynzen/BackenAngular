const books = require("./books.controller");
module.exports = router => {
  router.get("/books", books.getBooks);
  router.get("/books/:id", books.getBook);
  router.post("/books", books.createBook);
  router.patch("/books/:id", books.updateBook);
  router.delete("/books/:id", books.deleteBook);
  router.get("/books/users/:id", books.getBookNo);
};