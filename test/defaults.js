var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var isPromise = require('is-promise')

test(t => {
  var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
  if(version && +version[1] == 0 && +version[2] < 12){
    // Node < 0.12 should load first successful require in
    // priority list if not registered
    t.is(implementation, 'es6-promise')
  } else {
    // Node >= 0.12 should load global.Promise if not registered
    t.is(implementation, 'global.Promise')
  }
  t.is(Promise, global.Promise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
