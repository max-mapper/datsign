#!/usr/bin/env node
var sleepdat = require('./index.js')
var str = process.argv[2]
if (!str) {
  console.error('Usage: datsign some-value-to-sign\n(Must be in a dat folder for it to work)')
  process.exit(1)
}

sleepdat(new Buffer(str), function (err, sig) {
  if (err) {
    console.error(err.message)
    process.exit(1)
  }
  console.log(sig.toString('hex'))
})