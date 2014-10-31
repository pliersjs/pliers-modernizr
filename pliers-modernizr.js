var modernizr = require('modernizr')
  , fs = require('fs')
  , path = require('path')
  , join = path.join

module.exports = function (pliers, dirPath) {

  // Check supplied arguments
  if (!pliers) throw new Error('No pliers argument supplied.')
  if (!pliers.version) throw new Error('You need pliers >=0.3.4 to use this plugin')
  if (!dirPath) throw new Error('No directory path argument supplied.')

  return function (done) {

    fs.readFile(join(pliers.cwd, 'modernizr.json'), function(err, configFile) {
      if (err) return done(err)

      var config = JSON.parse(configFile)

      if (!config.verbose)
        config.verbose = false

      pliers.logger.info('Any following Grunt errors can be ignored until Modernizr 3.0 moves to npm.')
      modernizr.build(config, function(result) {
        var file = 'modernizr.js'
          , js = result.min

        pliers.mkdirp(dirPath)

        fs.writeFile(join(dirPath, file), js, 'utf-8', function (err) {
          if (err) return done(err)

          pliers.logger.info('Successfully generated ' + file)
          done()
        })
      })

    })
  }

}
