require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");

const { connect } = require("./db/db");

const booksRouter = require("./controllers/books.controller");
const usersRouter = require("./controllers/users.controller");
const loginRouter = require("./controllers/login.controller");
const loansRouter = require("./controllers/loans.controller");

const { errorHandler, unknownEndpoint } = require("./utils/middleware");

const app = express();

connect();

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/loans", loansRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
