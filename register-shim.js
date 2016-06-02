"use strict";

// allow browserify build in Node.js #23
var isBrowser = typeof window !== 'undefined'

module.exports = require('./loader')(isBrowser ? window : global, loadImplementation)

/**
 * Browser specific loadImplementation.  Always uses `window.Promise`
 *
 * To register a custom implementation, must register with `Promise` option.
 */
function loadImplementation(){
  if(typeof Promise === 'undefined'){
    throw new Error("any-promise browser requires a polyfill or explicit registration"+
      " e.g: require('any-promise/register/bluebird')")
  }
  return {
    Promise: Promise,
    implementation: isBrowser ? 'window.Promise' : 'global.Promise'
  }
}
