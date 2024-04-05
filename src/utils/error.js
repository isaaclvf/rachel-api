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

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
  }
}

module.exports = {
  MissingFieldsError,
  NotFoundError,
  ValidationError,
  ConflictError,
};
