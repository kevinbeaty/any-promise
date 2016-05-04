import '../register/native-promise-only'

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var NPOPromise = require('native-promise-only')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'native-promise-only')
  t.is(Promise, NPOPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
