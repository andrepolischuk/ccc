
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
  return '#%s';
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
  return color.length > 3 ? 'rgba(%s, %s, %s, %s)' : 'rgb(%s, %s, %s)';
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
  return 'cmyk(%s%, %s%, %s%, %s%)';
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
  return color.length > 3 ? 'hsla(%s, %s%, %s%, %s)' : 'hsl(%s, %s%, %s%)';
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
  return color.length > 3 ? 'hsva(%s, %s%, %s%, %s)' : 'hsv(%s, %s%, %s%)';
};

/**
 * Expose KEY
 */

module.exports.key = {
  keys: ['key'],
  matcher: /^([A-Za-z]+)$/
};

/**
 * Expose KEY format string
 */

 module.exports.key.format = function() {
   return '%s';
 };
