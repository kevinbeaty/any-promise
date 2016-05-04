'use strict';
require('../register/bluebird')

var REGISTRATION_KEY = '@@any-promise/REGISTRATION'
var Promise = require('..')
var implementation = require('../implementation')
var isPromise = require('is-promise')

it('Shortcut test in browser', function(){
  if(!isPromise(new Promise(noop))){
    throw new Error('Promise not exported')
  }
  if(implementation !== 'bluebird'){
    throw new Error('Expecting bluebird as implementation')
  }

  if(window[REGISTRATION_KEY].implementation !== 'bluebird'){
    throw new Error('Expecting global registration')
  }
})

function noop(){}
