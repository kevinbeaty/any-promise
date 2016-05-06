require('../register')('vow')
var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var VowPromise = require('vow').Promise
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'vow')
  t.is(Promise, VowPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
