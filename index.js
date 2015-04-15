
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

    if (/(hex|keyword)/.test(m)) {
      Color.prototype[m] = routeOut(m, tpl);
    } else {
      Color.prototype[m] = routeOut(m, 'obj');
      Color.prototype[m + 'Array'] = routeOut(m, 'arr');
      Color.prototype[m + 'String'] = routeOut(m, tpl);
    }
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
 * @param  {Function|String} tpl
 * @return {Object|String}
 * @api public
 */

function routeOut(model, tpl) {
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

    if (type(tpl) === 'function') return tpl(models[model].format(arr))(obj);
    return tpl === 'arr' ? arr : obj;
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
 * Return or set RGBA components
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
 * Return or set cyan component
 * @api public
 */

Color.prototype.cyan = cmykComponents(0);

/**
 * Return or set magenta component
 * @api public
 */

Color.prototype.magenta = cmykComponents(1);

/**
 * Return or set yellow component
 * @api public
 */

Color.prototype.yellow = cmykComponents(2);

/**
 * Return or set key component
 * @api public
 */

Color.prototype.key = cmykComponents(3);

/**
 * Return or set CMYK components
 * @param  {Number} prop
 * @param  {Number} val
 * @return {Number|Object}
 * @api private
 */

function cmykComponents(prop) {
  return function(val) {
    var cmyk = conversions.rgb2cmyk.apply(null, toArray(this.vals));
    if (type(val) !== 'number') return cmyk[prop];
    cmyk[prop] = val;
    this.vals = toObject('rgba', conversions.cmyk2rgb.apply(null, cmyk));
    return this;
  };
}

/**
 * Return or set hue component
 * @api public
 */

Color.prototype.hue = hslComponents(0);

/**
 * Return or set saturation component
 * @api public
 */

Color.prototype.saturation = hslComponents(1);

/**
 * Return or set lightness component
 * @api public
 */

Color.prototype.lightness = hslComponents(2);

/**
 * Return or set HSL components
 * @param {Number} prop
 * @param {Number} val
 * @return {Number|Object}
 * @api public
 */

function hslComponents(prop) {
  return function(val) {
    var hsl = conversions.rgb2hsl.apply(null, toArray(this.vals));
    if (type(val) !== 'number') return hsl[prop];
    hsl[prop] = val;
    this.vals = toObject('rgba', conversions.hsl2rgb.apply(null, hsl));
    return this;
  };
}

/**
 * Return or set value component
 * @param {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.value = function(val) {
  var hsv = conversions.rgb2hsv.apply(null, toArray(this.vals));
  if (type(val) !== 'number') return hsv[2];
  hsv[2] = val;
  this.vals = toObject('rgba', conversions.hsv2rgb.apply(null, hsv));
  return this;
};
