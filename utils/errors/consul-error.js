'use strict';

const BaseError = require('./base-error');

class ConsulError extends BaseError {
  constructor(error) {
    super(error);
    this.name = 'ConsulError';
    this.message = error.message;
    this.stack = error.stack;
  }
}

module.exports = ConsulError;
