import '../register/es6-promise'

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var ES6Promise = require('es6-promise').Promise
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'es6-promise')
  t.is(Promise, ES6Promise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
