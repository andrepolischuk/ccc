
var ccc = require('..');
var assert = require('assert');

describe('ccc(name)', function() {
  it('should parse name', function() {
    assert.deepEqual({r: 0, g: 0, b: 0}, ccc('black').vals);
    assert.deepEqual({r: 255, g: 255, b: 255}, ccc.key('white').vals);
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

describe('ccc(color)', function() {
  describe('#key()', function() {
    it('should return key object', function() {
      assert.deepEqual({key: 'black'}, ccc('black').key());
      assert.deepEqual({key: 'white'}, ccc('#ffffff').key());
      assert.deepEqual({key: 'red'}, ccc('rgb(255, 0, 0)').key());
      assert.deepEqual({key: 'lime'}, ccc('cmyk(100%, 0%, 100%, 0%)').key());
      assert.deepEqual({key: 'blue'}, ccc('hsl(240, 100%, 50%)').key());
      assert.deepEqual({key: 'yellow'}, ccc('hsv(60, 100%, 100%)').key());
    });
  });

  describe('#keyArray()', function() {
    it('should return key array', function() {
      assert.deepEqual(['black'], ccc('black').keyArray());
      assert.deepEqual(['white'], ccc('#ffffff').keyArray());
      assert.deepEqual(['red'], ccc('rgb(255, 0, 0)').keyArray());
      assert.deepEqual(['lime'], ccc('cmyk(100%, 0%, 100%, 0%)').keyArray());
      assert.deepEqual(['blue'], ccc('hsl(240, 100%, 50%)').keyArray());
      assert.deepEqual(['yellow'], ccc('hsv(60, 100%, 100%)').keyArray());
    });
  });

  describe('#keyString()', function() {
    it('should return key string', function() {
      assert(ccc('black').keyString() === 'black');
      assert(ccc('#ffffff').keyString() === 'white');
      assert(ccc('rgb(255, 0, 0)').keyString() === 'red');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').keyString() === 'lime');
      assert(ccc('hsl(240, 100%, 50%)').keyString() === 'blue');
      assert(ccc('hsv(60, 100%, 100%)').keyString() === 'yellow');
    });
  });

  describe('#hex()', function() {
    it('should return hex object', function() {
      assert.deepEqual({hex: '000000'}, ccc('black').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc('#ffffff').hex());
      assert.deepEqual({hex: 'ff0000'}, ccc('rgb(255, 0, 0)').hex());
      assert.deepEqual({hex: '00ff00'}, ccc('cmyk(100%, 0%, 100%, 0%)').hex());
      assert.deepEqual({hex: '0000ff'}, ccc('hsl(240, 100%, 50%)').hex());
      assert.deepEqual({hex: 'ffff00'}, ccc('hsv(60, 100%, 100%)').hex());
    });
  });

  describe('#hexArray()', function() {
    it('should return hex array', function() {
      assert.deepEqual(['000000'], ccc('black').hexArray());
      assert.deepEqual(['ffffff'], ccc('#ffffff').hexArray());
      assert.deepEqual(['ff0000'], ccc('rgb(255, 0, 0)').hexArray());
      assert.deepEqual(['00ff00'], ccc('cmyk(100%, 0%, 100%, 0%)').hexArray());
      assert.deepEqual(['0000ff'], ccc('hsl(240, 100%, 50%)').hexArray());
      assert.deepEqual(['ffff00'], ccc('hsv(60, 100%, 100%)').hexArray());
    });
  });

  describe('#hexString()', function() {
    it('should return hex string', function() {
      assert(ccc('black').hexString() === '#000000');
      assert(ccc('#ffffff').hexString() === '#ffffff');
      assert(ccc('rgb(255, 0, 0)').hexString() === '#ff0000');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').hexString() === '#00ff00');
      assert(ccc('hsl(240, 100%, 50%)').hexString() === '#0000ff');
      assert(ccc('hsv(60, 100%, 100%)').hexString() === '#ffff00');
    });
  });

  describe('#rgb()', function() {
    it('should return rgb object', function() {
      assert.deepEqual({r: 0, g: 0, b: 0}, ccc('black').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc('#ffffff').rgb());
      assert.deepEqual({r: 255, g: 0, b: 0, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').rgb());
      assert.deepEqual({r: 0, g: 255, b: 0}, ccc('cmyk(100%, 0%, 100%, 0%)').rgb());
      assert.deepEqual({r: 0, g: 0, b: 255, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').rgb());
      assert.deepEqual({r: 255, g: 255, b: 0}, ccc('hsv(60, 100%, 100%)').rgb());
    });
  });

  describe('#rgbArray()', function() {
    it('should return rgb array', function() {
      assert.deepEqual([0, 0, 0], ccc('black').rgbArray());
      assert.deepEqual([255, 255, 255], ccc('#ffffff').rgbArray());
      assert.deepEqual([255, 0, 0, 0.5], ccc('rgba(255, 0, 0, 0.5)').rgbArray());
      assert.deepEqual([0, 255, 0], ccc('cmyk(100%, 0%, 100%, 0%)').rgbArray());
      assert.deepEqual([0, 0, 255, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').rgbArray());
      assert.deepEqual([255, 255, 0], ccc('hsv(60, 100%, 100%)').rgbArray());
    });
  });

  describe('#rgbString()', function() {
    it('should return rgb string', function() {
      assert(ccc('black').rgbString() === 'rgb(0, 0, 0)');
      assert(ccc('#ffffff').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc('rgba(255, 0, 0, 0.5)').rgbString() === 'rgba(255, 0, 0, 0.5)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').rgbString() === 'rgb(0, 255, 0)');
      assert(ccc('hsla(240, 100%, 50%, 0.5)').rgbString() === 'rgba(0, 0, 255, 0.5)');
      assert(ccc('hsv(60, 100%, 100%)').rgbString() === 'rgb(255, 255, 0)');
    });
  });

  describe('#cmyk()', function() {
    it('should return cmyk object', function() {
      assert.deepEqual({c: 0, m: 0, y: 0, k: 100}, ccc('black').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('#ffffff').cmyk());
      assert.deepEqual({c: 0, m: 100, y: 100, k: 0}, ccc('rgb(255, 0, 0)').cmyk());
      assert.deepEqual({c: 100, m: 0, y: 100, k: 0}, ccc('cmyk(100%, 0%, 100%, 0%)').cmyk());
      assert.deepEqual({c: 100, m: 100, y: 0, k: 0}, ccc('hsl(240, 100%, 50%)').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 100, k: 0}, ccc('hsv(60, 100%, 100%)').cmyk());
    });
  });

  describe('#cmykArray()', function() {
    it('should return cmyk array', function() {
      assert.deepEqual([0, 0, 0, 100], ccc('black').cmykArray());
      assert.deepEqual([0, 0, 0, 0], ccc('#ffffff').cmykArray());
      assert.deepEqual([0, 100, 100, 0], ccc('rgb(255, 0, 0)').cmykArray());
      assert.deepEqual([100, 0, 100, 0], ccc('cmyk(100%, 0%, 100%, 0%)').cmykArray());
      assert.deepEqual([100, 100, 0, 0], ccc('hsl(240, 100%, 50%)').cmykArray());
      assert.deepEqual([0, 0, 100, 0], ccc('hsv(60, 100%, 100%)').cmykArray());
    });
  });

  describe('#cmykString()', function() {
    it('should return cmyk string', function() {
      assert(ccc('black').cmykString() === 'cmyk(0%, 0%, 0%, 100%)');
      assert(ccc('#ffffff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc('rgb(255, 0, 0)').cmykString() === 'cmyk(0%, 100%, 100%, 0%)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').cmykString() === 'cmyk(100%, 0%, 100%, 0%)');
      assert(ccc('hsl(240, 100%, 50%)').cmykString() === 'cmyk(100%, 100%, 0%, 0%)');
      assert(ccc('hsv(60, 100%, 100%)').cmykString() === 'cmyk(0%, 0%, 100%, 0%)');
    });
  });

  describe('#hsl()', function() {
    it('should return hsl object', function() {
      assert.deepEqual({h: 0, s: 0, l: 0}, ccc('black').hsl());
      assert.deepEqual({h: 0, s: 0, l: 100}, ccc('#ffffff').hsl());
      assert.deepEqual({h: 0, s: 100, l: 50, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').hsl());
      assert.deepEqual({h: 120, s: 100, l: 50}, ccc('cmyk(100%, 0%, 100%, 0%)').hsl());
      assert.deepEqual({h: 240, s: 100, l: 50, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').hsl());
      assert.deepEqual({h: 60, s: 100, l: 50}, ccc('hsv(60, 100%, 100%)').hsl());
    });
  });

  describe('#hslArray()', function() {
    it('should return hsl array', function() {
      assert.deepEqual([0, 0, 0], ccc('black').hslArray());
      assert.deepEqual([0, 0, 100], ccc('#ffffff').hslArray());
      assert.deepEqual([0, 100, 50, 0.5], ccc('rgba(255, 0, 0, 0.5)').hslArray());
      assert.deepEqual([120, 100, 50], ccc('cmyk(100%, 0%, 100%, 0%)').hslArray());
      assert.deepEqual([240, 100, 50, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').hslArray());
      assert.deepEqual([60, 100, 50], ccc('hsv(60, 100%, 100%)').hslArray());
    });
  });

  describe('#hslString()', function() {
    it('should return hsl string', function() {
      assert(ccc('black').hslString() === 'hsl(0, 0%, 0%)');
      assert(ccc('#ffffff').hslString() === 'hsl(0, 0%, 100%)');
      assert(ccc('rgba(255, 0, 0, 0.5)').hslString() === 'hsla(0, 100%, 50%, 0.5)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').hslString() === 'hsl(120, 100%, 50%)');
      assert(ccc('hsla(240, 100%, 50%, 0.5)').hslString() === 'hsla(240, 100%, 50%, 0.5)');
      assert(ccc('hsv(60, 100%, 100%)').hslString() === 'hsl(60, 100%, 50%)');
    });
  });

  describe('#hsv()', function() {
    it('should return hsv object', function() {
      assert.deepEqual({h: 0, s: 0, v: 0}, ccc('black').hsv());
      assert.deepEqual({h: 0, s: 0, v: 100}, ccc('#ffffff').hsv());
      assert.deepEqual({h: 0, s: 100, v: 100, a: 0.5}, ccc('rgba(255, 0, 0, 0.5)').hsv());
      assert.deepEqual({h: 120, s: 100, v: 100}, ccc('cmyk(100%, 0%, 100%, 0%)').hsv());
      assert.deepEqual({h: 240, s: 100, v: 100, a: 0.5}, ccc('hsla(240, 100%, 50%, 0.5)').hsv());
      assert.deepEqual({h: 60, s: 100, v: 100}, ccc('hsv(60, 100%, 100%)').hsv());
    });
  });

  describe('#hsvArray()', function() {
    it('should return hsv array', function() {
      assert.deepEqual([0, 0, 0], ccc('black').hsvArray());
      assert.deepEqual([0, 0, 100], ccc('#ffffff').hsvArray());
      assert.deepEqual([0, 100, 100, 0.5], ccc('rgba(255, 0, 0, 0.5)').hsvArray());
      assert.deepEqual([120, 100, 100], ccc('cmyk(100%, 0%, 100%, 0%)').hsvArray());
      assert.deepEqual([240, 100, 100, 0.5], ccc('hsla(240, 100%, 50%, 0.5)').hsvArray());
      assert.deepEqual([60, 100, 100], ccc('hsv(60, 100%, 100%)').hsvArray());
    });
  });

  describe('#hsvString()', function() {
    it('should return hsv string', function() {
      assert(ccc('black').hsvString() === 'hsv(0, 0%, 0%)');
      assert(ccc('#ffffff').hsvString() === 'hsv(0, 0%, 100%)');
      assert(ccc('rgba(255, 0, 0, 0.5)').hsvString() === 'hsva(0, 100%, 100%, 0.5)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').hsvString() === 'hsv(120, 100%, 100%)');
      assert(ccc('hsla(240, 100%, 50%, 0.5)').hsvString() === 'hsva(240, 100%, 100%, 0.5)');
      assert(ccc('hsv(60, 100%, 100%)').hsvString() === 'hsv(60, 100%, 100%)');
    });
  });

  describe('#invert()', function() {
    it('should return inverted', function() {
      assert(ccc('black').invert().hexString() === '#ffffff');
      assert(ccc('#ffffff').invert().rgbString() === 'rgb(0, 0, 0)');
      assert(ccc('rgb(255, 0, 0)').invert().cmykString() === 'cmyk(100%, 0%, 0%, 0%)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').invert().hslString() === 'hsl(300, 100%, 50%)');
      assert(ccc('hsl(240, 100%, 50%)').invert().hsvString() === 'hsv(60, 100%, 100%)');
      assert(ccc('hsv(60, 100%, 100%)').invert().keyString() === 'blue');
    });
  });

  describe('#grayscale()', function() {
    it('should return grayscaled', function() {
      assert(ccc('#ff00ff').grayscale().hexString() === '#696969');
      assert(ccc('rgb(255, 0, 0)').grayscale().rgbString() === 'rgb(76, 76, 76)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').grayscale().cmykString() === 'cmyk(0%, 0%, 0%, 41%)');
      assert(ccc('hsl(240, 100%, 50%)').grayscale().hslString() === 'hsl(0, 0%, 11%)');
      assert(ccc('hsv(60, 100%, 100%)').grayscale().hsvString() === 'hsv(0, 0%, 89%)');
    });
  });

  describe('#average()', function() {
    it('should return averaged', function() {
      assert(ccc('black').average(ccc('white')).keyString() === 'gray');
      assert(ccc('#ffffff').average(ccc('#ff0000')).hexString() === '#ff8080');
      assert(ccc('rgb(255, 0, 0)').average(ccc('rgb(0, 255, 0)')).rgbString() === 'rgb(128, 128, 0)');
      assert(ccc('cmyk(100%, 0%, 100%, 0%)').average(ccc('cmyk(100%, 100%, 0%, 0%)')).cmykString() === 'cmyk(100%, 0%, 0%, 50%)');
      assert(ccc('hsl(240, 100%, 50%)').average(ccc('hsl(60, 100%, 50%)')).hslString() === 'hsl(0, 0%, 50%)');
      assert(ccc('hsv(60, 100%, 100%)').average(ccc('hsv(0, 0%, 0%)')).hsvString() === 'hsv(60, 100%, 50%)');
    });
  });
});
