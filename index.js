
'use strict';

/**
 * Module dependencies
 */

var tpl = require('mnml-tpl');

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

var conversions = require('./lib/conversions');
var models = require('./lib/models');

/**
 * Expose parser
 *
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color, parser, matcher) {
  for (var mod in models) {
    if (models.hasOwnProperty(mod)) {
      parser = routeIn(mod);
      matcher = models[mod].matcher;

      switch (true) {
        case matcher.test(color):
          return parser.apply(null, matcher.exec(color).splice(1));
        case type(color) === 'object' && mod.charAt(mod.length - 1) in color:
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

    if (/(hex|keyword)/.test(m)) {
      Color.prototype[m] = routeOut(m, 'str');
    } else {
      Color.prototype[m] = routeOut(m, 'obj');
      Color.prototype[m + 'Array'] = routeOut(m, 'arr');
      Color.prototype[m + 'String'] = routeOut(m, 'str');
    }
  }
}

/**
 * Input router
 *
 * @param  {String} model
 * @param  {Array} arg
 * @return {Object}
 * @api private
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
 *
 * @param  {String} model
 * @param  {String} output
 * @return {Object|String|Array}
 * @api private
 */

function routeOut(model, output) {
  return function() {
    var obj = this.vals;
    var arr = toArray(obj);

    if (model !== 'rgb') {
      arr = conversions['rgb2' + model].apply(null, arr);
      obj = toObject(models[model].keys, arr);
    }

    if (arr.length > 3 && !isDefined(arr[3])) {
      arr.pop();
    }

    if (output === 'str') return tpl(models[model].format(arr))(obj);
    return output === 'arr' ? arr : obj;
  };
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
  for (var i = 0; i < keys.length; i++) {
    if (isDefined(arr[i])) {
      obj[type(keys) === 'string' ? keys.charAt(i) : keys[i]] = arr[i];
    }
  }
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
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && isDefined(obj[key])) {
      arr.push(obj[key]);
    }
  }
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

  for (var c in this.vals) {
    if (this.vals.hasOwnProperty(c)) {
      this.vals[c] = +this.vals[c];
    }
  }
}

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
 * Return or set red component
 * @api public
 */

Color.prototype.red = rgbaComponents('r');

/**
 * Return or set green component
 * @api public
 */

Color.prototype.green = rgbaComponents('g');

/**
 * Return or set blue component
 * @api public
 */

Color.prototype.blue = rgbaComponents('b');

/**
 * Return or set alpha component
 * @api public
 */

Color.prototype.alpha = rgbaComponents('a');

/**
 * Return or set cyan component
 * @api public
 */

Color.prototype.cyan = colorComponents('cmyk', 0);

/**
 * Return or set magenta component
 * @api public
 */

Color.prototype.magenta = colorComponents('cmyk', 1);

/**
 * Return or set yellow component
 * @api public
 */

Color.prototype.yellow = colorComponents('cmyk', 2);

/**
 * Return or set key component
 * @api public
 */

Color.prototype.key = colorComponents('cmyk', 3);

/**
 * Return or set hue component
 * @api public
 */

Color.prototype.hue = colorComponents('hsl', 0);

/**
 * Return or set saturation component
 * @api public
 */

Color.prototype.saturation = colorComponents('hsl', 1);

/**
 * Return or set lightness component
 * @api public
 */

Color.prototype.lightness = colorComponents('hsl', 2);

/**
 * Return or set value component
 *
 * @param {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.value = colorComponents('hsv', 2);

/**
 * Return or set RGBA components
 *
 * @param  {String} prop
 * @param  {Number} val
 * @return {Number|Object}
 * @api private
 */

function rgbaComponents(prop) {
  return function(val) {
    if (type(val) !== 'number') return this.vals[prop];
    this.vals[prop] = val;
    return this;
  };
}

/**
 * Return or set CMYK, HSLA and HSVA components
 *
 * @param  {String} model
 * @param  {String} prop
 * @param  {Number} val
 * @return {Number|Object}
 * @api private
 */

function colorComponents(model, prop) {
  return function(val) {
    var color = conversions['rgb2' + model].apply(null, toArray(this.vals));
    if (type(val) !== 'number') return color[prop];
    color[prop] = val;

    this.vals = toObject(
      'rgba',
      conversions[model + '2rgb'].apply(null, color)
    );

    return this;
  };
}
