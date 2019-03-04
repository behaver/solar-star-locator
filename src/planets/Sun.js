'use strict';

const { EarthHECC } = require('@behaver/solar-planets-hecc');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const CoordinateCommon = require('../CoordinateCommon');

/**
 * 太阳坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class SunCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造地球日心黄经坐标计算对象
    this.Calculator = new EarthHECC(jdate);
  }

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
  	return new EclipticCoordinate({
      l: (this.Calculator.l.inRound().getDegrees() + 180) % 360,
      b: -this.Calculator.b.inRound(-90).getDegrees(),
      radius: this.Calculator.r,
      centerMode: 'geocentric',
      epoch: this.Calculator.obTime,
      withNutation: false,
    });
  }
}

module.exports = SunCoordinate;
