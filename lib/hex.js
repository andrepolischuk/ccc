
'use strict';

/**
 * Module dependencies
 */

var Color = require('./color');

/**
 * Matcher
 */

var matcher = /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i;

/**
 * Expose parser
 */

module.exports = hex;

/**
 * Parser
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
};

/**
 * Expose matcher
 */

module.exports.matcher = matcher;
