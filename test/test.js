
var ccc = require('..');
var assert = require('assert');

describe('ccc(hex)', function() {
  it('should parse hex', function() {
    assert(typeof ccc('#fff') === 'object');
    assert(typeof ccc('#ffffff') === 'object');
    assert(typeof ccc({hex: 'fff'}) === 'object');
    assert(typeof ccc({hex: 'ffffff'}) === 'object');
    assert(typeof ccc.hex('fff') === 'object');
    assert(typeof ccc.hex('ffffff') === 'object');
  });
});

describe('ccc(rgb)', function() {
  it('should parse rgb', function() {
    assert(typeof ccc('rgb(255, 255, 255)') === 'object');
    assert(typeof ccc('rgba(255, 255, 255, .5)') === 'object');
    assert(typeof ccc({r: 255, g: 255, b: 255}) === 'object');
    assert(typeof ccc({r: 255, g: 255, b: 255, a: .5}) === 'object');
    assert(typeof ccc.rgb(255, 255, 255) === 'object');
    assert(typeof ccc.rgb(255, 255, 255, .5) === 'object');
  });
});

describe('ccc(cmyk)', function() {
  it('should parse cmyk', function() {
    assert(typeof ccc('cmyk(0%, 0%, 0%, 0%)') === 'object');
    assert(typeof ccc({c: 0, m: 0, y: 0, k: 0}) === 'object');
    assert(typeof ccc.cmyk(0, 0, 0, 0) === 'object');
  });
});

describe('ccc(color)', function() {
  describe('#hex()', function() {
    it('should return hex object', function() {
      assert.deepEqual({hex: 'ffffff'}, ccc('#fff').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc('#ffffff').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc.hex('fff').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc.hex('ffffff').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc('rgb(255, 255, 255)').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc('rgba(255, 255, 255, .5)').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc({r: 255, g: 255, b: 255}).hex());
      assert.deepEqual({hex: 'ffffff'}, ccc({r: 255, g: 255, b: 255, a: .5}).hex());
      assert.deepEqual({hex: 'ffffff'}, ccc.rgb(255, 255, 255).hex());
      assert.deepEqual({hex: 'ffffff'}, ccc.rgb(255, 255, 255, .5).hex());
      assert.deepEqual({hex: 'ffffff'}, ccc('cmyk(0%, 0%, 0%, 0%)').hex());
      assert.deepEqual({hex: 'ffffff'}, ccc({c: 0, m: 0, y: 0, k: 0}).hex());
      assert.deepEqual({hex: 'ffffff'}, ccc.cmyk(0, 0, 0, 0).hex());
    });
  });

  describe('#hexString()', function() {
    it('should return hex string', function() {
      assert(ccc('#fff').hexString() === '#ffffff');
      assert(ccc('#ffffff').hexString() === '#ffffff');
      assert(ccc.hex('fff').hexString() === '#ffffff');
      assert(ccc.hex('ffffff').hexString() === '#ffffff');
      assert(ccc('rgb(255, 255, 255)').hexString() === '#ffffff');
      assert(ccc('rgba(255, 255, 255, .5)').hexString() === '#ffffff');
      assert(ccc({r: 255, g: 255, b: 255}).hexString() === '#ffffff');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).hexString() === '#ffffff');
      assert(ccc.rgb(255, 255, 255).hexString() === '#ffffff');
      assert(ccc.rgb(255, 255, 255, .5).hexString() === '#ffffff');
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').hexString() === '#ffffff');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).hexString() === '#ffffff');
      assert(ccc.cmyk(0, 0, 0, 0).hexString() === '#ffffff');
    });
  });

  describe('#rgb()', function() {
    it('should return rgb object', function() {
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc('#fff').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc('#ffffff').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc.hex('fff').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc.hex('ffffff').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc('rgb(255, 255, 255)').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255, a: .5}, ccc('rgba(255, 255, 255, .5)').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc({r: 255, g: 255, b: 255}).rgb());
      assert.deepEqual({r: 255, g: 255, b: 255, a: .5}, ccc({r: 255, g: 255, b: 255, a: .5}).rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc.rgb(255, 255, 255).rgb());
      assert.deepEqual({r: 255, g: 255, b: 255, a: .5}, ccc.rgb(255, 255, 255, .5).rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc('cmyk(0%, 0%, 0%, 0%)').rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc({c: 0, m: 0, y: 0, k: 0}).rgb());
      assert.deepEqual({r: 255, g: 255, b: 255}, ccc.cmyk(0, 0, 0, 0).rgb());
    });
  });

  describe('#rgbString()', function() {
    it('should return rgb string', function() {
      assert(ccc('#fff').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc('#ffffff').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc.hex('fff').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc.hex('ffffff').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc('rgb(255, 255, 255)').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc('rgba(255, 255, 255, .5)').rgbString() === 'rgba(255, 255, 255, 0.5)');
      assert(ccc({r: 255, g: 255, b: 255}).rgbString() === 'rgb(255, 255, 255)');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).rgbString() === 'rgba(255, 255, 255, 0.5)');
      assert(ccc.rgb(255, 255, 255).rgbString() === 'rgb(255, 255, 255)');
      assert(ccc.rgb(255, 255, 255, .5).rgbString() === 'rgba(255, 255, 255, 0.5)');
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').rgbString() === 'rgb(255, 255, 255)');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).rgbString() === 'rgb(255, 255, 255)');
      assert(ccc.cmyk(0, 0, 0, 0).rgbString() === 'rgb(255, 255, 255)');
    });
  });

  describe('#cmyk()', function() {
    it('should return cmyk object', function() {
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('#fff').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('#ffffff').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc.hex('fff').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc.hex('ffffff').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('rgb(255, 255, 255)').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('rgba(255, 255, 255, .5)').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc({r: 255, g: 255, b: 255}).cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc({r: 255, g: 255, b: 255, a: .5}).cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc.rgb(255, 255, 255).cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc.rgb(255, 255, 255, .5).cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc('cmyk(0%, 0%, 0%, 0%)').cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc({c: 0, m: 0, y: 0, k: 0}).cmyk());
      assert.deepEqual({c: 0, m: 0, y: 0, k: 0}, ccc.cmyk(0, 0, 0, 0).cmyk());
    });
  });

  describe('#cmykString()', function() {
    it('should return cmyk string', function() {
      assert(ccc('#fff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc('#ffffff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc.hex('fff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc.hex('ffffff').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc('rgb(255, 255, 255)').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc('rgba(255, 255, 255, .5)').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc({r: 255, g: 255, b: 255}).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc.rgb(255, 255, 255).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc.rgb(255, 255, 255, .5).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
      assert(ccc.cmyk(0, 0, 0, 0).cmykString() === 'cmyk(0%, 0%, 0%, 0%)');
    });
  });

  describe('#invert()', function() {
    it('should return inverted', function() {
      assert(ccc.rgb(255, 255, 255).invert().hexString() === '#000000');
      assert(ccc.hex('ffffff').invert().hexString() === '#000000');
      assert(ccc.cmyk(0, 0, 0, 0).invert().hexString() === '#000000');
    });
  });

  describe('#grayscale()', function() {
    it('should return grayscaled', function() {
      assert(ccc.rgb(102, 153, 0).grayscale().hexString() === '#787878');
      assert(ccc.hex('669900').grayscale().hexString() === '#787878');
      assert(ccc.cmyk(33, 0, 100, 40).grayscale().hexString() === '#787878');
    });
  });

  describe('#average()', function() {
    it('should return averaged', function() {
      assert(ccc.rgb(51, 51, 51).average(ccc.rgb(153, 153, 153)).hexString() === '#666666');
      assert(ccc.hex('333333').average(ccc.hex('999999')).hexString() === '#666666');
      assert(ccc.cmyk(0, 0, 0, 80).average(ccc.cmyk(0, 0, 0, 40)).hexString() === '#666666');
    });
  });
});
