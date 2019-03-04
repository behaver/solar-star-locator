'use strict';

const { SaturnHECC } = require('@behaver/solar-planets-hecc');
const CoordinateCommon = require('../CoordinateCommon');

/**
 * 土星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class SaturnCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造土星日心黄经坐标计算对象
    this.Calculator = new SaturnHECC(jdate);
  }
}

module.exports = SaturnCoordinate;
