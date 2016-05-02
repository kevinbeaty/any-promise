"use strict";
module.exports = require('./lib')(window, loadImplementation)

function loadImplementation(){
  return {
    Promise: window.Promise,
    implementation: 'window.Promise'
  }
}
