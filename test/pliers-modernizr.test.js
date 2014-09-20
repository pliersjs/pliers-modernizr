var join = require('path').join
  , fs = require('fs')
  , assert = require('assert')
  , createPliers = require('pliers').bind(null, { cwd: join(__dirname, 'output'), logLevel: 'error' })
  , pliersModernizr = require('..')
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
    pliersModernizr(pliers, join(pliers.cwd, 'js'))

    fs.writeFileSync(join(pliers.cwd, 'modernizr.json'), '{}')
    fs.mkdirSync(join(pliers.cwd, 'js'))

    pliers.run('buildModernizr', function () {
      fs.readFile(join(pliers.cwd, 'js', 'modernizr.js'), function (err, data) {
        assert(!err)
        assert(data.length > 1)
        done()
      })
    })

  })

  it('should error with no config file supplied', function (done) {

    var pliers = createPliers()
    pliersModernizr(pliers, join(pliers.cwd, 'js'))

    pliers.run('buildModernizr', function () {
      assert.throws()
      done()
    })

  })

  // it('should error with no path supplied', function (done) {
  //   done()
  // })

  // it('should error if file could not be created', function (done) {
  //   done()
  // })

  afterEach(function (done) {
    rimraf(join(__dirname, 'output'), done)
  })

})
