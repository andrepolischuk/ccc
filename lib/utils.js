
'use strict';

/**
 * Module dependencies
 */

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

/**
 * Expose convert to object
 * @param  {String|Array} keys
 * @param  {Array} arr
 * @return {Object}
 * @api private
 */

module.exports.obj = function(keys, arr) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    if (/(string|number)/.test(type(arr[i]))) {
      obj[type(keys) === 'string' ? keys.charAt(i) : keys[i]] = arr[i];
    }
  }
  return obj;
};

/**
 * Expose convert to array
 * @param  {Object} obj
 * @return {Array}
 * @api private
 */

module.exports.arr = function(obj) {
  var arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key]);
    }
  }
  return arr;
};

/**
 * String format
 * @param  {String} str
 * @param  {Array} args
 * @return {String}
 * @api private
 */

module.exports.fmt = function(str, args) {
  var i = 0;
  return str.replace(/%([a-z])/gi, function() {
    return String(args[i++]);
  });
};
