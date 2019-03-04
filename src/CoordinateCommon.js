'use strict';

const { EclipticCoordinate } = require('@behaver/celestial-coordinate');

/**
 * 太阳系行星坐标公有父类
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class CoordinateCommon {

  /**
   * 设置参考时间属性
   * 
   * @param  {JDateRepository} value 参考时间属性值
   */
  set jdate(value) {
    this.Calculator.obTime = value;
  }

  /**
   * 获取参考时间属性
   * 
   * @return {JDateRepository} 参考时间属性值
   */
  get jdate() {
    return this.Calculator.obTime;
  }

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
    return new EclipticCoordinate({
      // l: this.Calculator.l.inRound().getDegrees(),
      // b: this.Calculator.b.inRound(-90).getDegrees(),
      // radius: this.Calculator.r,
      sc: this.Calculator.sc,
      centerMode: 'heliocentric',
      epoch: this.Calculator.obTime,
      withNutation: false,
    });
  }
}

module.exports = CoordinateCommon;
