const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  let statusCode = 500;

  if (error instanceof SyntaxError) {
    statusCode = 400;
  } else if (error instanceof ValidationError) {
    statusCode = 422;
  } else if (error instanceof NotFoundError) {
    statusCode = 404;
  }

  res.status(statusCode).json({ error: error.message });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
