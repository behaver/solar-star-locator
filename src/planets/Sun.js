'use strict';

const { EarthHECC } = require('@behaver/solar-planets-hecc');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const CommonPosition = require('../CommonPosition');
const LightTimeEffect = require('../LightTimeEffect');
const { SphericalCoordinate3D } = require('@behaver/coordinate');

/**
 * SunPosition
 * 
 * 太阳位置计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class SunPosition extends CommonPosition {

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

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
    let sc;

    if (this.withLightTimeEffect) {
      let lte_res = this.LightTimeEffect.calc();
      sc = lte_res.sc;
    } else {
      sc = this.Calculator.sc;
    }

    // 对称转换地球日心坐标为太阳地心坐标
    sc.phi = sc.phi + Math.PI;
    sc.theta = Math.PI - sc.theta;

  	return new EclipticCoordinate({
      sc,
      centerMode: 'geocentric',
      epoch: this.Calculator.obTime,
      withNutation: false,
    });
  }
}

module.exports = SunPosition;
