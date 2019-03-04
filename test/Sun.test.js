'use strict';

const expect = require("chai").expect;
const SunCoordinate = require('../src/planets/Sun');
const { JDateRepository } = require('@behaver/jdate');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const Angle = require('@behaver/angle');

const angle = new Angle;

describe('#SunCoordinate', () => {
  describe('Verify', () => {
    it('天文算法 例24.b', () => {
      let SunC = new SunCoordinate(new JDateRepository(2448908.5, 'jde'));
      let ECC = SunC.get();

      expect(ECC.l.getDegrees()).to.closeTo(199.907372, 0.000001);
      expect(ECC.b.getDegrees()).to.closeTo(0.000179, 0.00002);
      expect(ECC.radius).to.closeTo(0.99760775, 0.00000001);

      ECC.onFK5 = true;

      expect(ECC.l.getDegrees()).to.closeTo(199.907347, 0.000001);
      expect(ECC.b.getSeconds()).to.closeTo(0.62, 0.05);

      ECC.withNutation = true;
      ECC.withAnnualAberration = true;

      expect(ECC.l.getDegrees()).to.closeTo(angle.parseDACString('199°54′21.818″').getDegrees(), 0.000001);
      expect(ECC.b.getSeconds()).to.closeTo(0.62, 0.05);
      expect(ECC.radius).to.closeTo(0.99760775, 0.00000001);
    })
  });
})