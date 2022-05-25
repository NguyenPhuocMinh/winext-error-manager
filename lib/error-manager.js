'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const errors = require('../utils/errors');
const { get } = lodash;

function ErrorManager(params = {}) {
  const config = get(params, 'config', {});
  const loggerTracer = get(params, 'loggerTracer');
  const errorCodes = get(config, 'errorCodes', {});

  /**
   * @param {*} message
   */
  this.errorBuilder = function (message) {
    try {
      loggerTracer.error(`function errorBuilder start`, {
        args: message,
      });
      const error = {};
      if (Object.prototype.hasOwnProperty.call(errorCodes, message)) {
        loggerTracer.error(`hasOwnProperty name in errorCodes`);
        error.name = message;
        error.message = errorCodes[message].message;
        error.returnCode = errorCodes[message].returnCode;
        error.statusCode = errorCodes[message].statusCode;
      } else {
        loggerTracer.error(`Not hasOwnProperty message in errorCodes`);
        error.name = message;
        error.message = `Error name [${message}] not supported`;
        error.returnCode = 3000;
        error.statusCode = 400;
      }
      loggerTracer.error(`function errorBuilder end`, {
        args: message,
      });
      return error;
    } catch (err) {
      loggerTracer.error(`function errorBuilder has error`, {
        args: err,
      });
      return Promise.reject(err);
    }
  };

  /**
   * @param {*} message
   * @param {*} error
   */
  this.newError = function (message, errorCode) {
    try {
      loggerTracer.error(`function newError has been start`, {
        args: { errorMessage: message },
      });
      const error = {};
      if (Object.prototype.hasOwnProperty.call(errorCode, message)) {
        loggerTracer.error(`hasOwnProperty name in errorCode`);
        error.name = message;
        error.message = errorCode[message].message;
        error.returnCode = errorCode[message].returnCode;
        error.statusCode = errorCode[message].statusCode;
      } else {
        loggerTracer.error(`Not hasOwnProperty message in errorCode`);
        error.name = message;
        error.message = `Error name [${message}] not supported`;
        error.returnCode = 4000;
        error.statusCode = 400;
      }
      loggerTracer.error(`function newError has been end`, {
        args: { errorMessage: message },
      });
      return error;
    } catch (err) {
      loggerTracer.error(`function newError has error`, {
        args: err,
      });
      return Promise.reject(err);
    }
  };

  /**
   * @param {*} errorMessage
   * @param {*} moduleName
   */
  this.requiredModule = function (errorMessage, moduleName) {
    try {
      loggerTracer.error(`function requiredModule has error`, {
        args: { errorMessage, moduleName },
      });
      return new errors.RequiredModuleError(errorMessage, moduleName);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  /**
   * @param {*} errorMessage
   */
  this.invalidModule = function (errorMessage) {
    try {
      loggerTracer.error(`function invalidModule has error`, {
        args: { errorMessage },
      });
      return new errors.InvalidModuleError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  /**
   * @param {*} errorMessage
   */
  this.configNotFound = function (errorMessage) {
    try {
      loggerTracer.error(`function configNotFound has error`, {
        args: { errorMessage },
      });
      return new errors.NotFoundConfigError(errorMessage);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  /**
   * @param {*} error
   */
  this.consulError = function (error) {
    try {
      loggerTracer.error(`function consulError has error`, {
        args: { error },
      });
      return new errors.ConsulError(error);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
