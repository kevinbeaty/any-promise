require('es6-promise').polyfill()

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var isPromise = require('is-promise')

test(t => {
  // The implementation will either be global.Promise or es6-promise
  // depending on node version. This is a bit of a hack for this test
  // but works as test because es6-promise is first successfull require
  // and we polyfilled with es6-promise
  t.is(Promise, global.Promise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
