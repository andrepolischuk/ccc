
'use strict';

/**
 * Expose Color
 */

module.exports = Color;

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
