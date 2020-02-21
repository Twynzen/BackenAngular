"use strict";
const cors = require("cors");

const users = require("./users/users.routes");
const travels = require('./travels/travels.routes');
const books = require("./books/books.routes");
const booksWon = require("./books-won/books-won.routes");

const express = require("express");
const properties = require("./config/properties");
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
const bodyParserJSON = bodyParser.json();
const bodyParserJSONEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserJSONEncoded);

app.use(cors());

app.use("/api", router);
users(router);
travels(router);
books(router);
booksWon(router);

router.get("/", (req, res) => {
  res.send("");
});
app.use(router);
app.listen(properties.port, () =>
  console.log(`Server runing on port ${properties.port}`)
);
