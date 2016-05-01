"use strict"
    // global key for user preferred registration
var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
    // Prior registration (preferred or detected)
    registered = null,
    isBrowser = false,
    root = global,
    rootName = 'global'

/**
 * Registers the given implementation.  An implementation must
 * be registered prior to any call to `require("any-promise")`,
 * typically on application load.
 *
 * If called with no arguments, will return registration in
 * following priority:
 *
 * 1. Previous registration
 * 2. global.Promise if node.js version >= 0.12
 * 3. Auto detected promise based on first sucessful require of
 *    known promise libraries. Note this is a last resort, as the
 *    loaded library is non-deterministic. node.js >= 0.12 will
 *    always use global.Promise over this priority list.
 * 4. Throws error.
 */
module.exports = function(browser){
  isBrowser = browser
  if(isBrowser){
    root = window
    rootName = 'window'
  }
  return function register(implementation, opts){
    implementation = implementation || null
    opts = opts || {}
    // global registration unless explicitly  {global: false} in options (default true)
    var registerGlobal = opts.global !== false;

    // load any previous global registration
    if(registered === null && registerGlobal){
      registered = root[REGISTRATION_KEY] || null
    }

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
      if(implementation !== null){
        // use provided implementation
        if(typeof opts.Promise !== 'undefined'){
          registered = {
            Promise: opts.Promise,
            implementation: implementation
          }
        } else {
          // require implementation if implementation is specified but not provided
          registered = loadImplementation(implementation)
        }
      } else if(shouldPreferGlobalPromise()){
        // if no implementation or env specified use global.Promise
        registered = loadGlobal()
      } else {
        // try to auto detect implementation. This is non-deterministic
        // and should prefer other branches, but this is our last chance
        // to load something without throwing error
        if (!isBrowser){
          registered = tryAutoDetect()
        }
      }

      if(registerGlobal){
        // register preference globally in case multiple installations
        root[REGISTRATION_KEY] = registered
      }
    }

    if(registered === null){
      throw new Error('Cannot find any-promise implementation nor'+
        ' global.Promise. You must install polyfill or call'+
        ' require("any-promise/register") with your preferred'+
        ' implementation, e.g. require("any-promise/register")("bluebird")'+
        ' on application load prior to any require("any-promise").')
    }

    return registered
  }
}


/**
 * Determines if the global.Promise should be preferred if an implementation
 * has not been registered.
 *
 */
function shouldPreferGlobalPromise(){
  // Versions < 0.11 did not have global Promise
  if(typeof root.Promise !== 'undefined'){
    if(!isBrowser){
      // do not use for version < 0.12 as version 0.11 contained buggy versions
      var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
      if(version && +version[1] == 0 && +version[2] < 12){
        return false
      }
    }
    return true
  }
  return false
}

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
  if(implementation === rootName + '.Promise'){
    return loadGlobal()
  }

  if(!isBrowser){
    var lib = require(implementation)
    return {
      Promise: lib.Promise || lib,
      implementation: implementation
    }
  }
}

/**
 * Loads global.Promise if defined, otherwise returns null
 */
function loadGlobal(){
  if(typeof root.Promise !== 'undefined'){
    return {
      Promise: root.Promise,
      implementation: rootName + '.Promise'
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
