'use strict';

const MoonGECC = require('@behaver/elp2000-moon-gecc');
const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const CommonPosition = require('../CommonPosition');
const LightTimeEffect = require('../LightTimeEffect');
const { SphericalCoordinate3D } = require('@behaver/coordinate');

/**
 * MoonPosition
 * 
 * 月球坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class MoonPosition extends CommonPosition {

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

    // 构造月球地心黄经坐标计算对象
    this.Calculator = new MoonGECC(time);

    this.LightTimeEffect = new LightTimeEffect({
      time: this.time,
      originPositionProvider: { 
        sc: new SphericalCoordinate3D(0, 0, 0), 
      },
      planetPositionProvider: new MoonGECC(time),
    });
  }

  /**
   * 获取计算结果
   * 
   * @return {EclipticCoordinate} 黄道天球坐标对象
   */
  get() {
    let sc;

    // 光行时修正
    if (this.withLightTimeEffect) {
      this.LightTimeEffect.time = this.time;
      let lte_res = this.LightTimeEffect.calc();
      sc = lte_res.sc;
    } else {
      sc = this.Calculator.sc;
    }


    return new EclipticCoordinate({
      sc,
      centerMode: 'geocentric',
      epoch: this.Calculator.obTime,
      withNutation: false,
      enableAnnualAberration: false,
      withAnnualAberration: true,
    });
  }
}

module.exports = MoonPosition;
