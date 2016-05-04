'use strict';
require('../register')('es6-promise', {Promise: require('es6-promise').Promise, global: false})

var REGISTRATION_KEY = '@@any-promise/REGISTRATION'
var Promise = require('..')
var implementation = require('../implementation')
var isPromise = require('is-promise')

it('Register local test in browser', function(){
  if(!isPromise(new Promise(noop))){
    throw new Error('Promise not exported')
  }
  if(typeof window[REGISTRATION_KEY] !== 'undefined'){
    throw new Error('Expecting local registration')
  }

  if(implementation !== 'es6-promise'){
    throw new Error('Implementation not expected: '+impl)
  }
})

function noop(){}
