'use strict';

const EarthPosition = require('./Earth');
const PlutoHECC = require('@behaver/pluto99-hecc');
const CommonPosition = require('../CommonPosition');
const { SphericalCoordinate3D } = require('@behaver/coordinate');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * PlutoPosition
 * 
 * 冥王星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class PlutoPosition extends CommonPosition {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} options.time                参考时间
   * @param {Boolean}         options.withLightTimeEffect 考虑光行时修正
   */
  constructor({
    time,
    withLightTimeEffect,
  }) {
    super({
      withLightTimeEffect,
    });

    // 构造冥王星 J2000 日心黄经坐标计算对象
    this.Calculator = new PlutoHECC(time);

    let EP = new EarthPosition({
      time,
    });

    let earthCoord = EP.get();
    earthCoord.onJ2000();

    this.LightTimeEffect = new LightTimeEffect({
      time: this.time,
      originPositionProvider: earthCoord,
      planetPositionProvider: new PlutoHECC(time),
    });
  }

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
    let sc;

    if (this.withLightTimeEffect) {
      let lte_res = this.LightTimeEffect.calc();
      let { r, theta, phi } = lte_res.sc;
      sc = new SphericalCoordinate3D(r, theta, phi);
    } else {
      let { r, theta, phi } = this.Calculator.rc.toSC();
      sc = new SphericalCoordinate3D(r, theta, phi);
    }

    let ecc =  new EclipticCoordinate({
      sc,
      centerMode: 'heliocentric',
      withNutation: false,
    });

    ecc.epoch = this.time;

    return ecc;
  }
}

module.exports = PlutoPosition;
