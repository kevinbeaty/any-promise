import '../register/when'

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var WhenPromise = require('when').Promise
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'when')
  t.is(Promise, WhenPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
