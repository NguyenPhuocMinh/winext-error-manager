'use strict';

const BaseError = require('./base-error');

class ConsulError extends BaseError {
  constructor(error) {
    super(error);
    this.name = 'ConsulError';
    this.message = `Please config valid module name in dependencies`;
    this.stack = error.stack;
  }
}

module.exports = ConsulError;
