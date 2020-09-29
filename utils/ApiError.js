class ApiError {
  constructor(message, path = "") {
    this.message = message;
    this.path = path;
  }
  get() {
    return { error: [{ message: this.message, path: this.path }] };
  }
}

module.exports = ApiError;
