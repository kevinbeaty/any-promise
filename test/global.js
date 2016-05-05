if(typeof global.Promise === 'undefined'){
  require('es6-promise').polyfill()
}
require('../register')('global.Promise')

var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'global.Promise')
  t.is(Promise, global.Promise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
