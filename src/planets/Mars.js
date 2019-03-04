'use strict';

const { MarsHECC } = require('@behaver/solar-planets-hecc');
const CoordinateCommon = require('../CoordinateCommon');

/**
 * 火星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class MarsCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造火星日心黄经坐标计算对象
    this.Calculator = new MarsHECC(jdate);
  }
}

module.exports = MarsCoordinate;
