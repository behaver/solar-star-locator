'use strict';

const { EarthHECC, VenusHECC } = require('@behaver/solar-planets-hecc');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * VenusLocator
 * 
 * 金星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class VenusLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'venus';

    // 构造金星日心黄经坐标计算对象
    this.Calculator = new VenusHECC;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthHECC,
      planetPositionProvider: new VenusHECC,
    });

    this.options(options);
  }
}

module.exports = VenusLocator;
