
'use strict';

/**
 * Color identify
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {Object}
 * @api public
 */

function identify(r, g, b) {
  if (typeof r === 'number' && arguments.length === 3) {
    return new Color(r, g, b);
  }
}

/**
 * Parse RGB
 * @param  {String} color
 * @return {Object}
 * @api public
 */

identify.rgb = function(color) {

  color = color.replace(/(\s)/g, "").split(',');

  if (color.length !== 3) {
    return;
  }

  return new Color(
    +color[0],
    +color[1],
    +color[2]
  );

};

/**
 * Parse HEX
 * @param  {String} color
 * @return {Object}
 * @api public
 */

identify.hex = function(color) {

  color = color.replace(/(#)/g, "");

  if (color.length !== 6) {
    return;
  }

  return new Color(
    parseInt(color.substr(0, 2), 16),
    parseInt(color.substr(2, 2), 16),
    parseInt(color.substr(4, 2), 16)
  );

};

/**
 * Parse CMYK
 * @param  {String} color
 * @return {Object}
 * @api public
 */

identify.cmyk = function(color) {

  color = color.replace(/(\s)/g, "").split(',');

  if (color.length !== 4) {
    return;
  }

  var k = color[3];

  return new Color(
    255 * (100 - +color[0]) * (100 - +k),
    255 * (100 - +color[1]) * (100 - +k),
    255 * (100 - +color[2]) * (100 - +k)
  );

};

/**
 * Color
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @api private
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
  var ch01 = this.r.toString(16);
  var ch23 = this.g.toString(16);
  var ch45 = this.b.toString(16);
  return [ch01, ch23, ch45].join('');
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
  this.r = this.g = this.b = Math.round(0.299 * this.r
    + 0.587 * this.g + 0.114 * this.b);
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
 * Module exports
 */

module.exports = identify;
