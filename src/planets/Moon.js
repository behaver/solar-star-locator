'use strict';

const MoonGECC = require('@behaver/elp2000-moon-gecc');
const CoordinateCommon = require('../CoordinateCommon');

/**
 * 月球坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class MoonCoordinate extends CoordinateCommon {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参考时间
   */
  constructor(jdate) {
    super();

    // 构造地球日心黄经坐标计算对象
    this.Calculator = new MoonGECC(jdate);
  }
}

module.exports = MoonCoordinate;
