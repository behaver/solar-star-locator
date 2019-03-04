'use strict';

const PlutoHECC = require('@behaver/pluto99-hecc');
const CoordinateCommon = require('../CoordinateCommon');
const { SphericalCoordinate3D } = require('@behaver/coordinate');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');

/**
 * 冥王星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class PlutoCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造冥王星 J2000 日心黄经坐标计算对象
    this.Calculator = new PlutoHECC(jdate);
  }

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
    let { r, theta, phi } = this.Calculator.rc.toSC();

    let ecc =  new EclipticCoordinate({
      sc: new SphericalCoordinate3D(r, theta, phi),
      centerMode: 'heliocentric',
      withNutation: false,
    });

    ecc.epoch = this.jdate;

    return ecc;
  }
}

module.exports = PlutoCoordinate;
