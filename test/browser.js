var test = require('ava')
var Promise = require('..')
var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
var {spawn} = require('child_process')

if (+version[1] <= 5) {
  test('skipped browser tests for Node.js <= 5', () => {})
} else {
  ;['register', 'local', 'polyfill', 'shortcut'].forEach(filename => {
    test.serial('Browser test: '+filename, () => zuul(filename))
  })
}

function zuul(file){
  return new Promise((resolve, reject) => {
    var zuul = spawn(
      'zuul',
      ['--phantom', '--ui', 'mocha-bdd', '--', '../test-browser/'+file+'.js'],
      {stdio: 'inherit'})

    zuul.on('error', (err) => reject(err))
    zuul.on('close', (code, err) => {
      if(code !== 0){
        reject('Zuul did not exit successfully '+code)
      } else {
        resolve()
      }
    })
  })
}
