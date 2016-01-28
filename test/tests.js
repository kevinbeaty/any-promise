"use strict";
var expectedImpl = 'global.Promise'
if(process.env.ANY_PROMISE){
  expectedImpl = process.env.ANY_PROMISE
  require('../register')(expectedImpl)
}

var Prom = require('../');
var tests = require('promises-aplus-tests');
var impl = require('../register')().implementation

if(impl !== expectedImpl){
  throw new Error('Expecting '+expectedImpl+' got '+impl)
}

console.log('Starting tests with implementation '+impl);

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
