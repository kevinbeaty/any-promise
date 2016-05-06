require('../register/pinkie')
var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var PinkiePromise = require('pinkie')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'pinkie')
  t.is(Promise, PinkiePromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
