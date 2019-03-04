'use strict';

const expect = require("chai").expect;
const PlutoCoordinate = require('../src/planets/Pluto');
const { JDateRepository } = require('@behaver/jdate');

describe('#PlutoCoordinate', () => {
  describe('#verify', () => {
    it('天文算法 例36.a', () => {
      let jdate = new JDateRepository(2448908.5, 'jde');
      let pluto = new PlutoCoordinate(jdate);

      let ECC = pluto.get();

      ECC.onJ2000();

      expect(ECC.l.inRound().getDegrees()).to.closeTo(232.74009, 0.0006);
      expect(ECC.b.inRound(-90).getDegrees()).to.closeTo(14.58769, 0.0002);
      expect(ECC.radius).to.closeTo(29.711383, 0.0004);
    });
  });
})