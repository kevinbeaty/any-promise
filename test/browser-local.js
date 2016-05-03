'use strict';
var REGISTRATION_KEY = '@@any-promise/REGISTRATION'

require('../register')('es6-promise', {Promise: require('es6-promise').Promise, global: false})


if(typeof window[REGISTRATION_KEY] !== 'undefined'){
  throw new Error('Expecting local registration')
}

var impl = require('../implementation')
if(impl !== 'es6-promise'){
  throw new Error('Implementation not expected: '+impl)
}

require('./tests')
