# pliers-modernizr

Build a modular Modernizr file using a custom config

[![build status](https://secure.travis-ci.org/pliersjs/pliers-modernizr.png)](http://travis-ci.org/pliersjs/pliers-modernizr)

## Installation

    npm install pliers-modernizr

## Usage

`pliersModernizr(pliers, path)`

`path` should be the directory where a `modernizr.js` file will be built.

A `modernizr.json` must exist in the pliers current working directory. This
should contain all the options required for building a custom Modernizr file.

Reference: [https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)

Example:
```
{
  "classPrefix": "",
  "options": [
    "setClasses",
    "testProp"
  ],
  "feature-detects": [
    "test/css/mediaqueries",
    "test/svg"
  ]
}
```

### Note

The Modernizr build will display warnings about various Grunt modules being
installed. Once Modernizr 3.0 is officially released as an npm module, these
should be gone. For now they can be safely ignored.


## Credits
[Jack Brewer](https://github.com/jackbrewer)

[Pedro Velentim](https://github.com/pvalentim)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
