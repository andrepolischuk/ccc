
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
 * Expose HEX parser
 */

module.exports.hex = hex;

/**
 * HEX parser
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
 * HEX matcher
 */

hex.matcher = /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i;

/**
 * Expose RGB parser
 */

module.exports.rgb = rgb;

/**
 * RGB parser
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Object}
 * @api public
 */

function rgb(r, g, b, a) {
  return new Color(
    parseInt(r),
    parseInt(g),
    parseInt(b),
    parseFloat(a)
  );
};

/**
 * RGB matcher
 */

rgb.matcher = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/;

/**
 * Expose CMYK parser
 */

module.exports.cmyk = cmyk;

/**
 * CMYK parser
 * @param  {Number} c
 * @param  {Number} m
 * @param  {Number} y
 * @param  {Number} k
 * @return {Object}
 * @api public
 */

function cmyk(c, m, y, k) {
  return new Color(
    255 * (100 - parseInt(c)) * (100 - parseInt(k)) / 1e4,
    255 * (100 - parseInt(m)) * (100 - parseInt(k)) / 1e4,
    255 * (100 - parseInt(y)) * (100 - parseInt(k)) / 1e4
  );
};

/**
 * CMYK matcher
 */

cmyk.matcher = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

/**
 * Color
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @api public
 */

function Color(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

/**
 * Convert to HEX object
 * @return {Object}
 * @api public
 */

Color.prototype.hex = function() {
  var str = [
    this.r.toString(16),
    this.g.toString(16),
    this.b.toString(16)
  ];

  for (var i = 0; i < str.length; i++) {
    str[i] += str[i].length < 2 ? '0' : '';
  }

  return {hex: str.join('')};
};

/**
 * Convert to HEX string
 * @return {String}
 * @api public
 */

Color.prototype.hexString = function() {
  return '#' + this.hex().hex;
};

/**
 * Convert to RGB object
 * @return {Object}
 * @api public
 */

Color.prototype.rgb = function() {
  var obj = {};
  obj.r = this.r;
  obj.g = this.g;
  obj.b = this.b;

  if (this.a) {
    obj.a = this.a;
  }

  return obj;
};

/**
 * Convert to RGB string
 * @return {String}
 * @api public
 */

Color.prototype.rgbString = function() {
  var obj = this.rgb();

  var str = [
    obj.r,
    obj.g,
    obj.b
  ];

  if (obj.a) {
    str.push(obj.a);
  }

  return cssString(
    obj.a ? 'rgba' : 'rgb',
    str.join(', ')
  );
};

/**
 * Convert to CMYK object
 * @return {Object}
 * @api public
 */

Color.prototype.cmyk = function() {
  var obj = {};
  obj.k = 1 - (Math.max(this.r, this.g, this.b)) / 255;
  obj.c = (1 - (this.r / 255) - obj.k) / (1 - obj.k) * 100 || 0;
  obj.m = (1 - (this.g / 255) - obj.k) / (1 - obj.k) * 100 || 0;
  obj.y = (1 - (this.b / 255) - obj.k) / (1 - obj.k) * 100 || 0;
  obj.k *= 100;
  return obj;
};

/**
 * Convert to CMYK string
 * @return {String}
 * @api public
 */

Color.prototype.cmykString = function() {
  var obj = this.cmyk();

  var str = [
    obj.c + '%',
    obj.m + '%',
    obj.y + '%',
    obj.k + '%'
  ];

  return cssString(
    'cmyk',
    str.join(', ')
  );
};

/**
 * To grayscale
 * @return {Object}
 * @api public
 */

Color.prototype.grayscale = function() {
  this.r = this.g = this.b = Math.round(
    0.299 * this.r +
    0.587 * this.g +
    0.114 * this.b
  );
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
};

/**
 * CSS string
 * @param  {String} prefix
 * @param  {String} str
 * @return {String}
 * @api private
 */

function cssString(prefix, str) {
  return prefix + '(' + str + ')';
}
