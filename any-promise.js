"use strict";
/* global Symbol */
var PROMISE_EXISTS = typeof Promise !== 'undefined',
    PROMISE_IMPL,
    undef;

if(PROMISE_EXISTS){
  module.exports = Promise;
} else {
  module.exports = (function(){
    function load(){
      var libs;
      if(PROMISE_IMPL === undef && typeof process !== 'undefined' && process.env){
        PROMISE_IMPL = process.env.PROMISE_IMPL;
      }

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
      throw new Error('Must install one of: '+libs.join());
    }
    return load();
  })();
}


