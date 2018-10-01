"use strict";
module.exports = require('./loader')(self, loadImplementation)

/**
 * Browser specific loadImplementation.  Always uses `self.Promise`
 *
 * To register a custom implementation, must register with `Promise` option.
 */
function loadImplementation(){
  if(typeof self.Promise === 'undefined'){
    throw new Error("any-promise browser requires a polyfill or explicit registration"+
      " e.g: require('any-promise/register/bluebird')")
  }
  return {
    Promise: self.Promise,
    implementation: 'self.Promise'
  }
}
