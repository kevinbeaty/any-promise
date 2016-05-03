'use strict';

var REGISTRATION_KEY = '@@any-promise/REGISTRATION'
require('es6-promise').polyfill()

if(window[REGISTRATION_KEY].implementation !== 'window.Promise'){
  throw new Error('Expecting global registration')
}

require('./tests')
