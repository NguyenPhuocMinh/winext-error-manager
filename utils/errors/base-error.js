'use strict';

class BaseError extends Error {
  constructor(error) {
    super(error);
    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
  }
}

module.exports = BaseError;
