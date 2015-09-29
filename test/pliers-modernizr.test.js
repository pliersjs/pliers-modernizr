var join = require('path').join
  , fs = require('fs')
  , assert = require('assert')
  , rewire = require('rewire')
  , buildModernizr = rewire('../pliers-modernizr')
  , rmdir = require('rimraf')
  , mkdir = require('mkdirp')
  , tempDir = join(__dirname, 'temp')
  , createPliers = require('pliers').bind(null, { cwd: tempDir, logLevel: 'fatal' })

describe('pliers-modernizr', function () {

  beforeEach('create temp directory', function (done) {
    rmdir(tempDir, function () {
      mkdir(tempDir, function () {
        done()
      })
    })
  })

  afterEach(function (done) {
    rmdir(tempDir, done)
  })

  it('should error with no pliers argument supplied', function (done) {
    assert.throws(function () {
      buildModernizr()
    }, /No pliers argument supplied./)
    done()
  })

  it('should error with no directory path argument supplied', function (done) {
    var pliers = createPliers()
    assert.throws(function () {
      pliers('buildSprite', buildModernizr(pliers))
    }, /No directory path argument supplied./)
    done()
  })

  it('should build using a config file in the default location', function (done) {

    var pliers = createPliers()
      , destDir = join(tempDir, 'js')

    fs.writeFileSync(join(tempDir, 'modernizr.json'), '{ "feature-detects": [ "test/svg" ] }')
    fs.mkdirSync(destDir)

    pliers('buildModernizr', buildModernizr(pliers, destDir))
    pliers.run('buildModernizr', function (error) {
      if (error) return done(error)

      fs.readFile(join(destDir, 'modernizr.js'), function (error) {
        assert.equal(error, null, 'File does not exist: modernizr.js')
        done()
      })
    })

  })

  it('should build using a config file in a custom location', function (done) {

    var pliers = createPliers()
      , destDir = join(tempDir, 'js')
      , configDir = join(tempDir, 'foo')
      , configPath = join(configDir, 'modernizr.json')

    fs.mkdirSync(configDir)
    fs.writeFileSync(configPath, '{ "feature-detects": ["test/svg"]}')

    fs.mkdirSync(destDir)

    pliers('buildModernizr', buildModernizr(pliers, destDir, configPath))
    pliers.run('buildModernizr', function (error) {
      if (error) return done(error)

      fs.readFile(join(destDir, 'modernizr.js'), function (err, data) {
        assert(!err)
        assert(data.length > 1)
        done()
      })
    })

  })

  it('should error with no config file found', function (done) {

    var pliers = createPliers()
      , destDir = join(tempDir, 'js')

    fs.mkdirSync(destDir)

    pliers('buildModernizr', buildModernizr(pliers, destDir, 'fake/config/path'))
    pliers.run('buildModernizr', function (error) {
      assert.equal(error.message, 'Modernizr config file not found.')
      done()
    })

  })

  it('should error if compiled file could not be written', function (done) {

    var pliers = createPliers()
      , destDir = join(tempDir, 'js')
      , mockFs = { writeFile: writeFile, readFile: fs.readFile }
      , destroy = buildModernizr.__set__('fs', mockFs)

    function writeFile (filename, data, options, callback) {
      return callback(new Error('Compiled Modernizr file could not be written.'))
    }

    fs.writeFileSync(join(tempDir, 'modernizr.json'), '{ "feature-detects": [ "test/svg" ] }')
    fs.mkdirSync(destDir)

    pliers('buildModernizr', buildModernizr(pliers, destDir))
    pliers.run('buildModernizr', function (error) {
      assert.equal(error.message, 'Compiled Modernizr file could not be written.')
      destroy()
      done()
    })

  })

})
