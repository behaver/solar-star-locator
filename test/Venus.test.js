'use strict';

const expect = require("chai").expect;
const VenusCoordinate = require('../src/planets/Venus');
const { JDateRepository } = require('@behaver/jdate');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const Angle = require('@behaver/angle');

const angle = new Angle;

describe('#VenusCoordinate', () => {
  describe('Verify', () => {
    it('天文算法 例31.a', () => {
      let venus = new VenusCoordinate(new JDateRepository(2448976.5, 'jde'));
      let sc = venus.get().sc;

      expect(sc.phi).to.closeTo(angle.setRadian(-68.6592582).inRound().getRadian(), 0.00001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.0457399).inRound(-90).getRadian(), 0.00001);
      expect(sc.r).to.closeTo(0.724603, 0.00001);
    });
  });
});
