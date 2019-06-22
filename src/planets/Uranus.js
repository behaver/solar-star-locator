'use strict';

const { EarthHECC, UranusHECC } = require('@behaver/solar-planets-hecc');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * UranusLocator
 * 
 * 天王星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class UranusLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'uranus';

    // 构造天王星日心黄经坐标计算对象
    this.Calculator = new UranusHECC;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthHECC,
      planetPositionProvider: new UranusHECC,
    });

    this.options(options);
  }
}

module.exports = UranusLocator;
