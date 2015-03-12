
'use strict';

/**
 * Module dependencies
 */

var Color = require('./color');

/**
 * Matcher
 */

var matcher = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

/**
 * Expose parser
 */

module.exports = cmyk;

/**
 * Parser
 * @param  {Number} c
 * @param  {Number} m
 * @param  {Number} y
 * @param  {Number} k
 * @return {Object}
 * @api public
 */

function cmyk(c, m, y, k) {
  if (typeof c === 'string' && !m) {
    c = c.replace(/(\s)/g, '').split(',');
    k = c[3];
    y = c[2];
    m = c[1];
    c = c[0];
  }

  return new Color(
    255 * (100 - parseInt(c)) * (100 - parseInt(k)) / 10000,
    255 * (100 - parseInt(m)) * (100 - parseInt(k)) / 10000,
    255 * (100 - parseInt(y)) * (100 - parseInt(k)) / 10000
  );
};

/**
 * Expose matcher
 */

module.exports.matcher = matcher;
