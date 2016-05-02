'use strict';

var spawn = require('child_process').spawn;
var expectedImpl;

if(process.env.BROWSER){
  it('Promises/A+ tests in browser', function (done) {
    this.timeout(30000)
    var zuul = spawn('zuul', ['--phantom', '--ui', 'mocha-bdd', '--', 'test/browser.js'], {stdio: 'inherit'});
    zuul.on('close', function (code) {
      if(code !== 0){
        throw new Error('Running tests in browser did not exit successfully.');
      }
      done();
    });
  });
} else {
  if(process.env.ANY_PROMISE){
    // should load registration regardless
    expectedImpl = process.env.ANY_PROMISE
    require('../register')(expectedImpl)
  } else {
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
  console.log('Starting tests with implementation '+impl);
  require('./tests');
}
