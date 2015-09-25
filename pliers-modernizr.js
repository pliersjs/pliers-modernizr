var modernizr = require('modernizr')
  , fs = require('fs')
  , path = require('path')
  , join = path.join
  , uglify = require('uglify-js')

module.exports = function (pliers, dirPath, configPath) {

  // Check supplied arguments
  if (!pliers) throw new Error('No pliers argument supplied.')
  if (!dirPath) throw new Error('No directory path argument supplied.')

  if (!configPath) {
    configPath = pliers.cwd + '/modernizr.json'
  }

  return function (done) {

    fs.readFile(configPath, function(err, configFile) {
      if (err) return done(new Error('Modernizr config file not found.'))

      var config = JSON.parse(configFile)

      modernizr.build(config, function(result) {

        var file = 'modernizr.js'
          , resultMinified = uglify.minify(result, { fromString: true })

        pliers.mkdirp(dirPath)

        fs.writeFile(join(dirPath, file), resultMinified.code, 'utf-8', function (err) {
          if (err) done(new Error('Compiled Modernizr file could not be written.'))

          pliers.logger.info('Successfully built ' + file)
          done()
        })

      })
    })
  }
}
