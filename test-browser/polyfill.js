'use strict';
require('es6-promise').polyfill()

var REGISTRATION_KEY = '@@any-promise/REGISTRATION'
var Promise = require('..')
var implementation = require('../implementation')
var isPromise = require('is-promise')

it('Polyfill test in browser', function(){
  if(!isPromise(new Promise(noop))){
    throw new Error('Promise not exported')
  }
  if(implementation !== 'window.Promise'){
    throw new Error('Expecting window.Promise as implementation')
  }

  if(window[REGISTRATION_KEY].implementation !== 'window.Promise'){
    throw new Error('Expecting global registration')
  }
})

function noop(){}
