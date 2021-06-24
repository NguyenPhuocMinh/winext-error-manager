'use strict';

const winext = require('winext');
const errors = require('../utils/errors');

function ErrorManager(params = {}) {
  console.log("🚀 ~ file: error-manager.js ~ line 7 ~ ErrorManager ~ params", params)

  this.errorBuilder = function (message) {
    console.log("🚀 ~ file: error-manager.js ~ line 10 ~ ErrorManager ~ message", message)

  };

  this.newError = function (error) {
  console.log("🚀 ~ file: error-manager.js ~ line 15 ~ ErrorManager ~ error", error)
    try {
      
    } catch (err) {
      console.log("AAAAA", err);
    }
  }
};

exports = module.exports = new ErrorManager();
exports.register = ErrorManager;
