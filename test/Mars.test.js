'use strict';

const expect = require("chai").expect;
const MarsPosition = require('../src/planets/Mars');
const { JDateRepository } = require('@behaver/jdate');
const { SystemSwitcher } = require('@behaver/celestial-coordinate');

describe('#MarsPosition', () => {
  describe('#Verify', () => {
    it('#JPL 对比测试', () => {
      let jdate = new JDateRepository(2458582.5);
      let MP = new MarsPosition({ 
        time: jdate,
        withLightTimeEffect: true, 
      });

      let ECC = MP.get();

      ECC.onGeocentric();

      let SS = new SystemSwitcher({
        coord: ECC,
      });

      let EQC0 = SS.to('eqc');
      EQC0.onJ2000();

      expect(EQC0.ra.inRound().getDegrees()).to.closeTo(63.4162628, 0.00007);
      expect(EQC0.dec.inRound().getDegrees()).to.closeTo(22.1740401, 0.00003);

      EQC0.on({
        epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(EQC0.ra.inRound().getDegrees()).to.closeTo(63.6933751, 0.00008);
      expect(EQC0.dec.inRound().getDegrees()).to.closeTo(22.2196102, 0.00003);
    
      ECC.on({
        epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(ECC.l.inRound().getDegrees()).to.closeTo(65.7748201, 0.00008);
      expect(ECC.b.inRound().getDegrees()).to.closeTo(0.9685752, 0.00003);
    });
  });
})