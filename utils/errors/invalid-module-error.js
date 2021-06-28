'use strict';

const BaseError = require('./base-error');

class InvalidModuleError extends BaseError {
  constructor(error) {
    super(error);
    this.name = 'InvalidModuleError';
    this.message = `Please config valid module name in dependencies`;
  }
};

module.exports = InvalidModuleError;