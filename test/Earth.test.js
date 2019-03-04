'use strict';

const expect = require("chai").expect;
const EarthCoordinate = require('../src/planets/Earth');
const { JDateRepository } = require('@behaver/jdate');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const Angle = require('@behaver/angle');

const angle = new Angle;

describe('#EarthCoordinate', () => {

  describe('#constructor(jdate)', () => {
    it('The param jdate should be a valid JDateRepository.', () => {
      expect(() => {
        new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
      }).not.to.throw();

      expect(() => {
        new EarthCoordinate();
      }).to.throw();

      expect(() => {
        new EarthCoordinate(123);
      }).to.throw();
    });
  });

  describe('#set jdate(value)', () => {
    it('The param value should be a valid JDateRepository.', () => {
      expect(() => {
        let EC = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
        EC.jdate = new JDateRepository(2448908, 'jde');
      }).not.to.throw();

      expect(() => {
        let EC = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
        EC.jdate = 123;
      }).to.throw();
    });

    it('After setted, the property jdate should be changed.', () => {
      let EC = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
      EC.jdate = new JDateRepository(2448908, 'jde');

      expect(EC.jdate.JDE).to.equal(2448908);
    });
  });

  describe('#get jdate()', () => {
    it('The return should be a JDateRepository.', () => {
      let EC = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
      expect(EC.jdate).to.be.an.instanceof(JDateRepository);
    })
  });

  describe('#get()', () => {
    it('The return should be a EclipticCoordinate.', () => {
      let EC = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
      expect(EC.get()).to.be.an.instanceof(EclipticCoordinate);
    });
  });

  describe('Verify', () => {
    it('天文算法 例.24.b', () => {
      let ec = new EarthCoordinate(new JDateRepository(2448908.5, 'jde'));
      let sc = ec.get().sc;

      expect(sc.phi).to.closeTo(angle.setRadian(-43.63484796).inRound().getRadian(), 0.00000001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.00000312).inRound(-90).getRadian(), 0.000001);
      expect(sc.r).to.closeTo(0.99760775, 0.00000001);
    })
  });
})