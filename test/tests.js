"use strict";
var expectedImpl
if(process.env.ANY_PROMISE){
  // should load registration regardless
  expectedImpl = process.env.ANY_PROMISE
  require('../register')(expectedImpl)
} else if(process.env.PROMISE_IMPL){
  // should load implementation specified by env variable
  expectedImpl = process.env.PROMISE_IMPL
} else {
  var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
  if(version && +version[1] == 0 && +version[2] < 12){
    // Node <0.12 should load first successful require in
    // priority list if not registered and no PROMISE_IMPL
    expectedImpl = 'es6-promise'
  } else {
    // Node >= 0.12 should load global.Promise
    // if not registered and no PROMISE_IMPL
    expectedImpl = 'global.Promise'
  }
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
