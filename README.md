## Any Promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/any-promise.svg)](http://travis-ci.org/kevinbeaty/any-promise)

Let your library support any ES6 compatible Promise library or polyfill and leave the choice to the end user. The end user can install a polyfill or `npm install` and register their preference before using this library and the installed library will be automatically detected.

If no library is registered, attempts to export the global `Promise` (native or polyfill). The `browserify` version will always export the global `Promise`, so polyfill as necessary.

### Registration

If the global Promise is not desired, an end user can register the Promise implementation of choice on application startup (before any call to `require('any-promise')`:

```javascript
require('any-promise/register')('bluebird')
// -or- require('any-promise/register')('es6-promise')
// -or- require('any-promise/register')('native-promise-only')
// -or- require('any-promise/register')('bluebird')
// -or- require('any-promise/register')('rsvp')
// -or- require('any-promise/register')('when')
// -or- require('any-promise/register')('q')
// -or- require('any-promise/register')('any other ES6 compatible library')
```

NOTE: The end user MUST register the preference before any call to `require('any-promise')`, and only one implementation can be registered. Typically this registration could occur at the top of the application entry point.

Registration is not required for Node.js version >= 0.12 as a native global Promise implementation is included.  If no preference is registered, the global Promise will be used.


### Usage

Libraries using `any-promise` should only use documented ES6 compatible functions as there is no guarantee which implementation will be chosen by the end user.

```javascript
var Promise = require('any-promise');

return Promise
  .all([xf, f, init, coll])
  .then(fn);


return new Promise(function(resolve, reject){
  try {
    resolve(item);
  } catch(e){
    reject(e);
  }
});

```
