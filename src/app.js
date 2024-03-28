require("dotenv").config();
const express = require("express");

const { connect } = require("./db/db");

const booksRouter = require("./controllers/books.controller");

const app = express();
connect();

app.use(express.json());

app.use("/books", booksRouter);

module.exports = app;
