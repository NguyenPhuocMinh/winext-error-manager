'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const errors = require('../utils/errors');

function ErrorManager(params = {}) {
  console.log("🚀 ~ file: error-manager.js ~ line 8 ~ ErrorManager ~ params", params)

  this.errorBuilder = function (message) {

  };

  this.requiredModule = function (errorMessage, moduleName) {
    try {
      throw new errors.RequiredModuleError(errorMessage, moduleName);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  this.invalidModule = function (errorMessage) {
    try {
      throw new errors.InvalidModuleError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  this.configNotFound = function (errorMessage) {
    try {
      throw new errors.NotFoundConfigError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
