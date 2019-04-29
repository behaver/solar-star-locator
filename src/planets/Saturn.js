'use strict';

const { EarthHECC, SaturnHECC } = require('@behaver/solar-planets-hecc');
const CommonPosition = require('../CommonPosition');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * SaturnPosition
 * 
 * 土星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class SaturnPosition extends CommonPosition {

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

    // 构造土星日心黄经坐标计算对象
    this.Calculator = new SaturnHECC(time);
    this.LightTimeEffect = new LightTimeEffect({
      time: this.time,
      originPositionProvider: new EarthHECC(time),
      planetPositionProvider: new SaturnHECC(time),
    });
  }
}

module.exports = SaturnPosition;
