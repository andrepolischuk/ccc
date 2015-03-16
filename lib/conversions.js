
'use strict';

/**
 * Math.abs ref
 */

var abs = Math.abs;

/**
 * Expose HEX to RGB
 * @param  {String} str
 * @return {Array}
 * @api private
 */

module.exports.hex2rgb = function(str) {
  str += str.length < 6 ? str : '';

  var r = parseInt(str.substr(0, 2), 16);
  var g = parseInt(str.substr(2, 2), 16);
  var b = parseInt(str.substr(4, 2), 16);

  return [r, g, b];
};

/**
 * Expose CMYK to RGB
 * @param  {Number} c
 * @param  {Number} m
 * @param  {Number} y
 * @param  {Number} k
 * @return {Array}
 * @api private
 */

module.exports.cmyk2rgb = function(c, m, y, k) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;

  var r = 255 * (1 - c) * (1 - k);
  var g = 255 * (1 - m) * (1 - k);
  var b = 255 * (1 - y) * (1 - k);

  return [r, g, b];
};

/**
 * Expose HSL to RGB
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} l
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.hsl2rgb = function(h, s, l, a) {
  h /= 60;
  s /= 100;
  l /= 100;
  a = +a || a;

  var c = 255 * (1 - abs((2 * l) - 1)) * s;
  var x = c * (1 - abs((h % 2) - 1));
  var m = (255 * l) - (c / 2);
  var hi = Math.floor(h) % 6;

  c += m;
  x += m;

  switch (hi) {
    case 0: return [c, x, m, a];
    case 1: return [x, c, m, a];
    case 2: return [m, c, x, a];
    case 3: return [m, x, c, a];
    case 4: return [x, m, c, a];
    case 5: return [c, m, x, a];
  }
};

/**
 * Expose HSV to RGB
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} v
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.hsv2rgb = function(h, s, v, a) {
  h /= 60;
  s /= 100;
  v /= 100;
  a = +a || a;

  var c = 255 * v * s;
  var x = c * (1 - abs((h % 2) - 1));
  var m = 255 * v - c;
  var hi = Math.floor(h) % 6;

  c += m;
  x += m;

  switch (hi) {
    case 0: return [c, x, m, a];
    case 1: return [x, c, m, a];
    case 2: return [m, c, x, a];
    case 3: return [m, x, c, a];
    case 4: return [x, m, c, a];
    case 5: return [c, m, x, a];
  }
};

/**
 * Expose RGB to HEX
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {Array}
 * @api private
 */

module.exports.rgb2hex = function(r, g, b) {
  var str = [
    parseInt(r).toString(16),
    parseInt(g).toString(16),
    parseInt(b).toString(16)
  ];

  for (var i = 0; i < str.length; i++) {
    str[i] += str[i].length < 2 ? '0' : '';
  }

  return [str.join('')];
};

/**
 * Expose RGB to CMYK
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {Array}
 * @api private
 */

module.exports.rgb2cmyk = function(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  var k = 1 - Math.max(r, g, b);
  var c = (1 - r - k) / (1 - k) || 0;
  var m = (1 - g - k) / (1 - k) || 0;
  var y = (1 - b - k) / (1 - k) || 0;

  c *= 100;
  m *= 100;
  y *= 100;
  k *= 100;

  return [c, m, y, k];
};

/**
 * Expose RGB to HSL
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.rgb2hsl = function(r, g, b, a) {
  r /= 255;
  g /= 255;
  b /= 255;
  a = +a || a;

  var cMax = Math.max(r, g, b);
  var cMin = Math.min(r, g, b);
  var delta = cMax - cMin;
  var l = (cMax + cMin) / 2;
  var h = 0;

  switch (true) {
    case delta === 0: break;
    case cMax === r: h = 60 * (((g - b) / delta) % 6); break;
    case cMax === g: h = 60 * (((b - r) / delta) + 2); break;
    case cMax === b: h = 60 * (((r - b) / delta) + 4); break;
  }

  var s = delta === 0 ? 0 : delta / (1 - abs(2 * l - 1)) * 100;
  l *= 100;

  return [h, s, l, a];
};

/**
 * Expose RGB to HSV
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.rgb2hsv = function(r, g, b, a) {
  r /= 255;
  g /= 255;
  b /= 255;
  a = +a || a;

  var cMax = Math.max(r, g, b);
  var cMin = Math.min(r, g, b);
  var delta = cMax - cMin;
  var h = 0;

  switch (true) {
    case delta === 0: break;
    case cMax === r: h = 60 * (((g - b) / delta) % 6); break;
    case cMax === g: h = 60 * (((b - r) / delta) + 2); break;
    case cMax === b: h = 60 * (((r - b) / delta) + 4); break;
  }

  var s = cMax === 0 ? 0 : delta / cMax * 100;
  var v = cMax * 100;

  return [h, s, v, a];
};
