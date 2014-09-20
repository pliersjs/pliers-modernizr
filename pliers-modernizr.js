var modernizr = require('modernizr')
  , fs = require('fs')
  , path = require('path')
  , join = path.join

module.exports = function (pliers, path) {

  pliers('buildModernizr', function (done) {

    fs.readFile(join(pliers.cwd, 'modernizr.json'), function(err, configFile) {
      if (err) {
        pliers.logger.error('No “modernizr.json” config file found.')
        return done(err)
      }

      var config = JSON.parse(configFile)

      if (!config.verbose) config.verbose = false

      modernizr.build(config, function(result) {
        var file = 'modernizr.js'
          , js = result.min

        fs.writeFile(join(path, file), js, 'utf-8', function (err) {
          if (err) {
            pliers.logger.error('Could not write ' + file + ' to ' + path)
            return done(err)
          }

          pliers.logger.info('Successfully generated ' + file)
          done()
        })
      })

    })
  })

}
