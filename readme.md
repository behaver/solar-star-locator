# SolarStarPosition

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/solar-star-position) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

SolarStarPosition 是一个关于基础星体天文坐标的计算组件。其中包含了对太阳、月球、太阳系八大行星和冥王星的天文坐标计算，同时提供了计算精度的控制接口。

## 计算组件

SolarStarPosition 依赖使用了底层的星体坐标计算模块，其中包括了[SolarPlanetsHECC](https://github.com/behaver/solar-planets-hecc)、[ELP2000MoonGECC](https://github.com/behaver/elp2000-moon-gecc)和[Pluto99HECC](https://github.com/behaver/pluto99-hecc)。它们被封装在星体坐标实例的 Calculator 属性中，用户可以直接通过更改这些计算模块的计算设定，来实现坐标计算过程相关的控制。

## 用例

```js
const { JupiterPosition } = require('@behaver/solar-star-position');
const { JDateRepository } = require('@behaver/jdate');

// 实例化儒略时间
let jdate = new JDateRepository(2448908.5, 'jde');

// 实例化木星坐标对象
let JupCoord = new JupiterPosition({
  time: jdate,
  withLightTimeEffect: true,
});

// 获取木星黄道坐标对象
let JupECC = JupCoord.get();

// 获取木星黄经，单位：度
let JupL = JupECC.l.getDegrees();

// 设置木星坐标计算精度为低
JupCoord.Calculator.accuracy = 'low';

// 获取低精度木星黄道坐标对象
let JupECCLow = JupCoord.get();

// 获取低精度木星黄经，单位：弧度
let JupBLow = JupECCLow.b.getRadian();
```

## API

`constructor(options)`

构造函数:

* options.time 参考时间
* options.withLightTimeEffect 考虑光行时修正

`set time(value)`

设置参考时间属性

`get time()`

获取参考时间属性

`set withLightTimeEffect(value)`

设置 是否考虑光行时影响

`get withLightTimeEffect()`

获取 是否考虑光行时影响

`get()`

获取计算结果

## 许可证书

The ISC license.

