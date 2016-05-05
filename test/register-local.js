require('../register')('bluebird', {global: false})
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
  t.falsy(global['@@any-promise/REGISTRATION'])
})
