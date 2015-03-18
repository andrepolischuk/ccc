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
    Color.prototype[m] = routeOut(m, 'obj');
    Color.prototype[m + 'Array'] = routeOut(m, 'arr');
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
 * @param  {Function|String} fmt
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

    if (type(fmt) === 'function') {
      arr.unshift(models[model].format(arr));
      return fmt.apply(null, arr);
    }

    return fmt === 'arr' ? arr : toObject(models[model].keys, arr);
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

}, {"fmt":2,"type":3,"component-type":3,"./lib/conversions":4,"./lib/models":5}],
2: [function(require, module, exports) {

/**
 * toString.
 */

var toString = window.JSON
  ? JSON.stringify
  : function(_){ return String(_); };

/**
 * Export `fmt`
 */

module.exports = fmt;

/**
 * Formatters
 */

fmt.o = toString;
fmt.s = String;
fmt.d = parseInt;

/**
 * Format the given `str`.
 *
 * @param {String} str
 * @param {...} args
 * @return {String}
 * @api public
 */

function fmt(str){
  var args = [].slice.call(arguments, 1);
  var j = 0;

  return str.replace(/%([a-z])/gi, function(_, f){
    return fmt[f]
      ? fmt[f](args[j++])
      : _ + f;
  });
}

}, {}],
3: [function(require, module, exports) {
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

}, {}],
4: [function(require, module, exports) {

'use strict';

/**
 * Math ref
 */

var abs = Math.abs;
var round = Math.round;
var floor = Math.floor;

/**
 * Color keyword map
 */

var keywords = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};

/**
 * Expose HEX to RGB
 * @param  {String} str
 * @return {Array}
 * @api private
 */

module.exports.hex2rgb = function(str) {
  var len = str.length / 3;
  var r = str.substr(0, len);
  var g = str.substr(len, len);
  var b = str.substr(len * 2, len);

  if (len < 2) {
    r += r;
    g += g;
    b += b;
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return [r, g, b];
};

/**
 * Expose CMYK to RGB
 * @param  {Number} c
 * @param  {Number} m
 * @param  {Number} y
 * @param  {Number} k
 * @return {Array}
 * @api private
 */

module.exports.cmyk2rgb = function(c, m, y, k) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;

  var r = round(255 * (1 - c) * (1 - k));
  var g = round(255 * (1 - m) * (1 - k));
  var b = round(255 * (1 - y) * (1 - k));

  return [r, g, b];
};

/**
 * Expose HSL to RGB
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} l
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.hsl2rgb = function(h, s, l, a) {
  h /= 60;
  s /= 100;
  l /= 100;
  a = +a || a;

  var c = 255 * (1 - abs((2 * l) - 1)) * s;
  var x = c * (1 - abs((h % 2) - 1));
  var m = (255 * l) - (c / 2);
  var hi = floor(h) % 6;

  c = round(c + m);
  x = round(x + m);
  m = round(m);

  switch (hi) {
    case 0: return [c, x, m, a];
    case 1: return [x, c, m, a];
    case 2: return [m, c, x, a];
    case 3: return [m, x, c, a];
    case 4: return [x, m, c, a];
    case 5: return [c, m, x, a];
  }
};

/**
 * Expose HSV to RGB
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} v
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.hsv2rgb = function(h, s, v, a) {
  h /= 60;
  s /= 100;
  v /= 100;
  a = +a || a;

  var c = 255 * v * s;
  var x = c * (1 - abs((h % 2) - 1));
  var m = 255 * v - c;
  var hi = floor(h) % 6;

  c = round(c + m);
  x = round(x + m);
  m = round(m);

  switch (hi) {
    case 0: return [c, x, m, a];
    case 1: return [x, c, m, a];
    case 2: return [m, c, x, a];
    case 3: return [m, x, c, a];
    case 4: return [x, m, c, a];
    case 5: return [c, m, x, a];
  }
};

/**
 * Expose KEY to RGB
 * @param  {String} key
 * @return {Array}
 * @api private
 */

module.exports.key2rgb = function(key) {
  if (key in keywords) {
    return keywords[key];
  }
};

/**
 * Expose RGB to HEX
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {Array}
 * @api private
 */

module.exports.rgb2hex = function(r, g, b) {
  var str = [
    parseInt(r).toString(16),
    parseInt(g).toString(16),
    parseInt(b).toString(16)
  ];

  for (var i = 0; i < str.length; i++) {
    str[i] += str[i].length < 2 ? '0' : '';
  }

  return [str.join('')];
};

/**
 * Expose RGB to CMYK
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {Array}
 * @api private
 */

module.exports.rgb2cmyk = function(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  var k = 1 - Math.max(r, g, b);
  var c = (1 - r - k) / (1 - k) || 0;
  var m = (1 - g - k) / (1 - k) || 0;
  var y = (1 - b - k) / (1 - k) || 0;

  c = round(c * 100);
  m = round(m * 100);
  y = round(y * 100);
  k = round(k * 100);

  return [c, m, y, k];
};

/**
 * Expose RGB to HSL
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.rgb2hsl = function(r, g, b, a) {
  r /= 255;
  g /= 255;
  b /= 255;
  a = +a || a;

  var cMax = Math.max(r, g, b);
  var cMin = Math.min(r, g, b);
  var delta = cMax - cMin;
  var l = (cMax + cMin) / 2;
  var h = 0;

  switch (true) {
    case delta === 0: break;
    case cMax === r: h = 60 * (((g - b) / delta) + (g < b ? 6 : 0)); break;
    case cMax === g: h = 60 * (((b - r) / delta) + 2); break;
    case cMax === b: h = 60 * (((r - g) / delta) + 4); break;
  }

  var s = round(delta === 0 ? 0 : delta / (1 - abs(2 * l - 1)) * 100);
  l = round(l * 100);
  h = round(h);

  return [h, s, l, a];
};

/**
 * Expose RGB to HSV
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @param  {Number} a
 * @return {Array}
 * @api private
 */

module.exports.rgb2hsv = function(r, g, b, a) {
  r /= 255;
  g /= 255;
  b /= 255;
  a = +a || a;

  var cMax = Math.max(r, g, b);
  var cMin = Math.min(r, g, b);
  var delta = cMax - cMin;
  var v = round(cMax * 100);
  var h = 0;

  switch (true) {
    case delta === 0: break;
    case cMax === r: h = 60 * (((g - b) / delta) + (g < b ? 6 : 0)); break;
    case cMax === g: h = 60 * (((b - r) / delta) + 2); break;
    case cMax === b: h = 60 * (((r - g) / delta) + 4); break;
  }

  var s = round(cMax === 0 ? 0 : delta / cMax * 100);
  h = round(h);

  return [h, s, v, a];
};

/**
 * Expose RGB to KEY
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {String}
 * @api private
 */

module.exports.rgb2key = function(r, g, b) {
  for (var k in keywords) {
    if (keywords.hasOwnProperty(k)) {
      for (var i = 0; i < 3; i++) {
        if (keywords[k][i] !== arguments[i]) break;
      }
      if (i > 2) return [k];
    }
  }
};

}, {}],
5: [function(require, module, exports) {

'use strict';

/**
 * Expose HEX
 */

module.exports.hex = {
  keys: ['hex'],
  matcher: /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i
};

/**
 * Expose HEX format string
 */

module.exports.hex.format = function() {
  return '#%s';
};

/**
 * Expose RGB
 */

module.exports.rgb = {
  keys: 'rgba',
  matcher: /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/
};

/**
 * Expose RGB format string
 */

module.exports.rgb.format = function(color) {
  return color.length > 3 ? 'rgba(%s, %s, %s, %s)' : 'rgb(%s, %s, %s)';
};

/**
 * Expose CMYK
 */

module.exports.cmyk = {
  keys: 'cmyk',
  matcher: /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
};

/**
 * Expose CMYK format string
 */

module.exports.cmyk.format = function() {
  return 'cmyk(%s%, %s%, %s%, %s%)';
};

/**
 * Expose HSL
 */

module.exports.hsl = {
  keys: 'hsla',
  matcher: /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/
};

/**
 * Expose HSL format string
 */

module.exports.hsl.format = function(color) {
  return color.length > 3 ? 'hsla(%s, %s%, %s%, %s)' : 'hsl(%s, %s%, %s%)';
};

/**
 * Expose HSV
 */

module.exports.hsv = {
  keys: 'hsva',
  matcher: /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/
};

/**
 * Expose HSV format string
 */

module.exports.hsv.format = function(color) {
  return color.length > 3 ? 'hsva(%s, %s%, %s%, %s)' : 'hsv(%s, %s%, %s%)';
};

/**
 * Expose KEY
 */

module.exports.key = {
  keys: ['key'],
  matcher: /^([A-Za-z]+)$/
};

/**
 * Expose KEY format string
 */

 module.exports.key.format = function() {
   return '%s';
 };

}, {}]}, {}, {"1":""})
);