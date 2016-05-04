import '../register/promise'

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var PromisePromise = require('promise')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'promise')
  t.is(Promise, PromisePromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
