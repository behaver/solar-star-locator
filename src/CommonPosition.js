'use strict';

const { EclipticCoordinate } = require('@behaver/celestial-coordinate');
const { JDateRepository } = require('@behaver/jdate');

/**
 * 太阳系行星坐标公有父类
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class CommonPosition {

  /**
   * 构造函数
   * 
   * @param {Boolean} options.withLightTimeEffect 考虑光行时修正
   */
  constructor({
    withLightTimeEffect,
  }) {
    this.private = {};
    
    this.withLightTimeEffect = withLightTimeEffect;
  }

  /**
   * 设置参考时间属性
   * 
   * @param  {JDateRepository} value 参考时间属性值
   */
  set time(value) {
    this.Calculator.obTime = value;
  }

  /**
   * 获取参考时间属性
   * 
   * @return {JDateRepository} 参考时间属性值
   */
  get time() {
    return this.Calculator.obTime;
  }

  /**
   * 设置 是否考虑光行时影响
   * 
   * @param {Boolean} value 是否考虑光行时影响
   */
  set withLightTimeEffect(value) {
    this.private.withLightTimeEffect = !! value;
  }

  /**
   * 获取 是否考虑光行时影响
   * 
   * @return {Boolean} 是否考虑光行时影响
   */
  get withLightTimeEffect() {
    return this.private.withLightTimeEffect;
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
      centerMode: 'heliocentric',
      epoch: this.Calculator.obTime,
      withNutation: false,
    });
  }
}

module.exports = CommonPosition;
