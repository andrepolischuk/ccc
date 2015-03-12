
'use strict';

/**
 * Parsers
 */

var hex = require('./lib/hex');
var rgb = require('./lib/rgb');
var cmyk = require('./lib/cmyk');

/**
 * Expose parser
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color) {
  switch (true) {
    case hex.matcher.test(color):
      return hex.apply(null, hex.matcher.exec(color).splice(1));
    case rgb.matcher.test(color):
      return rgb.apply(null, rgb.matcher.exec(color).splice(1));
    case cmyk.matcher.test(color):
      return cmyk.apply(null, cmyk.matcher.exec(color).splice(1));
  }
};

/**
 * Expose hex parser
 */

module.exports.hex = hex;

/**
 * Expose rgb parser
 */

module.exports.rgb = rgb;

/**
 * Expose cmyk parser
 */

module.exports.cmyk = cmyk;
