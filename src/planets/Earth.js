'use strict';

const { EarthHECC } = require('@behaver/solar-planets-hecc');
const CommonPosition = require('../CommonPosition');
const LightTimeEffect = require('../LightTimeEffect');
const { SphericalCoordinate3D } = require('@behaver/coordinate');

/**
 * EarthPosition
 * 
 * 地球坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class EarthPosition extends CommonPosition {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} options.time                参考时间
   * @param {Boolean}         options.withLightTimeEffect 考虑光行时修正
   */
  constructor({
    time,
    withLightTimeEffect,
  }) {
    super({
      withLightTimeEffect,
    });

    // 构造地球日心黄经坐标计算对象
    this.Calculator = new EarthHECC(time);
    this.LightTimeEffect = new LightTimeEffect({
      time: this.time,
      originPositionProvider: {
        sc: new SphericalCoordinate3D(0, 0, 0),        
      },
      planetPositionProvider: new EarthHECC(time),
    });
  }
}

module.exports = EarthPosition;
