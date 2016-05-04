require('../register')('rsvp')
var test = require('ava')
var implementation = require('../implementation')
var Promise = require('..')
var RSVPPromise = require('rsvp').Promise
var isPromise = require('is-promise')

test(t => {
  t.is(implementation, 'rsvp')
  t.is(Promise, RSVPPromise)
  t.truthy(isPromise(new Promise(() => {})))
  t.truthy(Promise.all)
  t.truthy(global['@@any-promise/REGISTRATION'].implementation)
})
