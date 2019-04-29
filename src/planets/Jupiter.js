'use strict';

const { EarthHECC, JupiterHECC } = require('@behaver/solar-planets-hecc');
const CommonPosition = require('../CommonPosition');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * JupiterPosition
 * 
 * 木星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class JupiterPosition extends CommonPosition {

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

    // 构造木星日心黄经坐标计算对象
    this.Calculator = new JupiterHECC(time);
    this.LightTimeEffect = new LightTimeEffect({
      time: this.time,
      originPositionProvider: new EarthHECC(time),
      planetPositionProvider: new JupiterHECC(time),
    });
  }
}

module.exports = JupiterPosition;
