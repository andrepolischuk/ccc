
'use strict';

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
    case typeof color === 'object' && 'hex' in color:
      return hex(color.hex);
    case rgb.matcher.test(color):
      return rgb.apply(null, rgb.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'r' in color:
      return rgb(color.r, color.g, color.b, color.a);
    case cmyk.matcher.test(color):
      return cmyk.apply(null, cmyk.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'c' in color:
      return cmyk(color.c, color.m, color.y, color.k);
  }
};

/**
 * Expose hex parser
 */

module.exports.hex = hex;

/**
 * Hex parser
 * @param  {String} str
 * @return {Object}
 * @api public
 */

function hex(str) {
  str += str.length < 6 ? str : '';
  return new Color(
    parseInt(str.substr(0, 2), 16),
    parseInt(str.substr(2, 2), 16),
    parseInt(str.substr(4, 2), 16)
  );
};

/**
 * Hex matcher
 */

hex.matcher = /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i;

/**
 * Expose rgb parser
 */

module.exports.rgb = rgb;

/**
 * Rgb parser
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Object}
 * @api public
 */

function rgb(r, g, b, a) {
  if (typeof r === 'string' && !g) {
    r = r.replace(/(\s)/g, '').split(',');
    a = r[3];
    b = r[2];
    g = r[1];
    r = r[0];
  }

  return new Color(
    parseInt(r),
    parseInt(g),
    parseInt(b),
    parseInt(a)
  );
};

/**
 * Rgb matcher
 */

rgb.matcher = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/;

/**
 * Expose cmyk parser
 */

module.exports.cmyk = cmyk;

/**
 * Cmyk parser
 * @param  {Number} c
 * @param  {Number} m
 * @param  {Number} y
 * @param  {Number} k
 * @return {Object}
 * @api public
 */

function cmyk(c, m, y, k) {
  if (typeof c === 'string' && !m) {
    c = c.replace(/(\s)/g, '').split(',');
    k = c[3];
    y = c[2];
    m = c[1];
    c = c[0];
  }

  return new Color(
    255 * (100 - parseInt(c)) * (100 - parseInt(k)) / 10000,
    255 * (100 - parseInt(m)) * (100 - parseInt(k)) / 10000,
    255 * (100 - parseInt(y)) * (100 - parseInt(k)) / 10000
  );
};

/**
 * Cmyk matcher
 */

cmyk.matcher = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

/**
 * Color
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @api public
 */

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

/**
 * Convert to RGB
 * @return {String}
 * @api public
 */

Color.prototype.rgb = function() {
  return [this.r, this.g, this.b].join(', ');
};

/**
 * Convert to HEX
 * @return {String}
 * @api public
 */

Color.prototype.hex = function() {
  var hex = [this.r.toString(16), this.g.toString(16), this.b.toString(16)];
  for (var i = 0; i < hex.length; i++) {
    hex[i] += hex[i].length < 2 ? '0' : '';
  }
  return hex.join('');
};

/**
 * Convert to CMYK
 * @return {String}
 * @api public
 */

Color.prototype.cmyk = function() {
  var k = 1 - (Math.max(this.r, this.g, this.b) / 255);
  var c = (1 - (this.r / 255) - k) / (1 - k) || 0;
  var m = (1 - (this.g / 255) - k) / (1 - k) || 0;
  var y = (1 - (this.b / 255) - k) / (1 - k) || 0;
  return [c, m, y, k].join(', ');
};

/**
 * To grayscale
 * @return {Object}
 * @api public
 */

Color.prototype.grayscale = function() {
  this.r = this.g = this.b =
    Math.round(0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
  return this;
};

/**
 * Invert color
 * @return {Object}
 * @api public
 */

Color.prototype.invert = function() {
  this.r = 255 - this.r;
  this.g = 255 - this.g;
  this.b = 255 - this.b;
  return this;
};

/**
 * Average color
 * @param  {Object} color
 * @return {Object}
 * @api public
 */

Color.prototype.average = function(color) {
  this.r = Math.round((this.r + color.r) / 2);
  this.g = Math.round((this.g + color.g) / 2);
  this.b = Math.round((this.b + color.b) / 2);
  return this;
}
