
'use strict';

/**
 * Module dependencies
 */

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

var conversions = require('./lib/conversions');
var models = require('./lib/models');
var utils = require('./lib/utils');

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
          return parser.apply(null, utils.arr(color));
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
    Color.prototype[m] = routeOut(m, 'obj');
    Color.prototype[m + 'String'] = routeOut(m, 'fmt');
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
 * @param  {String} out
 * @return {Mixed}
 * @api public
 */

function routeOut(model, out) {
  return function() {
    var arr = utils.arr(this.value);
    var str = out === 'obj' ?
      models[model].keys :
      models[model].format(this.value.a);
    return utils[out](str, model === 'rgb' ? arr :
      conversions['rgb2' + model].apply(null, arr));
  };
}

/**
 * Color
 * @param {Array} color
 * @api public
 */

function Color(color) {
  this.value = utils.obj('rgba', color);
  this.value.a = +this.value.a;
}

/**
 * To grayscale
 * @return {Object}
 * @api public
 */

Color.prototype.grayscale = function() {
  var rgb = this.value;
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
  var rgb = this.value;
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
  var rgb = this.value;
  rgb.r = Math.round((rgb.r + color.value.r) / 2);
  rgb.g = Math.round((rgb.g + color.value.g) / 2);
  rgb.b = Math.round((rgb.b + color.value.b) / 2);
  return this;
};
