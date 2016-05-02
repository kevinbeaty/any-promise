"use strict"
module.exports = require('./lib')(global, loadImplementation);

/**
 * Requires the given implementation and returns the registration
 * containing {Promise, implementation}
 *
 * The returned Promise will be the Promise property if
 * defined, otherwise it will return the library itself.
 *
 * If implementation is global.Promise, calls loadGlobal
 * Otherwise uses require
 */
function loadImplementation(implementation){
  if(!implementation){
    if(shouldPreferGlobalPromise()){
      // if no implementation or env specified use global.Promise
      return loadGlobal()
    } else {
      // try to auto detect implementation. This is non-deterministic
      // and should prefer other branches, but this is our last chance
      // to load something without throwing error
      return tryAutoDetect()
    }
  } else {
    if(implementation === 'global.Promise'){
      return loadGlobal()
    }

    var lib = require(implementation)
    return {
      Promise: lib.Promise || lib,
      implementation: implementation
    }
  }
}

/**
 * Determines if the global.Promise should be preferred if an implementation
 * has not been registered.
 */
function shouldPreferGlobalPromise(){
  // Versions < 0.11 did not have global Promise
  if(typeof global.Promise !== 'undefined'){
    // do not use for version < 0.12 as version 0.11 contained buggy versions
    var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
    if(version && +version[1] == 0 && +version[2] < 12){
      return false
    }
    return true
  }
  return false
}

/**
 * Loads global.Promise if defined, otherwise returns null
 */
function loadGlobal(){
  if(typeof global.Promise !== 'undefined'){
    return {
      Promise: global.Promise,
      implementation: 'global.Promise'
    }
  }
  return null
}

/**
 * Look for common libs as last resort there is no guarantee that
 * this will return a desired implementation or even be deterministic.
 * The priority is also nearly arbitrary. We are only doing this
 * for older versions of Node.js <0.12 that do not have a reasonable
 * global.Promise implementation and we the user has not registered
 * the preference. This preserves the behavior of any-promise <= 0.1
 * and may be deprecated or removed in the future
 */
function tryAutoDetect(){
  var libs = [
      "es6-promise",
      "promise",
      "native-promise-only",
      "bluebird",
      "rsvp",
      "when",
      "q"]
  var i = 0, len = libs.length
  for(; i < len; i++){
    try {
      return loadImplementation(libs[i])
    } catch(e){}
  }
  return null
}
