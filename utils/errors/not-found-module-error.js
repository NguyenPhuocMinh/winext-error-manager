'use strict';

const BaseError = require('./base-error');

class NotFoundModuleError extends BaseError {
  constructor(message) {
    super(message);

    this.name = 'ModuleNameNotFound'
    this.message = message;
  }
};

module.exports = NotFoundModuleError;