require("dotenv").config();
const express = require("express");

const { connect } = require("./db/db");

const booksRouter = require("./controllers/books.controller");

const { errorHandler, unknownEndpoint } = require("./utils/middleware");

const app = express();

connect();

app.use(express.json());

app.use("/books", booksRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
