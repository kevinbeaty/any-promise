require('../register/lie')
var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var LiePromise = require('lie')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'lie')
  t.is(Promise, LiePromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
