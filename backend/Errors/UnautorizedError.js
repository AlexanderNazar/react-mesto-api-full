class UnautorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnautorizedError';
    this.statusCode = 401;
  }
}

module.exports = UnautorizedError;
