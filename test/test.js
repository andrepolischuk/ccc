
var ccc = require('..');
var should = require('should');

describe('ager', function() {

  describe('#rgb', function() {

    it('should return `255, 255, 255`', function() {
      ccc.rgb('255, 255, 255').rgb().should.equal('255, 255, 255');
      ccc.hex('ffffff').rgb().should.equal('255, 255, 255');
      ccc.cmyk('0, 0, 0, 0').rgb().should.equal('255, 255, 255');
    });

    it('should return `0, 0, 0`', function() {
      ccc.rgb('0, 0, 0').rgb().should.equal('0, 0, 0');
      ccc.hex('000000').rgb().should.equal('0, 0, 0');
      ccc.cmyk('0, 0, 0, 1').rgb().should.equal('0, 0, 0');
    });

  });

  describe('#hex', function() {

    it('should return `ffffff`', function() {
      ccc.rgb('255, 255, 255').hex().should.equal('ffffff');
      ccc.hex('ffffff').hex().should.equal('ffffff');
      ccc.cmyk('0, 0, 0, 0').hex().should.equal('ffffff');
    });

    it('should return `000000`', function() {
      ccc.rgb('0, 0, 0').hex().should.equal('000000');
      ccc.hex('000000').hex().should.equal('000000');
      ccc.cmyk('0, 0, 0, 1').hex().should.equal('000000');
    });

  });

  describe('#cmyk', function() {

    it('should return `0, 0, 0, 0`', function() {
      ccc.rgb('255, 255, 255').cmyk().should.equal('0, 0, 0, 0');
      ccc.hex('ffffff').cmyk().should.equal('0, 0, 0, 0');
      ccc.cmyk('0, 0, 0, 0').cmyk().should.equal('0, 0, 0, 0');
    });

    it('should return `0, 0, 0, 1`', function() {
      ccc.rgb('0, 0, 0').cmyk().should.equal('0, 0, 0, 1');
      ccc.hex('000000').cmyk().should.equal('0, 0, 0, 1');
      ccc.cmyk('0, 0, 0, 1').cmyk().should.equal('0, 0, 0, 1');
    });

  });

  describe('#invert', function() {

    it('should return `255, 255, 255`', function() {
      ccc.rgb('0, 0, 0').invert().rgb().should.equal('255, 255, 255');
      ccc.hex('000000').invert().rgb().should.equal('255, 255, 255');
      ccc.cmyk('0, 0, 0, 1').invert().rgb().should.equal('255, 255, 255');
    });

    it('should return `000000`', function() {
      ccc.rgb('255, 255, 255').invert().hex().should.equal('000000');
      ccc.hex('ffffff').invert().hex().should.equal('000000');
      ccc.cmyk('0, 0, 0, 0').invert().hex().should.equal('000000');
    });

  });

  describe('#grayscale', function() {

    it('should return `787878`', function() {
      ccc.rgb('102, 153, 0').grayscale().hex().should.equal('787878');
      ccc.hex('669900').grayscale().hex().should.equal('787878');
      ccc.cmyk('0.33, 0, 1, 0.4').grayscale().hex().should.equal('787878');
    });

  });

});
