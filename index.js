
'use strict';

/**
 * Expose parser
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color) {
  switch (true) {
    // hex
    case hex.matcher.test(color):
      return hex.apply(null, hex.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'hex' in color:
      return hex(color.hex);
    // rgb
    case rgb.matcher.test(color):
      return rgb.apply(null, rgb.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'r' in color:
      return rgb(color.r, color.g, color.b, color.a);
    // cmyk
    case cmyk.matcher.test(color):
      return cmyk.apply(null, cmyk.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'c' in color:
      return cmyk(color.c, color.m, color.y, color.k);
    // hsl
    case hsl.matcher.test(color):
      return hsl.apply(null, hsl.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'l' in color:
      return hsl(color.h, color.s, color.l, color.a);
    // hsv
    case hsv.matcher.test(color):
      return hsv.apply(null, hsv.matcher.exec(color).splice(1));
    case typeof color === 'object' && 'v' in color:
      return hsv(color.h, color.s, color.v, color.a);
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
}

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
    parseFloat(a) || a
  );
}

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
}

/**
 * CMYK matcher
 */

cmyk.matcher = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

/**
 * Expose HSL parser
 */

module.exports.hsl = hsl;

/**
 * HSL parser
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} l
 * @param  {Number} a
 * @return {Object}
 * @api public
 */

function hsl(h, s, l, a) {
  var c = (1 - Math.abs((2 * parseInt(l) / 100) - 1)) * parseInt(s) / 100;
  var x = c * (1 - Math.abs(((parseInt(h) / 60) % 2) - 1));
  var m = parseInt(l) / 100 - c / 2;
  var rgb = hsxParams2rgb(h, c, x, m);

  return new Color(
    rgb[0],
    rgb[1],
    rgb[2],
    parseFloat(a) || a
  );
}

/**
 * HSL matcher
 */

hsl.matcher = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;

/**
 * Expose HSV parser
 */

module.exports.hsv = hsv;

/**
 * HSV parser
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} v
 * @param  {Number} a
 * @return {Object}
 * @api public
 */

function hsv(h, s, v, a) {
  var c = parseInt(v) * parseInt(s) / 1e4;
  var x = c * (1 - Math.abs(((parseInt(h) / 60) % 2) - 1));
  var m = parseInt(v) / 100 - c;
  var rgb = hsxParams2rgb(h, c, x, m);

  return new Color(
    rgb[0],
    rgb[1],
    rgb[2],
    parseFloat(a) || a
  );
}

/**
 * HSV matcher
 */

hsv.matcher = /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;

/**
 * HS* parser
 * @param  {Number} h
 * @param  {Number} c
 * @param  {Number} x
 * @param  {Number} m
 * @return {Array}
 * @api private
 */

function hsxParams2rgb(h, c, x, m) {
  var rgb;

  switch (true) {
    case h >= 0 && h < 60:
      rgb = [c, x, 0];
      break;
    case h >= 60 && h < 120:
      rgb = [x, c, 0];
      break;
    case h >= 120 && h < 180:
      rgb = [0, c, x];
      break;
    case h >= 180 && h < 240:
      rgb = [0, x, c];
      break;
    case h >= 240 && h < 300:
      rgb = [x, 0, c];
      break;
    case h >= 300 && h < 360:
      rgb = [c, 0, x];
      break;
  }

  for (var i = 0; i < rgb.length; i++) {
    rgb[i] += m;
    rgb[i] *= 255;
  }

  return rgb;
}

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
 * Convert to HSL object
 * @return {Object}
 * @api public
 */

Color.prototype.hsl = function() {
  var params = rgb2hsxParams(
    this.r,
    this.g,
    this.b
  );

  var l = (params.cMax + params.cMin) / 2;

  var obj = {};
  obj.h = params.h;
  obj.s = params.delta === 0 ? 0 :
    params.delta / (1 - Math.abs(2 * l - 1)) * 100;
  obj.l = l * 100;

  if (this.a) {
    obj.a = this.a;
  }

  return obj;
};

/**
 * Convert to HSL string
 * @return {String}
 * @api public
 */

Color.prototype.hslString = function() {
  var obj = this.hsl();

  var str = [
    obj.h,
    obj.s + '%',
    obj.l + '%'
  ];

  if (obj.a) {
    str.push(obj.a);
  }

  return cssString(
    obj.a ? 'hsla' : 'hsl',
    str.join(', ')
  );
};

/**
 * Convert to HSV object
 * @return {Object}
 * @api public
 */

Color.prototype.hsv = function() {
  var params = rgb2hsxParams(
    this.r,
    this.g,
    this.b
  );

  var obj = {};
  obj.h = params.h;
  obj.s = params.cMax === 0 ? 0 :
    params.delta / params.cMax * 100;
  obj.v = params.cMax * 100;

  if (this.a) {
    obj.a = this.a;
  }

  return obj;
};

/**
 * Convert to HSV string
 * @return {String}
 * @api public
 */

Color.prototype.hsvString = function() {
  var obj = this.hsv();

  var str = [
    obj.h,
    obj.s + '%',
    obj.l + '%'
  ];

  if (obj.a) {
    str.push(obj.a);
  }

  return cssString(
    obj.a ? 'hsva' : 'hsv',
    str.join(', ')
  );
};

/**
 * Calculate HS* params
 */

function rgb2hsxParams(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  var obj = {};
  obj.cMax = Math.max(r, g, b);
  obj.cMin = Math.min(r, g, b);
  obj.delta = obj.cMax - obj.cMin;

  switch (true) {
    case obj.delta === 0:
      obj.h = 0;
      break;
    case obj.cMax === r:
      obj.h = 60 * (((g - b) / obj.delta) % 6);
      break;
    case obj.cMax === g:
      obj.h = 60 * (((b - r) / obj.delta) + 2);
      break;
    case obj.cMax === b:
      obj.h = 60 * (((r - b) / obj.delta) + 4);
      break;
  }

  return obj;
}

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
