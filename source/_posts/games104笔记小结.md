---
title: Games104笔记简单整理
date: 2026-09-1
tags:
  - Professional
  - 学习笔记
  - 游戏引擎
  - Games104
---

> 本文对GAMES104《现代游戏引擎：从入门到实践》整个课程的知识体系进行全面梳理，拆解为七大核心模块，帮助建立系统化的现代游戏引擎开发认知图谱。

---

## GAMES104 架构图谱

现代游戏引擎是一个极度复杂的软件系统，典型的现代游戏引擎采用**分层（Layered Architecture）**与**数据驱动（Data-Driven）**的设计理念：

```
              ┌─────────────────────────────────────────────────────┐
              │             GAMES104 现代游戏引擎核心架构           │
              └──────────────────────────┬──────────────────────────┘
                                         │
    ┌──────────────┬──────────────┬──────┴───────┬──────────────┬──────────────┐
    │              │              │              │              │              │
┌───┴────┐     ┌───┴────┐     ┌───┴────┐     ┌───┴────┐     ┌───┴────┐     ┌───┴────┐
│ 基础层 │     │ 渲染层 │     │ 物理层 │     │ 动画层 │     │ 玩法层 │     │ 工具/  │
│ Base   │     │ Render │     │ Physics│     │ Anim   │     │ Gameplay│     │ 前沿   │
└────────┘     └────────┘     └────────┘     └────────┘     └────────┘     └────────┘
```

---

## 一、 基础架构模块 (Base & Infrastructure)

基础层是整个引擎的基石，决定了引擎的性能下限与扩展能力，核心解决“引擎自身如何运行”的问题。

* **核心概念与架构设计**：
  * 游戏引擎的演进历史（从游戏硬编码到模块化引擎）。
  * 分层架构与数据驱动（Data-Driven Design）。
* **底层基础设施**：
  * **自定义内存管理（Memory Management）**：内存池、分配器（Linear/Stack/Pool Allocator），减少碎片与 Cache Miss。
  * **反射系统（Reflection System）**：通过宏或元编程提供运行时类型信息（RTTI），支撑序列化与编辑器交互。
  * **序列化与反序列化（Serialization）**：资产与场景数据的持久化存储与加载。
* **主循环与并发**：
  * **Tick 循环机制**：逻辑 Update 与渲染 Render 的分离与同步。
  * **多线程与任务调度**：基于 Task Graph（任务图）的高并发调度，Render/Logic 异步并行架构。

---

## 二、 渲染引擎模块 (Rendering Engine)

渲染是引擎中最繁重、技术密集的模块，涵盖了从硬件底层抽象到顶级视觉效果的全栈管线。

### 1. 硬件抽象与管线底座
* 现代图形 API 抽象层（RHI）：Vulkan / DirectX 12 / Metal。
* GPU 硬件架构与渲染管线（Forward / Deferred / Clustered Rendering）。

### 2. PBR 与光照系统 (PBR & Lighting)
* **基于物理的渲染（PBR）**：BRDF / BSDF 模型、能量守恒与微表面理论（Microfacet Theory）。
* **阴影技术**：Shadow Map、CSM（级联阴影）、Distance Field Shadows（距离场阴影）。
* **全局光照（Global Illumination）**：烘焙（Lightmaps/PRT）、实时 GI（DDGI, VXGI, Screen-Space GI）。

### 3. 环境与后处理 (Environment & Post-Processing)
* **大气与水体**：Rayleigh & Mie 散射大气模型、体素云（Volumetric Clouds）、FFT / Ocean 动态水体。
* **后处理管线**：Tone Mapping、Bloom、SSAO/GTAO、TAA/TSR 抗锯齿。
* **现代特效系统**：GPU-Driven Particle System（GPU 驱动粒子系统）、Niagara 架构理念。

---

## 三、 物理引擎模块 (Physics Engine)

物理引擎负责模拟真实世界中的碰撞、重力及各种力学反馈。

* **刚体物理（Rigid Body Physics）**：
  * **碰撞检测**：粗阶段（Broadphase - AABB/SAP/Dynamic AABB Tree）与精阶段（Narrowphase - GJK, SAT 算法）。
  * **约束求解**：Constraint Solvers, Position Based Dynamics (PBD)。
* **高级物理模拟**：
  * 布料模拟（Cloth Simulation）、流体模拟（SPH 方法）、毁坏系统（Destruction System）。
* **场景查询与渲染同步**：
  * Raycast（射线检测）、Shape Cast、Overlap Query。
  * 物理 Tick 与渲染帧的内插/外推同步算法。

---

## 四、 动画系统模块 (Animation System)

动画系统负责让游戏中的角色与物体“动起来”，兼顾表现力与计算效率。

* **骨骼动画基础**：
  * 骨骼层级树（Skeleton Hierarchy）、蒙皮计算（Linear Blend Skinning, Dual Quaternion Skinning）。
  * 动画数据压缩（Keyframe Reduction, Curve Fitting）。
* **动画控制与融合**：
  * **Blend Tree（融合树）**：1D / 2D 混合，方向与速度插值。
  * **状态机（Animation State Machine）**：状态转移与分层动画（Layered/Additive Blending）。
* **高级运动控制**：
  * **逆运动学（IK）**：Two-Bone IK, FABRIK 算法，实现脚部贴地（Foot Placement）。
  * **程序化与匹配**：Procedural Animation、Motion Matching（动作匹配算法）。

---

## 五、 玩法与逻辑架构 (Gameplay Architecture)

玩法架构提供了一套高内聚、低耦合的框架，让开发者能够高效编写业务逻辑。

* **Entity-Component 架构演进**：
  * 传统 OOP（面向对象集成）的痛点。
  * Component-Based Architecture（组件化架构）。
  * 现代 **ECS（Entity-Component-System）**：数据连续存储、面向 Cache 友好的极致性能优化。
* **逻辑与事件**：
  * 脚本语言集成（Lua / C# Binding 与跨语言调用）。
  * 观察者模式与解耦的事件/消息系统（Event Bus）。
* **大地图与场景流（World Streaming）**：
  * 空间划分：四叉树/八叉树/BVH/Grid。
  * 开放世界技术：World Partition、HLOD（Hierarchical LOD）、Seamless Level Streaming。

---

## 六、 编辑器与工具链模块 (Toolchain & Editor Framework)

“游戏引擎本质上是一个创作工具”，工具链的好坏直接决定了开发团队的生产力。

* **编辑器 UI 框架**：
  * 模式对比：Immediate Mode GUI (ImGui) vs. Retained Mode GUI (Slate)。
  * 解耦设计：MVVM 架构在编辑器中的应用。
  * 撤销重做机制（Undo/Redo Command Pattern）。
* **资产管线（Asset Pipeline）**：
  * 原始资产导入导出（FBX, GLTF, OBJ）。
  * 资产烘焙与编译（Cook Process），针对不同平台转换为运行时高效格式。
  * 虚拟资产管理与依赖图（Dependency Graph）。
* **关卡与场景编辑**：
  * 场景 Gizmo 操作、地形/植被刷子（Terrain & Foliage Editor）、Prefab 预制体系统。

---

## 七、 网络与前沿技术 (Networking & Advanced Topics)

* **网络同步（Multiplayer Networking）**：
  * **状态同步（State Synchronization）** 与 **帧同步（Frame Lockstep）**。
  * 客户端预测（Client Prediction）、服务器重演（Server Reconciliation）、插值与平滑（Lag Compensation）。
* **人工智能（Game AI）**：
  * 寻路：NavMesh（导航网格）生成与 A* 寻路。
  * 行为逻辑：有限状态机（FSM）、行为树（Behavior Tree）、GOAP（面向目标的动作规划）。
* **前沿技术趋势**：
  * **PCG（Procedural Content Generation）**：程序化内容生成技术。
  * **Neural Rendering 与 AI 赋能**：DLSS/FSR 超分辨率、神经辐射场/高斯泼溅在引擎中的探索。

---