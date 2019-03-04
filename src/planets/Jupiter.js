'use strict';

const { JupiterHECC } = require('@behaver/solar-planets-hecc');
const CoordinateCommon = require('../CoordinateCommon');

/**
 * 木星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class JupiterCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造木星日心黄经坐标计算对象
    this.Calculator = new JupiterHECC(jdate);
  }
}

module.exports = JupiterCoordinate;
