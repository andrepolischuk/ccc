
'use strict';

/**
 * Module dependencies
 */

var Color = require('./color');

/**
 * Matcher
 */

var matcher = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/;

/**
 * Expose parser
 */

module.exports = rgb;

/**
 * Parser
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Object}
 * @api public
 */

function rgb(r, g, b, a) {
  if (typeof r === 'string' && !g) {
    r = r.replace(/(\s)/g, '').split(',');
    a = r[3];
    b = r[2];
    g = r[1];
    r = r[0];
  }

  return new Color(
    parseInt(r),
    parseInt(g),
    parseInt(b),
    parseInt(a)
  );
};

/**
 * Expose matcher
 */

module.exports.matcher = matcher;
