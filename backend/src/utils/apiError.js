class ApiError extends Error {
  constructor(status, message, stack) {
    super(message);
    this.status = status || 400;
    this.data = null;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
