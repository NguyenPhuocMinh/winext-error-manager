'use strict';

const winext = require('winext');

function ErrorManager(params = {}) {
  console.log("🚀 ~ file: error-manager.js ~ line 7 ~ ErrorManager ~ params", params)

  this.errorBuilder = function (message) {
    console.log("🚀 ~ file: error-manager.js ~ line 10 ~ ErrorManager ~ message", message)

  }
};

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
