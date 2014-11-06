"use strict";
var Prom = require('../');

var tests = require('promises-aplus-tests');

function deferred(){
  var resolve, reject;
  var promise = new Prom(function (_resolve, _reject){
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  };
}

function resolved(value){
  var def = deferred();
  def.resolve(value);
  return def.promise;
}

function rejected(reason){
  var def = deferred();
  def.reject(reason);
  return def.promise;
}

tests.mocha({deferred:deferred, resolved:resolved, rejected:rejected});
