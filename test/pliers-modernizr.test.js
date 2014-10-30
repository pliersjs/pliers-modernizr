var join = require('path').join
  , fs = require('fs')
  , assert = require('assert')
  , createPliers = require('pliers').bind(null, { cwd: __dirname + '/output', logLevel: 'error' })
  , buildModernizr = require('..')
  , rimraf = require('rimraf')
  , async = require('async')

describe('pliers buildModernizr', function () {

  beforeEach(function (done) {
    async.waterfall(
      [ function (cb) {
          fs.exists(join(__dirname, 'output'), function (exists) {
            cb(null, exists)
          })
        }
      , function (exists, cb) {
          if (!exists) return cb(null)
          rimraf(join(__dirname, 'output'), cb)
        }
      ]
      , function () {
        fs.mkdir(join(__dirname, 'output'), done)
      }
    )
  })

  it('should build a Modernizr file using a config file', function (done) {
    this.timeout(5000)

    var pliers = createPliers()

    fs.writeFileSync(join(pliers.cwd, 'modernizr.json'), '{}')
    fs.mkdirSync(join(pliers.cwd, 'js'))

    buildModernizr(pliers, join(pliers.cwd, 'js'))(function () {
      fs.readFile(join(pliers.cwd, 'js', 'modernizr.js'), function (err, data) {
        assert(!err)
        assert(data.length > 1)
        done()
      })
    })

  })

  it('should error with no pliers argument supplied', function () {
    assert.throws(
      function() {
        buildModernizr()
      }
      , 'No pliers argument supplied.'
    )
  })

  it('should error if pliers version can not be detected', function () {
    assert.throws(
      function() {
        var pliers
        buildModernizr(pliers)
      }
      , 'You need pliers >=0.3.4 to use this plugin'
    )
  })

  it('should error with no directory path argument supplied', function () {
    assert.throws(
      function() {
        var pliers = createPliers()
        buildModernizr(pliers)
      }
      , 'No directory path argument supplied.'
    )
  })

  // it('should error with no config file supplied', function () {

  //   var pliers = createPliers()

  //   fs.writeFileSync(join(pliers.cwd, 'modernizr.json'), '{}')
  //   fs.mkdirSync(join(pliers.cwd, 'js'))

  //   buildModernizr(pliers, join(pliers.cwd, 'js'))(function () {
  //     fs.readFile(join(pliers.cwd, 'js', 'modernizr.js'), function (err, data) {
  //       assert(err)
  //       console.log(data)
  //     })
  //   })

  // })

  // it('should error if file could not be created', function (done) {
  //   this.timeout(5000)
  //   var pliers = createPliers()
  //   fs.writeFileSync(join(__dirname, 'modernizr.json'), '{}')
  //   buildModernizr(pliers, join(__dirname, 'js'))
  //   pliers.run('buildModernizr', function(err) {
  //     assert.throws(err, 'Hello')
  //     done()
  //   })
  // })

  afterEach(function (done) {
    rimraf(join(__dirname, 'output'), done)
  })

})
