'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const errors = require('../utils/errors');

function ErrorManager(params = {}) {

  this.errorBuilder = function (message) {

  };

  this.newError = function (errorMessage) {
    try {
      throw new errors.NotFoundConfigError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
