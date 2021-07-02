'use strict';

const BaseError = require('./base-error');

class NotFoundConfigError extends BaseError {
  constructor(message) {
    super(message);

    this.name = 'ConfigNotFound';
    this.message = message;
  }
}

module.exports = NotFoundConfigError;
