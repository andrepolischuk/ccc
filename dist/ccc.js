(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && (define.amd || define.cmd)) {
    define(function(){ return require('1'); });
  } else {
    this['ccc'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {

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

  color = color.replace(/(\s)/g, '').split(',');

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

  color = color.replace(/(#)/g, '');

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

  color = color.replace(/(\s)/g, '').split(',');

  if (color.length !== 4) {
    return;
  }

  var k = color[3];

  return new Color(
    255 * (1 - +color[0]) * (1 - +k),
    255 * (1 - +color[1]) * (1 - +k),
    255 * (1 - +color[2]) * (1 - +k)
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
 * Module exports
 */

module.exports = identify;

}, {}]}, {}, {"1":""})
);