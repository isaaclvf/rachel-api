class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingFieldsError";
  }
}

module.exports = {
  MissingFieldsError,
};
