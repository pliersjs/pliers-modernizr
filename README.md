# [pliers](https://pliersjs.github.io/)-modernizr

Use Pliers to build a modular Modernizr file using a custom config.

[![build status](https://secure.travis-ci.org/pliersjs/pliers-modernizr.png)](http://travis-ci.org/pliersjs/pliers-modernizr)

## Installation

```
npm install pliers-modernizr --save
```

## Usage

Within a `pliers.js` file:

```
module.exports = function(pliers) {
  pliers('buildModernizr', require('pliers-modernizr')(pliers, 'path'))
}
```

Then from the CLI:

```
pliers buildModernizr
```

`path` should be the directory where a `modernizr.js` file will be built.

A `modernizr.json` should exist in the pliers current working directory. This
should contain all the options required for building a custom Modernizr file.
Alternatively, a path to a custom config file can be passed as a third argument.

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
    "css/mediaqueries",
    "svg"
  ]
}
```

## Upgrading from 0.x.x to 1.x.x

Modernizr changed the format of their config `feature-detects`, so if upgrading an existing project you will likely need to [match the new naming convention](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) (for example, from `test/css/mediaqueries` to `css/mediaqueries`)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
