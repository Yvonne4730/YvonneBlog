---
title: Unity学习笔记——认识UI
date: 2026-09-20
tags:
  - Professional
  - 学习笔记
  - Unity
---

# Unity学习笔记——认识UI

## 内置UI组件

Unity中的主要的UI体系是基于UGUI（Unity UI）体系、基于画布的，而在UE5中主要的UI体系是UMG（Unreal Motion Graphic UI Designer），底层基于slate框架。

下述基础UI元素组件：



---



## 画布canvas

创建UI对象时，会自动创建canvas画布，所有的UI对象需要放在画布里，Unity会自动进行布局计算，用2d模式观察UI。

**属性参数：**

- Rect transform：替代其他game object的transform组件。

- Pivot：transform的中心点，是此UI缩放旋转的中心，可以自己设置，可以在UI外，不一定是UI图形的中心点，比如血条UI以最左侧为pivot。它的xy值是相对UI长和宽的比例，左下角为（0，0）右上角为（1，1）。

- Anchor：锚点，辅助UI布局，固定UI到锚点上下左右边的距离，其他部分按比例拉伸。



---



## Canvas——Render mode，渲染模式



---



## Canvas scaler——UI Scale Mode，缩放模式

一般参考分辨率设置为1920\*1080；Screen match mode选择match width or height，Match滑块完全偏向height，开发时适配16:9。



