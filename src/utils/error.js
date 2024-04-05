class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingFieldsError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = {
  MissingFieldsError,
  NotFoundError,
  ValidationError,
};
