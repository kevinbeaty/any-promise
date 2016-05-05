var test = require('ava')
var Promise = require('../optional')
var isPromise = require('is-promise')

test(t => {
  // optional should always be defined based on current setup.
  t.is(Promise, global.Promise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
