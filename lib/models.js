
'use strict';

/**
 * Expose HEX
 */

module.exports.hex = {
  keys: ['hex'],
  matcher: /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i
};

/**
 * Expose HEX format string
 */

module.exports.hex.format = function() {
  return '#:hex';
};

/**
 * Expose RGB
 */

module.exports.rgb = {
  keys: 'rgba',
  matcher: /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/
};

/**
 * Expose RGB format string
 */

module.exports.rgb.format = function(color) {
  return color.length > 3 ? 'rgba(:r, :g, :b, :a)' : 'rgb(:r, :g, :b)';
};

/**
 * Expose CMYK
 */

module.exports.cmyk = {
  keys: 'cmyk',
  matcher: /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
};

/**
 * Expose CMYK format string
 */

module.exports.cmyk.format = function() {
  return 'cmyk(:c%, :m%, :y%, :k%)';
};

/**
 * Expose HSL
 */

module.exports.hsl = {
  keys: 'hsla',
  matcher: /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/
};

/**
 * Expose HSL format string
 */

module.exports.hsl.format = function(color) {
  return color.length > 3 ? 'hsla(:h, :s%, :l%, :a)' : 'hsl(:h, :s%, :l%)';
};

/**
 * Expose HSV
 */

module.exports.hsv = {
  keys: 'hsva',
  matcher: /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/
};

/**
 * Expose HSV format string
 */

module.exports.hsv.format = function(color) {
  return color.length > 3 ? 'hsva(:h, :s%, :v%, :a)' : 'hsv(:h, :s%, :v%)';
};

/**
 * Expose KEYWORD
 */

module.exports.keyword = {
  keys: ['keyword'],
  matcher: /^([A-Za-z]+)$/
};

/**
 * Expose KEYWORD format string
 */

 module.exports.keyword.format = function() {
   return ':keyword';
 };
