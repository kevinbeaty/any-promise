'use strict';
window.Promise = undefined
var assert = require('assert')

it('Optional test in browser', function(){
  var Promise = require('../optional')
  assert.ok(!Promise)
  assert.throws(function(){
    var Promise = require('../')
  }, 'Expecting bare require to throw ');
  Promise = require('../optional')
  assert.ok(!Promise)
})
