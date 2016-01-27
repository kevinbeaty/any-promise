"use strict";
var PROMISE_IMPL = process.env.PROMISE_IMPL,
    undef;

module.exports = (function(){
  var libs;
  if(PROMISE_IMPL !== undef){
    libs = [process.env.PROMISE_IMPL];
  } else {
    libs = [
      "es6-promise",
      "promise",
      "native-promise-only",
      "bluebird",
      "rsvp",
      "when",
      "q"];
  }
  
  // on Node.js:
  // Look for a custom "any-promise" key in the top-level package.json file
  
  if (typeof require !== 'undefined' && PROMISE_IMPL === undef) {
    var packageJSONEntry = null;
    try {
      var appRoot = require('app-root-path') + '';
      var packageJSONEntry = require('pkg-conf').sync('any-promise', {
        cwd: appRoot
      });
    } catch(e) {
      console.error(e);
    }
    
    if (packageJSONEntry && packageJSONEntry.preference) {
      libs = [packageJSONEntry.preference];
    }
  }
  
  var i = 0, len = libs.length, lib;
  for(; i < len; i++){
    try {
      lib = require(libs[i]);
      if(lib.Promise !== undef){
        return lib.Promise;
      }
      return lib;
    } catch(e){}
  }
  if(typeof Promise !== 'undefined'){
    return Promise;
  }
  throw new Error('Must install one of: '+libs.join());
})();
