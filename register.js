"use strict"
var registered = null

module.exports = register
function register(implementation){
  implementation = implementation || null

  if(registered !== null
      && implementation !== null
      && registered.implementation !== implementation){
    // Throw error if attempting to redefine implementation
    throw new Error('any-promise already defined as "'+registered.implementation+
      '".  You can only register an implementation before the first '+
      ' call to require("any-promise") and an implementation cannot be changed')
  }

  if(registered === null){
    // load implementation
    registered = {}
    if(implementation !== null){
      // require implementation if we haven't done yet and is specified
      var lib = require(implementation)
      registered.Promise = lib.Promise || lib
      registered.implementation = implementation
    } else if(typeof global.Promise !== 'undefined'){
      // if no implementation or env specified use global.Promise
      registered.Promise = global.Promise
      registered.implementation = 'global.Promise'
    } else {
      throw new Error('Cannot find any-promise implementation nor'+
        ' global.Promise. You must install polyfill or call'+
        ' require("any-promise/register") with your preferred'+
        ' implementation, e.g. require("any-promise/register")("bluebird")'+
        ' on application load prior to any require("any-promise").')
    }
  }

  return registered
}
