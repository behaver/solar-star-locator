'use strict';

const { EarthHECC } = require('@behaver/solar-planets-hecc');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');
const { SphericalCoordinate3D } = require('@behaver/coordinate');

/**
 * EarthLocator
 * 
 * 地球坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class EarthLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'earth';

    // 构造地球日心黄经坐标计算对象
    this.Calculator = new EarthHECC;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: {
        sc: new SphericalCoordinate3D(0, 0, 0),        
      },
      planetPositionProvider: new EarthHECC,
    });

    this.options(options);
  }
}

module.exports = EarthLocator;
