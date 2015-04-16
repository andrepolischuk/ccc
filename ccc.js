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
    var m = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep || req);
    }, m, m.exports, outer, modules, cache, entries);

    // store to cache after successful resolve
    cache[id] = m;

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

var each = require('ea');
var tpl = require('mnml-tpl');

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

var conversions = require('./lib/conversions');

/**
 * Color matchers
 */

var matchers = {};
matchers.keyword = /^([A-Za-z]+)$/;
matchers.hex = /^#([a-f0-9]{3}([a-f0-9]{3})?)$/i;
matchers.rgb = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*([\d\.]+)?\s*\)$/;
matchers.cmyk = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
matchers.hsl = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;
matchers.hsv = /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,?\s*([\d\.]+)?\s*\)?$/;

/**
 * Color format
 */

var format = {};
format.keyword = [':k'];
format.hex = ['#:k'];
format.rgb = ['rgb(:r, :g, :b)', 'rgba(:r, :g, :b, :a)'];
format.cmyk = ['cmyk(:c%, :m%, :y%, :k%)'];
format.hsl = ['hsl(:h, :s%, :l%)', 'hsla(:h, :s%, :l%, :a)'];
format.hsv = ['hsv(:h, :s%, :v%)', 'hsva(:h, :s%, :v%, :a)'];

/**
 * Expose parser
 *
 * @param  {String} color
 * @return {Object}
 * @api public
 */

module.exports = function(color) {
  var model;

  each(matchers, function(matcher, m) {
    var key = /(hex|keyword)/.test(m) ? m : m.charAt(2);
    if (type(color) === 'string' && matcher.test(color)) model = m;
    if (type(color) === 'object' && key in color) model = m;
  });

  if (!model) return;

  var matcher = matchers[model];
  if (type(color) === 'object') return parse(model, toArray(color));
  return parse(model, matcher.exec(color).splice(1));
};

/**
 * Expose parser via model
 *
 * @param  {Array} val
 * @param  {Arguments}
 * @return {Object}
 * @api public
 */

each(matchers, function(matcher, model) {
  module.exports[model] = function(val) {
    if (type(val) === 'array') return parse(model, val);
    return parse.apply(null, [model].concat([].splice.call(arguments, 0)));
  };
});

/**
 * Parse color
 *
 * @param  {String} model
 * @param  {Array} val
 * @param  {Arguments}
 * @return {Object}
 * @api private
 */

function parse(model, val) {
  if (type(val) === 'array') return parse.apply(null, [model].concat(val));
  var args = [].splice.call(arguments, 1);
  return new Color(conversions[model + '2rgb'].apply(null, args));
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
  each(keys, function(char, i) {
    if (isDefined(arr[i])) obj[char] = arr[i];
  });
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
  each(obj, function(val) {
    if (isDefined(val)) arr.push(val);
  });
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
}

/**
 * Return converted color array
 *
 * @param  {String} model
 * @return {Array}
 * @api public
 */

Color.prototype.getArray = function(model) {
  var arr = conversions['rgb2' + model].apply(null, toArray(this.vals));
  if (arr.length > 3 && !isDefined(arr[3])) arr.pop();
  return arr;
};

/**
 * Return converted color object
 *
 * @param  {String} model
 * @return {Object}
 * @api public
 */

Color.prototype.getObject = function(model) {
  var arr = this.getArray(model);
  var keys = /(keyword|hex)/.test(model) ? 'k' : model;
  if (arr.length > keys.length) keys += 'a';
  return toObject(keys, arr);
};

/**
 * Return converted color string
 *
 * @param  {String} model
 * @return {String}
 * @api public
 */

Color.prototype.getString = function(model) {
  var obj = this.getObject(model);
  var alpha = 'a' in obj;
  var fmt = format[model][alpha ? 1 : 0];
  return tpl(fmt)(obj);
};

/**
 * Return converted to HEX and Keyword
 *
 * @return {String}
 * @api public
 */

each(['keyword', 'hex'], function(model) {
  Color.prototype[model] = function() {
    return this.getString(model);
  };
});

/**
 * Return converted to RGB, CMYK, HSL and HSV
 *
 * @return {Mixed}
 * @api public
 */

each(['rgb', 'cmyk', 'hsl', 'hsv'], function(model) {
  Color.prototype[model] = function() {
    return this.getObject(model);
  };

  Color.prototype[model + 'Array'] = function() {
    return this.getArray(model);
  };

  Color.prototype[model + 'String'] = function() {
    return this.getString(model);
  };
});

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
 * Check light color
 *
 * @return {Boolean}
 * @api public
 */

Color.prototype.light = function() {
  return this.lightness() >= 50;
};

/**
 * Check dark color
 *
 * @return {Boolean}
 * @api public
 */

Color.prototype.dark = function() {
  return this.lightness() < 50;
};

/**
 * Lighten color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.lighten = function(val) {
  val += this.lightness();
  this.lightness(val > 100 ? 100 : val);
  return this;
};

/**
 * Darken color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.darken = function(val) {
  val -= this.lightness();
  this.lightness(val > 0 ? 0 : -val);
  return this;
};

/**
 * Saturate color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.saturate = function(val) {
  val += this.saturation();
  this.saturation(val > 100 ? 100 : val);
  return this;
};

/**
 * Desaturate color
 *
 * @param {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.desaturate = function(val) {
  val -= this.saturation();
  this.saturation(val > 0 ? 0 : -val);
  return this;
};

/**
 * Return or set RGB components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['red', 'green', 'blue', 'alpha'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('rgb', prop, val);
  };
});

/**
 * Return or set CMYK components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['cyan', 'magenta', 'yellow', 'key'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('cmyk', prop, val);
  };
});

/**
 * Return or set HSL components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

each(['hue', 'saturation', 'lightness'], function(prop) {
  Color.prototype[prop] = function(val) {
    return this.component('hsl', prop, val);
  };
});

/**
 * Return or set HSV components
 *
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.value = function(val) {
  return this.component('hsv', 'value', val);
};

/**
 * Return or set component
 *
 * @param  {String} model
 * @param  {String} prop
 * @param  {Number} val
 * @return {Number|Object}
 * @api public
 */

Color.prototype.component = function(model, prop, val) {
  if (type(val) !== 'number') return this.get(model, prop);
  return this.set(model, prop, val);
};

/**
 * Return component
 *
 * @param  {String} model
 * @param  {String} prop
 * @return {Number}
 * @api public
 */

Color.prototype.get = function(model, prop) {
  var color = conversions['rgb2' + model].apply(null, toArray(this.vals));
  var index = prop === 'alpha' ? 3 : model.indexOf(prop.charAt(0));
  return color[index];
};

/**
 * Set component
 *
 * @param  {String} model
 * @param  {String} prop
 * @param  {Number} val
 * @return {Object}
 * @api public
 */

Color.prototype.set = function(model, prop, val) {
  var color = conversions['rgb2' + model].apply(null, toArray(this.vals));
  var index = prop === 'alpha' ? 3 : model.indexOf(prop.charAt(0));
  color[index] = val;
  this.vals = toObject('rgba', conversions[model + '2rgb'].apply(null, color));
  return this;
};

}, {"ea":2,"mnml-tpl":3,"type":4,"component-type":4,"./lib/conversions":5}],
2: [function(require, module, exports) {

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
 * Has own property
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose direct iterate
 */

module.exports = each;

/**
 * Expose reverse iterate
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

module.exports.reverse = function(obj, fn) {
  return each(obj, fn, 'reverse');
};

/**
 * Iteration router
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function each(obj, fn, direction) {
  if (typeof fn === 'function') {
    switch (type(obj)) {
      case 'array':
        return (array[direction] || array)(obj, fn);
      case 'object':
        if (type(obj.length) === 'number') {
          return (array[direction] || array)(obj, fn);
        }
        return (object[direction] || object)(obj, fn);
      case 'string':
        return (string[direction] || string)(obj, fn);
    }
  }
}

/**
 * Iterate array
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

function array(obj, fn) {
  for (var i = 0; i < obj.length; i++) {
    fn(obj[i], i);
  }
}

/**
 * Iterate array in reverse order
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

array.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0 ; i--) {
    fn(obj[i], i);
  }
};

/**
 * Iterate object
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function object(obj, fn) {
  for (var i in obj) {
    if (has.call(obj, i)) {
      fn(obj[i], i);
    }
  }
}

/**
 * Iterate object in reverse order
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

object.reverse = function(obj, fn) {
  var keys = [];
  for (var k in obj) {
    if (has.call(obj, k)) {
      keys.push(k);
    }
  }
  for (var i = keys.length - 1; i >= 0; i--) {
    fn(obj[keys[i]], keys[i]);
  }
};

/**
 * Iterate string
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

function string(obj, fn) {
  for (var i = 0; i < obj.length; i++) {
    fn(obj.charAt(i), i);
  }
}

/**
 * Iterate string in reverse order
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

string.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0 ; i--) {
    fn(obj.charAt(i), i);
  }
};

}, {"type":4,"component-type":4}],
4: [function(require, module, exports) {
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
3: [function(require, module, exports) {
'use strict';

// Dependencies
var debug = require('debug')('mnml-tpl');

// Settings
var matched = /\:([A-Za-z0-9_]+)/g;


module.exports = function (template) {
  return function(locals) {
    if (!locals) locals = {};
    return template.replace(matched, function(noop, key) {
      debug('render template `%s` with locals %o', template, locals);
      return key in locals ? locals[key] : noop;
    });
  };
};

}, {"debug":6}],
6: [function(require, module, exports) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Use chrome.storage.local if we are in an app
 */

var storage;

if (typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined')
  storage = chrome.storage.local;
else
  storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      storage.removeItem('debug');
    } else {
      storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

}, {"./debug":7}],
7: [function(require, module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {"ms":8}],
8: [function(require, module, exports) {
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

}, {}],
5: [function(require, module, exports) {

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
 *
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
 * Expose RGB to RGB
 */

module.exports.rgb2rgb = function(r, g, b, a) {
  return [+r, +g, +b, +a];
};

/**
 * Expose CMYK to RGB
 *
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
 *
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
 *
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
 * Expose KEYWORD to RGB
 *
 * @param  {String} keyword
 * @return {Array}
 * @api private
 */

module.exports.keyword2rgb = function(keyword) {
  if (keyword in keywords) {
    return keywords[keyword];
  }
};

/**
 * Expose RGB to HEX
 *
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
 *
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
 *
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
 *
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
 * Expose RGB to KEYWORD
 *
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {String}
 * @api private
 */

module.exports.rgb2keyword = function() {
  for (var k in keywords) {
    if (keywords.hasOwnProperty(k)) {
      for (var i = 0; i < 3; i++) {
        if (keywords[k][i] !== arguments[i]) break;
      }
      if (i > 2) return [k];
    }
  }
};

}, {}]}, {}, {"1":""}));