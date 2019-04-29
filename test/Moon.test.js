'use strict';

const expect = require("chai").expect;
const MoonPosition = require('../src/planets/Moon');
const { JDateRepository } = require('@behaver/jdate');
const { SystemSwitcher } = require('@behaver/celestial-coordinate');
const Angle = require('@behaver/angle');
const angle = new Angle;

describe('#MoonPosition', () => {
  describe('#verify', () => {
    it('许建伟寿星天文历文档', () => {
      let jdate = new JDateRepository(2454471.5, 'jde');
      let MP = new MoonPosition({ 
        time: jdate,
        withLightTimeEffect: true,
      });

      // console.log(MP.LightTimeEffect.calc().time.JDEC, MP.Calculator.l.inRound().getDegrees());

      let ECC = MP.get();

      let SS = new SystemSwitcher({
        coord: ECC,
      });

      let EQC0 = SS.to('eqc');

      EQC0.on({
        // epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      console.log(EQC0.get());
      expect(EQC0.ra.inRound().getDegrees()).to.closeTo(angle.parseHACString('17h 00m 58.061s').getDegrees(), 0.00002);
      expect(EQC0.dec.inRound(-180).getDegrees()).to.closeTo(angle.parseDACString('-27°38′33.691″').getDegrees(), 0.00001);

      ECC.on({
        // epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(ECC.l.inRound().getDegrees()).to.closeTo(angle.parseDACString('256°54′36.319″').getDegrees(), 0.00002);
      expect(ECC.b.inRound(-90).getDegrees()).to.closeTo(angle.parseDACString('-4°52′14.134″').getDegrees(), 0.00001);
    });

    it('JPL', () => {
      let jdate = new JDateRepository(2454471.5);
      let MP = new MoonPosition({ 
        time: jdate,
        withLightTimeEffect: true,
      });

      let ECC = MP.get();

      ECC.on({
        // epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(ECC.l.inRound().getDegrees()).to.closeTo(256.9192207, 0.00001);
    });
  });
})