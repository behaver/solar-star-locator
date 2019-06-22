'use strict';

const { EarthHECC, MercuryHECC } = require('@behaver/solar-planets-hecc');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * MercuryLocator
 * 
 * 水星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class MercuryLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'mercury';

    // 构造水星日心黄经坐标计算对象
    this.Calculator = new MercuryHECC;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthHECC,
      planetPositionProvider: new MercuryHECC,
    });

    this.options(options);
  }
}

module.exports = MercuryLocator;
