
'use strict';

/**
 * Module dependencies
 */

try {
  var fmt = require('fmt');
  var type = require('type');
} catch (err) {
  var fmt = require('util').format;
  var type = require('component-type');
}

var conversions = require('./lib/conversions');
var models = require('./lib/models');

/**
 * Expose parser
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color, parser, matcher) {
  for (var model in models) {
    if (models.hasOwnProperty(model)) {
      parser = routeIn(model);
      matcher = models[model].matcher;

      switch (true) {
        case matcher.test(color):
          return parser.apply(null, matcher.exec(color).splice(1));
        case type(color) === 'object' && model.charAt(model.length - 1) in color:
          return parser.apply(null, toArray(color));
      }
    }
  }
};

/**
 * Expose models parse
 * @api public
 */

for (var m in models) {
  if (models.hasOwnProperty(m)) {
    module.exports[m] = routeIn(m);
    Color.prototype[m] = routeOut(m);
    Color.prototype[m + 'String'] = routeOut(m, fmt);
  }
}

/**
 * Input router
 * @param  {String} model
 * @param  {Arguments} arguments
 * @return {Object}
 * @api public
 */

function routeIn(model) {
  return function(arg) {
    if (type(arg) === 'array') return routeIn(model).apply(null, arg);
    if (model === 'rgb') return new Color(arguments);
    return new Color(conversions[model + '2rgb'].apply(null, arguments));
  };
}

/**
 * Output router
 * @param  {String} model
 * @param  {Function} fmt
 * @return {Object|String}
 * @api public
 */

function routeOut(model, fmt) {
  return function() {
    var arr = model === 'rgb' ?
      toArray(this.vals) :
      conversions['rgb2' + model].apply(null, toArray(this.vals));

    if (arr.length > 3 && !isDefined(arr[3])) {
      arr.pop();
    }

    if (fmt) {
      arr.unshift(models[model].format(arr));
      return fmt.apply(null, arr);
    }

    return toObject(models[model].keys, arr);
  };
}

/**
 * Convert array to object via keys
 * @param  {String|Array} keys
 * @param  {Array} arr
 * @return {Object}
 * @api private
 */

function toObject(keys, arr) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    if (isDefined(arr[i])) {
      obj[type(keys) === 'string' ? keys.charAt(i) : keys[i]] = arr[i];
    }
  }
  return obj;
}

/**
 * Convert object to values array
 * @param  {Object} obj
 * @return {Array}
 * @api private
 */

function toArray(obj) {
  var arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && isDefined(obj[key])) {
      arr.push(obj[key]);
    }
  }
  return arr;
}

/**
 * Check defining
 * @param  {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isDefined(val) {
  return !/(null|nan|undefined)/.test(type(val));
}

/**
 * Color
 * @param {Array} color
 * @api public
 */

function Color(color) {
  this.vals = toObject('rgba', color);

  for (var c in this.vals) {
    if (this.vals.hasOwnProperty(c)) {
      this.vals[c] = +this.vals[c];
    }
  }
}

/**
 * To grayscale
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
