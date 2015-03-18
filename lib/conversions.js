
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

module.exports.rgb2key = function() {
  for (var k in keywords) {
    if (keywords.hasOwnProperty(k)) {
      for (var i = 0; i < 3; i++) {
        if (keywords[k][i] !== arguments[i]) break;
      }
      if (i > 2) return [k];
    }
  }
};
