
'use strict';

/**
 * Module dependencies
 */

var each = require('ea');
var tpl = require('mnml-tpl');

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

var conversions = require('./lib/conversions');

/**
 * Color matchers
 */

var matchers = {};
matchers.keyword = /^([A-Za-z]+)$/;
matchers.hex = /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i;
matchers.rgb = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/;
matchers.cmyk = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
matchers.hsl = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;
matchers.hsv = /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;

/**
 * Color format
 */

var format = {};
format.keyword = [':k'];
format.hex = ['#:k'];
format.rgb = ['rgb(:r, :g, :b)', 'rgba(:r, :g, :b, :a)'];
format.cmyk = ['cmyk(:c%, :m%, :y%, :k%)'];
format.hsl = ['hsl(:h, :s%, :l%)', 'hsla(:h, :s%, :l%, :a)'];
format.hsv = ['hsv(:h, :s%, :v%)', 'hsva(:h, :s%, :v%, :a)'];

/**
 * Expose parser
 *
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color) {
  var model;

  each(matchers, function(matcher, m) {
    var key = /(hex|keyword)/.test(m) ? m : m.charAt(2);
    if (type(color) === 'string' && matcher.test(color)) model = m;
    if (type(color) === 'object' && key in color) model = m;
  });

  if (!model) return;

  var matcher = matchers[model];
  if (type(color) === 'object') return parse(model, toArray(color));
  return parse(model, matcher.exec(color).splice(1));
};

/**
 * Expose parser via model
 *
 * @param  {Array} val
 * @param  {Arguments}
 * @return {Object}
 * @api public
 */

each(matchers, function(matcher, model) {
  module.exports[model] = function(val) {
    if (type(val) === 'array') return parse(model, val);
    return parse.apply(null, [model].concat([].splice.call(arguments, 0)));
  };
});

/**
 * Parse color
 *
 * @param  {String} model
 * @param  {Array} val
 * @param  {Arguments}
 * @return {Object}
 * @api private
 */

function parse(model, val) {
  if (type(val) === 'array') return parse.apply(null, [model].concat(val));
  var args = [].splice.call(arguments, 1);
  return new Color(conversions[model + '2rgb'].apply(null, args));
}

/**
 * Convert array to object via keys
 *
 * @param  {String|Array} keys
 * @param  {Array} arr
 * @return {Object}
 * @api private
 */

function toObject(keys, arr) {
  var obj = {};
  each(keys, function(char, i) {
    if (isDefined(arr[i])) obj[char] = arr[i];
  });
  return obj;
}

/**
 * Convert object to values array
 *
 * @param  {Object} obj
 * @return {Array}
 * @api private
 */

function toArray(obj) {
  var arr = [];
  each(obj, function(val) {
    if (isDefined(val)) arr.push(val);
  });
  return arr;
}

/**
 * Check defining
 *
 * @param  {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isDefined(val) {
  return !/(null|nan|undefined)/.test(type(val));
}

/**
 * Color
 *
 * @param {Array} color
 * @api public
 */

function Color(color) {
  this.vals = toObject('rgba', color);
}

/**
 * Return converted color array
 *
 * @param  {String} model
 * @return {Array}
 * @api public
 */

Color.prototype.getArray = function(model) {
  var arr = conversions['rgb2' + model].apply(null, toArray(this.vals));
  if (arr.length > 3 && !isDefined(arr[3])) arr.pop();
  return arr;
};

/**
 * Return converted color object
 *
 * @param  {String} model
 * @return {Object}
 * @api public
 */

Color.prototype.getObject = function(model) {
  var arr = this.getArray(model);
  var keys = /(keyword|hex)/.test(model) ? 'k' : model;
  if (arr.length > keys.length) keys += 'a';
  return toObject(keys, arr);
};

/**
 * Return converted color string
 *
 * @param  {String} model
 * @return {String}
 * @api public
 */

Color.prototype.getString = function(model) {
  var obj = this.getObject(model);
  var alpha = 'a' in obj;
  var fmt = format[model][alpha ? 1 : 0];
  return tpl(fmt)(obj);
};

/**
 * Return converted to HEX and Keyword
 *
 * @return {String}
 * @api public
 */

each(['keyword', 'hex'], function(model) {
  Color.prototype[model] = function() {
    return this.getString(model);
  };
});

/**
 * Return converted to RGB, CMYK, HSL and HSV
 *
 * @return {Mixed}
 * @api public
 */

each(['rgb', 'cmyk', 'hsl', 'hsv'], function(model) {
  Color.prototype[model] = function() {
    return this.getObject(model);
  };

  Color.prototype[model + 'Array'] = function() {
    return this.getArray(model);
  };

  Color.prototype[model + 'String'] = function() {
    return this.getString(model);
  };
});

/**
 * To grayscale
 *
 * @return {Object}
 * @api public
 */

Color.prototype.grayscale = function() {
  var rgb = this.vals;
  rgb.r = rgb.g = rgb.b = Math.round(
    0.299 * rgb.r +
    0.587 * rgb.g +
    0.114 * rgb.b
  );
  return this;
};

/**
 * Invert color
 *
 * @return {Object}
 * @api public
 */

Color.prototype.invert = function() {
  var rgb = this.vals;
  rgb.r = 255 - rgb.r;
  rgb.g = 255 - rgb.g;
  rgb.b = 255 - rgb.b;
  return this;
};

/**
 * Average color
 *
 * @param  {Object} color
 * @return {Object}
 * @api public
 */

Color.prototype.average = function(color) {
  var rgb = this.vals;
  rgb.r = Math.round((rgb.r + color.vals.r) / 2);
  rgb.g = Math.round((rgb.g + color.vals.g) / 2);
  rgb.b = Math.round((rgb.b + color.vals.b) / 2);
  return this;
};

/**
 * Check light color
 *
 * @return {Boolean}
 * @api public
 */

Color.prototype.light = function() {
  return this.lightness() >= 50;
};

/**
 * Check dark color
 *
 * @return {Boolean}
 * @api public
 */

Color.prototype.dark = function() {
  return this.lightness() < 50;
};

/**
 * Lighten color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.lighten = function(val) {
  val += this.lightness();
  this.lightness(val > 100 ? 100 : val);
  return this;
};

/**
 * Darken color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.darken = function(val) {
  val -= this.lightness();
  this.lightness(val > 0 ? 0 : -val);
  return this;
};

/**
 * Saturate color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.saturate = function(val) {
  val += this.saturation();
  this.saturation(val > 100 ? 100 : val);
  return this;
};

/**
 * Desaturate color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.desaturate = function(val) {
  val -= this.saturation();
  this.saturation(val > 0 ? 0 : -val);
  return this;
};

/**
 * Return or set RGB components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['red', 'green', 'blue', 'alpha'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('rgb', prop, val);
  };
});

/**
 * Return or set CMYK components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['cyan', 'magenta', 'yellow', 'key'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('cmyk', prop, val);
  };
});

/**
 * Return or set HSL components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['hue', 'saturation', 'lightness'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('hsl', prop, val);
  };
});

/**
 * Return or set HSV components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.value = function(val) {
  return this.component('hsv', 'value', val);
};

/**
 * Return or set component
 *
 * @param  {String} model
 * @param  {String} prop
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.component = function(model, prop, val) {
  if (type(val) !== 'number') return this.getComponent(model, prop);
  return this.setComponent(model, prop, val);
};

/**
 * Return component
 *
 * @param  {String} model
 * @param  {String} prop
 * @return {Number}
 * @api public
 */

Color.prototype.getComponent = function(model, prop) {
  var color = conversions['rgb2' + model].apply(null, toArray(this.vals));
  var index = prop === 'alpha' ? 3 : model.indexOf(prop.charAt(0));
  return color[index];
};

/**
 * Set component
 *
 * @param  {String} model
 * @param  {String} prop
 * @param  {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.setComponent = function(model, prop, val) {
  var color = conversions['rgb2' + model].apply(null, toArray(this.vals));
  var index = prop === 'alpha' ? 3 : model.indexOf(prop.charAt(0));
  color[index] = val;
  this.vals = toObject('rgba', conversions[model + '2rgb'].apply(null, color));
  return this;
};
