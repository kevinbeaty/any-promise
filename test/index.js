'use strict';

var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
    spawn = require('child_process').spawn,
    expectedImpl,
    globalRegistration = true

if(process.env.BROWSER){
  it('Promises/A+ tests in browser', function(done){
    this.timeout(60000)
    zuul('test-browser.js', done)
  })
} else if(process.env.BROWSER_LOCAL){
  it('Promises/A+ tests in browser with local registration', function(done){
    this.timeout(60000)
    zuul('test-browser-local.js', done)
  })
} else if(process.env.BROWSER_POLYFILL){
  it('Promises/A+ tests in browser with polyfill', function(done){
    this.timeout(60000)
    zuul('test-browser-polyfill.js', done)
  })
} else {
  if(process.env.ANY_PROMISE){
    // should load registration regardless
    expectedImpl = process.env.ANY_PROMISE
    require('../register')(expectedImpl)
  } else {
    if(process.env.NODE_LOCAL){
      require('../register')(expectedImpl, {global: false})
      globalRegistration = false
    }
    var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
    if(version && +version[1] == 0 && +version[2] < 12){
      // Node < 0.12 should load first successful require in
      // priority list if not registered
      expectedImpl = 'es6-promise'
    } else {
      // Node >= 0.12 should load global.Promise if not registered
      expectedImpl = 'global.Promise'
    }
  }

  var impl = require('../implementation')
  if(impl !== expectedImpl){
    throw new Error('Expecting '+expectedImpl+' got '+impl)
  }

  if(globalRegistration && impl !== global[REGISTRATION_KEY].implementation){
    throw new Error('Expecting global registration '+expectedImpl)
  }

  if(!globalRegistration && typeof global[REGISTRATION_KEY] !== 'undefined'){
    throw new Error('Expecting local registration')
  }

  console.log('Starting tests with implementation '+impl)
  require('./tests')
}

function zuul(file, done){
  var zuul = spawn('zuul', ['--phantom', '--ui', 'mocha-bdd', '--', 'test/browser.js'], {stdio: 'inherit'})
  zuul.on('close', function (code) {
    if(code !== 0){
      throw new Error('Running tests in browser did not exit successfully.')
    }
    done()
  })
}
