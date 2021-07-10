'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const chalk = winext.require('chalk');
const errors = require('../utils/errors');
const { get } = lodash;
const { name, version } = require('../package.json');

function ErrorManager(params = {}) {
  const config = get(params, 'config', {});
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');
  const errorCodes = get(config, 'errorCodes', {});

  /**
   * @param {*} message
   */
  this.errorBuilder = function (message) {
    loggerFactory.data(`function errorBuilder start`, {
      requestId: `${requestId}`,
      args: message
    });
    loggerTracer.info(chalk.red(`Load function errorBuilder by ${name}-${version} successfully!`));
    try {
      const error = {};
      if (Object.prototype.hasOwnProperty.call(errorCodes, message)) {
        loggerFactory.data(`hasOwnProperty name in errorCodes`, {
          requestId: `${requestId}`
        });
        error.name = message;
        error.message = errorCodes[message].message;
        error.returnCode = errorCodes[message].returnCode;
        error.statusCode = errorCodes[message].statusCode;
      } else {
        loggerFactory.data(`Not hasOwnProperty message in errorCodes`, {
          requestId: `${requestId}`
        });
        error.name = message;
        error.message = `Error name [${message}] not supported`;
        error.returnCode = 3000;
        error.statusCode = 400;
      }
      return error;
    } catch (err) {
      loggerFactory.error(`function errorBuilder has error`, {
        requestId: `${requestId}`,
        args: { err }
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
      loggerFactory.warn(`function requiredModule has error`, {
        requestId: `${requestId}`,
        args: { errorMessage, moduleName }
      });
      loggerTracer.info(chalk.red(`Load function requiredModule by ${name}-${version} successfully!`));
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
      loggerFactory.warn(`function invalidModule has error`, {
        requestId: `${requestId}`,
        args: { errorMessage }
      });
      loggerTracer.info(chalk.red(`Load function invalidModule by ${name}-${version} successfully!`));
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
      loggerFactory.warn(`function configNotFound has error`, {
        requestId: `${requestId}`,
        args: { errorMessage }
      });
      loggerTracer.info(chalk.red(`Load function configNotFound by ${name}-${version} successfully!`));
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
      loggerFactory.warn(`function consulError has error`, {
        requestId: `${requestId}`,
        args: { error }
      });
      loggerTracer.info(chalk.red(`Load function configNotFound by ${name}-${version} successfully!`));
      return new errors.ConsulError(error);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
