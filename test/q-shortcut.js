import '../register/q'

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var QPromise = require('q').Promise
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'q')
  t.is(Promise, QPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
