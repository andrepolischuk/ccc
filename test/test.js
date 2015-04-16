
var ccc = require('..');
var assert = require('assert');

describe('ccc(name)', function() {
  it('should parse name', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('black').vals);
    assert.deepEqual({r: 255, g: 255, b: 255}, ccc.keyword('white').vals);
  });
});

describe('ccc(hex)', function() {
  it('should parse hex', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('#000').vals);
    assert.deepEqual({r: 255, g: 255, b: 255}, ccc('#ffffff').vals);
    assert.deepEqual({r: 255, g: 0, b: 0}, ccc.hex('f00').vals);
    assert.deepEqual({r: 0, g: 255, b: 0}, ccc.hex('00ff00').vals);
  });
});

describe('ccc(rgb)', function() {
  it('should parse rgb', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('rgb(0, 0, 0)').vals);
    assert.deepEqual({r: 255, g: 255, b: 255, a: 0.5}, ccc('rgba(255, 255, 255, .5)').vals);
    assert.deepEqual({r: 255, g: 0, b: 0}, ccc({r: 255, g: 0, b: 0}).vals);
    assert.deepEqual({r: 0, g: 255, b: 0, a: 0.5}, ccc({r: 0, g: 255, b: 0, a: .5}).vals);
    assert.deepEqual({r: 0, g: 0, b: 255}, ccc.rgb(0, 0, 255).vals);
    assert.deepEqual({r: 255, g: 255, b: 0, a: 0.5}, ccc.rgb(255, 255, 0, .5).vals);
  });
});

describe('ccc(cmyk)', function() {
  it('should parse cmyk', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('cmyk(0%, 0%, 0%, 100%)').vals);
    assert.deepEqual({r: 255, g: 255, b: 255}, ccc({c: 0, m: 0, y: 0, k: 0}).vals);
    assert.deepEqual({r: 255, g: 0, b: 0}, ccc.cmyk(0, 100, 100, 0).vals);
  });
});

describe('ccc(hsl)', function() {
  it('should parse hsl', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('hsl(0, 0%, 0%)').vals);
    assert.deepEqual({r: 255, g: 255, b: 255, a: 0.5}, ccc('hsla(0, 0%, 100%, .5)').vals);
    assert.deepEqual({r: 255, g: 0, b: 0}, ccc({h: 0, s: 100, l: 50}).vals);
    assert.deepEqual({r: 0, g: 255, b: 0, a: 0.5}, ccc({h: 120, s: 100, l: 50, a: .5}).vals);
    assert.deepEqual({r: 0, g: 0, b: 255}, ccc.hsl(240, 100, 50).vals);
    assert.deepEqual({r: 255, g: 255, b: 0, a: 0.5}, ccc.hsl(60, 100, 50, .5).vals);
  });
});

describe('ccc(hsv)', function() {
  it('should parse hsv', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('hsv(0, 0%, 0%)').vals);
    assert.deepEqual({r: 255, g: 255, b: 255, a: 0.5}, ccc('hsva(0, 0%, 100%, .5)').vals);
    assert.deepEqual({r: 255, g: 0, b: 0}, ccc({h: 0, s: 100, v: 100}).vals);
    assert.deepEqual({r: 0, g: 255, b: 0, a: 0.5}, ccc({h: 120, s: 100, v: 100, a: .5}).vals);
    assert.deepEqual({r: 0, g: 0, b: 255}, ccc.hsv(240, 100, 100).vals);
    assert.deepEqual({r: 255, g: 255, b: 0, a: 0.5}, ccc.hsv(60, 100, 100, .5).vals);
  });
});

describe('Color#keyword()', function() {
  it('should return keyword string', function() {
    assert(ccc('black').keyword() === 'black');
    assert(ccc('#ffffff').keyword() === 'white');
    assert(ccc('rgb(255, 0, 0)').keyword() === 'red');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').keyword() === 'lime');
    assert(ccc('hsl(240, 100%, 50%)').keyword() === 'blue');
    assert(ccc('hsv(60, 100%, 100%)').keyword() === 'yellow');
  });
});

describe('Color#hex()', function() {
  it('should return hex string', function() {
    assert(ccc('black').hex() === '#000000');
    assert(ccc('#ffffff').hex() === '#ffffff');
    assert(ccc('rgb(255, 0, 0)').hex() === '#ff0000');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').hex() === '#00ff00');
    assert(ccc('hsl(240, 100%, 50%)').hex() === '#0000ff');
    assert(ccc('hsv(60, 100%, 100%)').hex() === '#ffff00');
  });
});

describe('Color#rgb()', function() {
  it('should return rgb object', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('black').rgb());
    assert.deepEqual({r: 255, g: 255, b: 255}, ccc('#ffffff').rgb());
    assert.deepEqual({r: 255, g: 0, b: 0, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').rgb());
    assert.deepEqual({r: 0, g: 255, b: 0}, ccc('cmyk(100%, 0%, 100%, 0%)').rgb());
    assert.deepEqual({r: 0, g: 0, b: 255, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').rgb());
    assert.deepEqual({r: 255, g: 255, b: 0}, ccc('hsv(60, 100%, 100%)').rgb());
  });
});

describe('Color#rgbArray()', function() {
  it('should return rgb array', function() {
    assert.deepEqual([0, 0, 0], ccc('black').rgbArray());
    assert.deepEqual([255, 255, 255], ccc('#ffffff').rgbArray());
    assert.deepEqual([255, 0, 0, 0.5], ccc('rgba(255, 0, 0, 0.5)').rgbArray());
    assert.deepEqual([0, 255, 0], ccc('cmyk(100%, 0%, 100%, 0%)').rgbArray());
    assert.deepEqual([0, 0, 255, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').rgbArray());
    assert.deepEqual([255, 255, 0], ccc('hsv(60, 100%, 100%)').rgbArray());
  });
});

describe('Color#rgbString()', function() {
  it('should return rgb string', function() {
    assert(ccc('black').rgbString() === 'rgb(0, 0, 0)');
    assert(ccc('#ffffff').rgbString() === 'rgb(255, 255, 255)');
    assert(ccc('rgba(255, 0, 0, 0.5)').rgbString() === 'rgba(255, 0, 0, 0.5)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').rgbString() === 'rgb(0, 255, 0)');
    assert(ccc('hsla(240, 100%, 50%, 0.5)').rgbString() === 'rgba(0, 0, 255, 0.5)');
    assert(ccc('hsv(60, 100%, 100%)').rgbString() === 'rgb(255, 255, 0)');
  });
});

describe('Color#cmyk()', function() {
  it('should return cmyk object', function() {
    assert.deepEqual({c: 0, m: 0, y: 0, k: 100}, ccc('black').cmyk());
    assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('#ffffff').cmyk());
    assert.deepEqual({c: 0, m: 100, y: 100, k: 0}, ccc('rgb(255, 0, 0)').cmyk());
    assert.deepEqual({c: 100, m: 0, y: 100, k: 0}, ccc('cmyk(100%, 0%, 100%, 0%)').cmyk());
    assert.deepEqual({c: 100, m: 100, y: 0, k: 0}, ccc('hsl(240, 100%, 50%)').cmyk());
    assert.deepEqual({c: 0, m: 0, y: 100, k: 0}, ccc('hsv(60, 100%, 100%)').cmyk());
  });
});

describe('Color#cmykArray()', function() {
  it('should return cmyk array', function() {
    assert.deepEqual([0, 0, 0, 100], ccc('black').cmykArray());
    assert.deepEqual([0, 0, 0, 0], ccc('#ffffff').cmykArray());
    assert.deepEqual([0, 100, 100, 0], ccc('rgb(255, 0, 0)').cmykArray());
    assert.deepEqual([100, 0, 100, 0], ccc('cmyk(100%, 0%, 100%, 0%)').cmykArray());
    assert.deepEqual([100, 100, 0, 0], ccc('hsl(240, 100%, 50%)').cmykArray());
    assert.deepEqual([0, 0, 100, 0], ccc('hsv(60, 100%, 100%)').cmykArray());
  });
});

describe('Color#cmykString()', function() {
  it('should return cmyk string', function() {
    assert(ccc('black').cmykString() === 'cmyk(0%, 0%, 0%, 100%)');
    assert(ccc('#ffffff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
    assert(ccc('rgb(255, 0, 0)').cmykString() === 'cmyk(0%, 100%, 100%, 0%)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').cmykString() === 'cmyk(100%, 0%, 100%, 0%)');
    assert(ccc('hsl(240, 100%, 50%)').cmykString() === 'cmyk(100%, 100%, 0%, 0%)');
    assert(ccc('hsv(60, 100%, 100%)').cmykString() === 'cmyk(0%, 0%, 100%, 0%)');
  });
});

describe('Color#hsl()', function() {
  it('should return hsl object', function() {
    assert.deepEqual({h: 0, s: 0, l: 0}, ccc('black').hsl());
    assert.deepEqual({h: 0, s: 0, l: 100}, ccc('#ffffff').hsl());
    assert.deepEqual({h: 0, s: 100, l: 50, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').hsl());
    assert.deepEqual({h: 120, s: 100, l: 50}, ccc('cmyk(100%, 0%, 100%, 0%)').hsl());
    assert.deepEqual({h: 240, s: 100, l: 50, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').hsl());
    assert.deepEqual({h: 60, s: 100, l: 50}, ccc('hsv(60, 100%, 100%)').hsl());
  });
});

describe('Color#hslArray()', function() {
  it('should return hsl array', function() {
    assert.deepEqual([0, 0, 0], ccc('black').hslArray());
    assert.deepEqual([0, 0, 100], ccc('#ffffff').hslArray());
    assert.deepEqual([0, 100, 50, 0.5], ccc('rgba(255, 0, 0, 0.5)').hslArray());
    assert.deepEqual([120, 100, 50], ccc('cmyk(100%, 0%, 100%, 0%)').hslArray());
    assert.deepEqual([240, 100, 50, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').hslArray());
    assert.deepEqual([60, 100, 50], ccc('hsv(60, 100%, 100%)').hslArray());
  });
});

describe('Color#hslString()', function() {
  it('should return hsl string', function() {
    assert(ccc('black').hslString() === 'hsl(0, 0%, 0%)');
    assert(ccc('#ffffff').hslString() === 'hsl(0, 0%, 100%)');
    assert(ccc('rgba(255, 0, 0, 0.5)').hslString() === 'hsla(0, 100%, 50%, 0.5)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').hslString() === 'hsl(120, 100%, 50%)');
    assert(ccc('hsla(240, 100%, 50%, 0.5)').hslString() === 'hsla(240, 100%, 50%, 0.5)');
    assert(ccc('hsv(60, 100%, 100%)').hslString() === 'hsl(60, 100%, 50%)');
  });
});

describe('Color#hsv()', function() {
  it('should return hsv object', function() {
    assert.deepEqual({h: 0, s: 0, v: 0}, ccc('black').hsv());
    assert.deepEqual({h: 0, s: 0, v: 100}, ccc('#ffffff').hsv());
    assert.deepEqual({h: 0, s: 100, v: 100, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').hsv());
    assert.deepEqual({h: 120, s: 100, v: 100}, ccc('cmyk(100%, 0%, 100%, 0%)').hsv());
    assert.deepEqual({h: 240, s: 100, v: 100, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').hsv());
    assert.deepEqual({h: 60, s: 100, v: 100}, ccc('hsv(60, 100%, 100%)').hsv());
  });
});

describe('Color#hsvArray()', function() {
  it('should return hsv array', function() {
    assert.deepEqual([0, 0, 0], ccc('black').hsvArray());
    assert.deepEqual([0, 0, 100], ccc('#ffffff').hsvArray());
    assert.deepEqual([0, 100, 100, 0.5], ccc('rgba(255, 0, 0, 0.5)').hsvArray());
    assert.deepEqual([120, 100, 100], ccc('cmyk(100%, 0%, 100%, 0%)').hsvArray());
    assert.deepEqual([240, 100, 100, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').hsvArray());
    assert.deepEqual([60, 100, 100], ccc('hsv(60, 100%, 100%)').hsvArray());
  });
});

describe('Color#hsvString()', function() {
  it('should return hsv string', function() {
    assert(ccc('black').hsvString() === 'hsv(0, 0%, 0%)');
    assert(ccc('#ffffff').hsvString() === 'hsv(0, 0%, 100%)');
    assert(ccc('rgba(255, 0, 0, 0.5)').hsvString() === 'hsva(0, 100%, 100%, 0.5)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').hsvString() === 'hsv(120, 100%, 100%)');
    assert(ccc('hsla(240, 100%, 50%, 0.5)').hsvString() === 'hsva(240, 100%, 100%, 0.5)');
    assert(ccc('hsv(60, 100%, 100%)').hsvString() === 'hsv(60, 100%, 100%)');
  });
});

describe('Color#invert()', function() {
  it('should return inverted', function() {
    assert(ccc('black').invert().hex() === '#ffffff');
    assert(ccc('#ffffff').invert().rgbString() === 'rgb(0, 0, 0)');
    assert(ccc('rgb(255, 0, 0)').invert().cmykString() === 'cmyk(100%, 0%, 0%, 0%)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').invert().hslString() === 'hsl(300, 100%, 50%)');
    assert(ccc('hsl(240, 100%, 50%)').invert().hsvString() === 'hsv(60, 100%, 100%)');
    assert(ccc('hsv(60, 100%, 100%)').invert().keyword() === 'blue');
  });
});

describe('Color#grayscale()', function() {
  it('should return grayscaled', function() {
    assert(ccc('#ff00ff').grayscale().hex() === '#696969');
    assert(ccc('rgb(255, 0, 0)').grayscale().rgbString() === 'rgb(76, 76, 76)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').grayscale().cmykString() === 'cmyk(0%, 0%, 0%, 41%)');
    assert(ccc('hsl(240, 100%, 50%)').grayscale().hslString() === 'hsl(0, 0%, 11%)');
    assert(ccc('hsv(60, 100%, 100%)').grayscale().hsvString() === 'hsv(0, 0%, 89%)');
  });
});

describe('Color#average()', function() {
  it('should return averaged', function() {
    assert(ccc('black').average(ccc('white')).keyword() === 'gray');
    assert(ccc('#ffffff').average(ccc('#ff0000')).hex() === '#ff8080');
    assert(ccc('rgb(255, 0, 0)').average(ccc('rgb(0, 255, 0)')).rgbString() === 'rgb(128, 128, 0)');
    assert(ccc('cmyk(100%, 0%, 100%, 0%)').average(ccc('cmyk(100%, 100%, 0%, 0%)')).cmykString() === 'cmyk(100%, 0%, 0%, 50%)');
    assert(ccc('hsl(240, 100%, 50%)').average(ccc('hsl(60, 100%, 50%)')).hslString() === 'hsl(0, 0%, 50%)');
    assert(ccc('hsv(60, 100%, 100%)').average(ccc('hsv(0, 0%, 0%)')).hsvString() === 'hsv(60, 100%, 50%)');
  });
});

describe('Color#red()', function() {
  it('should return red component', function() {
    assert(ccc('red').red() === 255);
    assert(ccc('rgba(0, 0, 0, 0.5)').red() === 0);
  });
});

describe('Color#red(val)', function() {
  it('should set red component', function() {
    assert(ccc('black').red(255).keyword() === 'red');
  });
});

describe('Color#green()', function() {
  it('should return green component', function() {
    assert(ccc('lime').green() === 255);
    assert(ccc('rgba(0, 0, 0, 0.5)').green() === 0);
  });
});

describe('Color#green(val)', function() {
  it('should set green component', function() {
    assert(ccc('black').green(255).keyword() === 'lime');
  });
});

describe('Color#blue()', function() {
  it('should return blue component', function() {
    assert(ccc('blue').blue() === 255);
    assert(ccc('rgba(0, 0, 0, 0.5)').blue() === 0);
  });
});

describe('Color#blue(val)', function() {
  it('should set blue component', function() {
    assert(ccc('black').blue(255).keyword() === 'blue');
  });
});

describe('Color#alpha()', function() {
  it('should return alpha component', function() {
    assert(ccc('rgba(0, 0, 0, 0.5)').alpha() === 0.5);
    assert(ccc('hsla(0, 0%, 0%, 0.7)').alpha() === 0.7);
  });
});

describe('Color#alpha(val)', function() {
  it('should set alpha component', function() {
    assert(ccc('black').alpha(0.5).rgbString() === 'rgba(0, 0, 0, 0.5)');
  });
});

describe('Color#cyan()', function() {
  it('should return cyan component', function() {
    assert(ccc('cyan').cyan() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').cyan() === 0);
  });
});

describe('Color#cyan(val)', function() {
  it('should set cyan component', function() {
    assert(ccc('white').cyan(100).keyword() === 'aqua');
  });
});

describe('Color#magenta()', function() {
  it('should return magenta component', function() {
    assert(ccc('magenta').magenta() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').magenta() === 0);
  });
});

describe('Color#magenta(val)', function() {
  it('should set magenta component', function() {
    assert(ccc('white').magenta(100).keyword() === 'fuchsia');
  });
});

describe('Color#yellow()', function() {
  it('should return yellow component', function() {
    assert(ccc('yellow').yellow() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').yellow() === 0);
  });
});

describe('Color#yellow(val)', function() {
  it('should set yellow component', function() {
    assert(ccc('white').yellow(100).keyword() === 'yellow');
  });
});

describe('Color#key()', function() {
  it('should return key component', function() {
    assert(ccc('black').key() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').key() === 100);
  });
});

describe('Color#key(val)', function() {
  it('should set key component', function() {
    assert(ccc('white').key(100).keyword() === 'black');
  });
});

describe('Color#hue()', function() {
  it('should return hue component', function() {
    assert(ccc('red').hue() === 0);
    assert(ccc('rgba(0, 0, 0, 0.5)').hue() === 0);
  });
});

describe('Color#hue(val)', function() {
  it('should set hue component', function() {
    assert(ccc('lime').hue(240).keyword() === 'blue');
  });
});

describe('Color#saturation()', function() {
  it('should return saturation component', function() {
    assert(ccc('lime').saturation() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').saturation() === 0);
  });
});

describe('Color#saturation(val)', function() {
  it('should set saturation component', function() {
    assert(ccc('gray').saturation(100).keyword() === 'red');
  });
});

describe('Color#lightness()', function() {
  it('should return lightness component', function() {
    assert(ccc('blue').lightness() === 50);
    assert(ccc('rgba(0, 0, 0, 0.5)').lightness() === 0);
  });
});

describe('Color#lightness(val)', function() {
  it('should set lightness component', function() {
    assert(ccc('lime').lightness(25).keyword() === 'green');
  });
});

describe('Color#value()', function() {
  it('should return value component', function() {
    assert(ccc('yellow').value() === 100);
    assert(ccc('rgba(0, 0, 0, 0.5)').value() === 0);
  });
});

describe('Color#value(val)', function() {
  it('should set value component', function() {
    assert(ccc('lime').value(50).keyword() === 'green');
  });
});

describe('Color#light()', function() {
  it('should detect light color', function() {
    assert(ccc('red').light() === true);
    assert(ccc('darkblue').light() === false);
    assert(ccc('#ffffff').light() === true);
    assert(ccc('rgb(0, 0, 0)').light() === false);
  });
});

describe('Color#dark()', function() {
  it('should detect dark color', function() {
    assert(ccc('purple').dark() === true);
    assert(ccc('lime').dark() === false);
    assert(ccc('#ffffff').dark() === false);
    assert(ccc('rgb(0, 0, 0)').dark() === true);
  });
});

describe('Color#lighten()', function() {
  it('should increase color lightness', function() {
    assert(ccc('blue').lighten(25).lightness() === 75);
    assert(ccc('lime').lighten(50).keyword() === 'white');
    assert(ccc('black').lighten(50).keyword() === 'gray');
  });
});

describe('Color#darken()', function() {
  it('should reduce color lightness', function() {
    assert(ccc('blue').darken(25).lightness() === 25);
    assert(ccc('red').darken(50).keyword() === 'black');
    assert(ccc('white').darken(50).keyword() === 'gray');
  });
});

describe('Color#saturate()', function() {
  it('should increase color saturation', function() {
    assert(ccc('gray').saturate(50).saturation() === 50);
  });
});

describe('Color#desaturate()', function() {
  it('should reduce color saturation', function() {
    assert(ccc('red').desaturate(50).saturation() === 50);
  });
});
