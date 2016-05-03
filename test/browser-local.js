'use strict';
var REGISTRATION_KEY = '@@any-promise/REGISTRATION'

require('../register')('my-when', {Promise: require('when').Promise, global: false})

if(typeof window[REGISTRATION_KEY] !== 'undefined'){
  throw new Error('Expecting local registration')
}

require('./tests')
