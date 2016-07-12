var path = require('path')
var hypercore = require('hypercore')
var level = require('level')
var encoding = require('dat-encoding')
var signatures = require('sodium-signatures')

module.exports = function (buf, opts, cb) {
  if (!buf) return cb(new Error('Must pass buffer to sign'))
  if (!cb) {
    cb = opts
    opts = {}
  }
  var datPath = path.join(opts.dir || process.cwd(), '.dat')
  var db = level(datPath, {createIfMissing: false}, function (err) {
    if (err && err.type === "OpenError") return cb(new Error('No dat here'))
    if (err) return cb(err)
    db.get('!dat!key', function (err, value) {
      if (err) return cb(err)
      if (!value) return new Error('No dat here')
      var key = encoding.decode(value)
      
      var core = hypercore(db)
      var feed = core.createFeed(key)
      feed.open(function () {
        var secret = feed.secretKey
        if (!secret) return cb(new Error('No secret key found here'))
        cb(null, signatures.sign(buf, secret))
      })
    })  
  })
}