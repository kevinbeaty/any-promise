require('../register')('bluebird')
var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var BluebirdPromise = require('bluebird')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'bluebird')
  t.is(Promise, BluebirdPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
