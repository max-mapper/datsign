# datsign

Sign buffers using a dats private key. Intended for low level testing, doesn't have a super practical use case.

See also: http://github.com/maxogden/dat

## JS

```js
var datsign = require('datsign')
var buf = 'hello'
var opts = {}
var cb = function (err, signature) {
  if (err) throw err
  console.log(signature)
}

datsign(buf, opts, cb)
```

## CLI

```sh
npm i datsign -g
datsign 'hello'
```
