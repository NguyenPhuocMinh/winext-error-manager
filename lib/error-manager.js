'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const errors = require('../utils/errors');
const { get } = lodash;

function ErrorManager(params = {}) {
  const config = get(params, 'config', {});
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  console.log("🚀 ~ file: error-manager.js ~ line 13 ~ ErrorManager ~ config", config)

  this.errorBuilder = function (message) {
    loggerFactory.data(`function errorBuilder start`, {
      requestId: `${requestId}`,
      args: message
    })
    try {
      const error = {};
      if (errorCodes.hasOwnProperty(message)) {
        loggerFactory.data(`hasOwnProperty name in errorCodes`, {
          requestId: `${requestId}`,
        })
        error.name = message;
        error.message = errorCodes[message].message;
        error.returnCode = errorCodes[message].returnCode;
        error.statusCode = errorCodes[message].statusCode;
      } else {
        loggerFactory.data(`Not hasOwnProperty message in errorCodes`, {
          requestId: `${requestId}`,
        })
        error.name = message;
        error.message = `Error name [${message}] not supported`;
        error.returnCode = 3000;
        error.statusCode = 400
      }
    } catch (err) {
      loggerFactory.error(`function errorBuilder has error`, {
        requestId: `${requestId}`,
        args: { err }
      })
      return Promise.reject(err);
    }
  };

  this.requiredModule = function (errorMessage, moduleName) {
    try {
      loggerFactory.warn(`function requiredModule has error`, {
        requestId: `${requestId}`,
        args: { errorMessage, moduleName }
      })
      return new errors.RequiredModuleError(errorMessage, moduleName);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  this.invalidModule = function (errorMessage) {
    try {
      loggerFactory.warn(`function invalidModule has error`, {
        requestId: `${requestId}`,
        args: { errorMessage }
      })
      return new errors.InvalidModuleError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  this.configNotFound = function (errorMessage) {
    try {
      loggerFactory.warn(`function configNotFound has error`, {
        requestId: `${requestId}`,
        args: { errorMessage }
      })
      return new errors.NotFoundConfigError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
