
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

  describe('#hex()', function() {
    it('should return hex', function() {
      assert(ccc('#fff').hex() === 'ffffff');
      assert(ccc('#ffffff').hex() === 'ffffff');
      assert(ccc.hex('fff').hex() === 'ffffff');
      assert(ccc.hex('ffffff').hex() === 'ffffff');
    });
  });

  describe('#rgb()', function() {
    it('should return rgb', function() {
      assert(ccc('#fff').rgb() === '255, 255, 255');
      assert(ccc('#ffffff').rgb() === '255, 255, 255');
      assert(ccc.hex('fff').rgb() === '255, 255, 255');
      assert(ccc.hex('ffffff').rgb() === '255, 255, 255');
    });
  });

  describe('#cmyk()', function() {
    it('should return cmyk', function() {
      assert(ccc('#fff').cmyk() === '0, 0, 0, 0');
      assert(ccc('#ffffff').cmyk() === '0, 0, 0, 0');
      assert(ccc.hex('fff').cmyk() === '0, 0, 0, 0');
      assert(ccc.hex('ffffff').cmyk() === '0, 0, 0, 0');
    });
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

  describe('#hex()', function() {
    it('should return hex', function() {
      assert(ccc('rgb(255, 255, 255)').hex() === 'ffffff');
      assert(ccc('rgba(255, 255, 255, .5)').hex() === 'ffffff');
      assert(ccc({r: 255, g: 255, b: 255}).hex() === 'ffffff');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).hex() === 'ffffff');
      assert(ccc.rgb(255, 255, 255).hex() === 'ffffff');
      assert(ccc.rgb(255, 255, 255, .5).hex() === 'ffffff');
    });
  });

  describe('#rgb()', function() {
    it('should return rgb', function() {
      assert(ccc('rgb(255, 255, 255)').rgb() === '255, 255, 255');
      assert(ccc('rgba(255, 255, 255, .5)').rgb() === '255, 255, 255');
      assert(ccc({r: 255, g: 255, b: 255}).rgb() === '255, 255, 255');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).rgb() === '255, 255, 255');
      assert(ccc.rgb(255, 255, 255).rgb() === '255, 255, 255');
      assert(ccc.rgb(255, 255, 255, .5).rgb() === '255, 255, 255');
    });
  });

  describe('#cmyk()', function() {
    it('should return hex', function() {
      assert(ccc('rgb(255, 255, 255)').cmyk() === '0, 0, 0, 0');
      assert(ccc('rgba(255, 255, 255, .5)').cmyk() === '0, 0, 0, 0');
      assert(ccc({r: 255, g: 255, b: 255}).cmyk() === '0, 0, 0, 0');
      assert(ccc({r: 255, g: 255, b: 255, a: .5}).cmyk() === '0, 0, 0, 0');
      assert(ccc.rgb(255, 255, 255).cmyk() === '0, 0, 0, 0');
      assert(ccc.rgb(255, 255, 255, .5).cmyk() === '0, 0, 0, 0');
    });
  });
});

describe('ccc(cmyk)', function() {
  it('should parse cmyk', function() {
    assert(typeof ccc('cmyk(0%, 0%, 0%, 0%)') === 'object');
    assert(typeof ccc({c: 0, m: 0, y: 0, k: 0}) === 'object');
    assert(typeof ccc.cmyk(0, 0, 0, 0) === 'object');
  });

  describe('#hex()', function() {
    it('should return hex', function() {
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').hex() === 'ffffff');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).hex() === 'ffffff');
      assert(ccc.cmyk(0, 0, 0, 0).hex() === 'ffffff');
    });
  });

  describe('#rgb()', function() {
    it('should return rgb', function() {
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').rgb() === '255, 255, 255');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).rgb() === '255, 255, 255');
      assert(ccc.cmyk(0, 0, 0, 0).rgb() === '255, 255, 255');
    });
  });

  describe('#cmyk()', function() {
    it('should return cmyk', function() {
      assert(ccc('cmyk(0%, 0%, 0%, 0%)').cmyk() === '0, 0, 0, 0');
      assert(ccc({c: 0, m: 0, y: 0, k: 0}).cmyk() === '0, 0, 0, 0');
      assert(ccc.cmyk(0, 0, 0, 0).cmyk() === '0, 0, 0, 0');
    });
  });
});

describe('Color#invert()', function() {

  it('should return `255, 255, 255`', function() {
    assert(ccc.rgb(0, 0, 0).invert().rgb() === '255, 255, 255');
    assert(ccc.hex('000000').invert().rgb() === '255, 255, 255');
    assert(ccc.cmyk(0, 0, 0, 100).invert().rgb() === '255, 255, 255');
  });

  it('should return `000000`', function() {
    assert(ccc.rgb(255, 255, 255).invert().hex() === '000000');
    assert(ccc.hex('ffffff').invert().hex() === '000000');
    assert(ccc.cmyk(0, 0, 0, 0).invert().hex() === '000000');
  });

});

describe('Color#grayscale()', function() {

  it('should return `787878`', function() {
    assert(ccc.rgb(102, 153, 0).grayscale().hex() === '787878');
    assert(ccc.hex('669900').grayscale().hex() === '787878');
    assert(ccc.cmyk(33, 0, 100, 40).grayscale().hex() === '787878');
  });

});

describe('Color#average()', function() {

  it('should return `666666`', function() {
    assert(ccc.rgb(51, 51, 51).average(ccc.rgb(153, 153, 153)).hex() === '666666');
    assert(ccc.hex('333333').average(ccc.hex('999999')).hex() === '666666');
  });

});
