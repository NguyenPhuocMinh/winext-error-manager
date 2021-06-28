'use strict';

const BaseError = require('./base-error');

class RequiredModuleError extends BaseError {
  constructor(error, module) {
    console.log("🚀 ~ file: required-module-error.js ~ line 7 ~ RequiredModuleError ~ constructor ~ module", module)
    console.log("🚀 ~ file: required-module-error.js ~ line 7 ~ RequiredModuleError ~ constructor ~ error", error)
    super(error, module);
    this.name = 'RequiredModuleError';
    this.message = `Please install ${module} in your package`;
  }
};

module.exports = RequiredModuleError;