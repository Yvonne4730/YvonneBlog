---
title: UE5 & Unity 核心基类及其继承体系简介
date: 2026-09-20
tags:
  - Professional
  - 学习笔记
  - 游戏引擎
  - UE5
  - Unity
---

>在游戏开发中，引擎架构都是围绕其核心的类继承体系构建的。本文详细梳理 Unreal Engine 5（UE5）与 Unity 两大游戏引擎中最核心的基类继承链、功能作用及两者之间的映射关系。

---

## 一、 Unreal Engine 5（UE5）核心基类继承体系

UE5 采用了严格的面向对象（OOP）继承体系，所有的引擎核心对象、逻辑组件和世界实体都必须继承自特定的 C++ 基类。

### 继承结构图

```text
UObjectBase
 ↳ UObjectBaseUtility
    ↳ UObject
       ├─ UActorComponent
       │   └─ USceneComponent
       │       └─ UPrimitiveComponent
       └─ AActor
           ├─ APawn
           │   └─ ACharacter
           ├─ AGameModeBase
           ├─ APlayerController
           └─ AInfo
```

### 关键基类介绍

#### 1. `UObject`
* **继承链**：`UObjectBase` ——> `UObjectBaseUtility` ——> `UObject`
* **作用**：UE 体系中**所有核心对象的顶级基类**。
* **核心能力**：提供反射机制（`UPROPERTY` / `UFUNCTION`）、垃圾回收（GC）、序列化（Save/Load）、网络序列化以及与元数据（MetaData）系统的交互。
* **注意**：`UObject` 不能直接存在于游戏世界（`UWorld`）中，必须挂载到 Actor 或作为内存数据结构存在。

#### 2. `UActorComponent`
* **继承链**：`UObject` ——> `UActorComponent`
* **作用**：组件（Component）的顶级基类。负责为 Actor 添加模块化行为（如血量组件、AI感知组件）。
* **特点**：没有空间位置和物理变换概念。

#### 3. `USceneComponent`
* **继承链**：`UObject` ——> `UActorComponent` ——> `USceneComponent`
* **作用**：**带有三维变换（Transform）信息**的组件（包含位置 `Location`、旋转 `Rotation`、缩放 `Scale`）。
* **特点**：支持嵌套和层级父子挂载（Parent/Child Attachment）。每个 Actor 必须指定一个 `USceneComponent` 作为根组件（Root Component）。

#### 4. `UPrimitiveComponent`
* **继承链**：`UObject` ——> `UActorComponent` ——> `USceneComponent` ——> `UPrimitiveComponent`
* **作用**：带有**渲染几何体或物理碰撞**能力的组件（如 `UStaticMeshComponent`、`USkeletalMeshComponent`、`UBoxComponent`）。
* **特点**：支持物理模拟（RigidBody）、重力、碰撞响应及渲染裁剪。

#### 5. `AActor`
* **继承链**：`UObject` ——> `AActor` （类名前缀 `A` 表示该类可以被 Spawn 到 World 中）
* **作用**：**游戏世界中所有可生成（Spawn）或摆放实体的基类**。
* **核心能力**：支持网络同步（`bReplicates`）、生命周期函数（`BeginPlay` / `Tick`）、组件挂载容器。

#### 6. `APawn`
* **继承链**：`UObject` ——> `AActor` ——> `APawn`
* **作用**：**可被玩家或 AI 控制（Possess）的游戏实体**（如赛车、飞船、动物）。
* **核心能力**：能够接收 Controller（玩家输入或 AI 逻辑）的控制指令。

#### 7. `ACharacter`
* **继承链**：`UObject` ——> `AActor` ——> `APawn` ——> `ACharacter`
* **作用**：专为**人形/双足角色**设计的 Pawn。
* **核心能力**：内置了非常强大的 `UCharacterMovementComponent`（处理走路、跳跃、飞翔、网络预测与校正）以及胶囊体碰撞（Capsule Component）。

#### 8. `AController` / `APlayerController`
* **继承链**：`UObject` ——> `AActor` ——> `AController` ——> `APlayerController`
* **作用**：控制器的基类，代表决策大脑。`APlayerController` 是玩家在游戏中的网络映射与逻辑驱动核心，负责响应玩家按键与 UI 交互。

---

## 二、 Unity 核心基类继承体系

Unity 的设计理念偏向于**组合优先于继承（ECS / 组件化架构）**，但其 C# API 底层依然维护着一套清晰的继承链路。

### 继承结构图

```text
System.Object (C# 原生)
 ↳ UnityEngine.Object
    ├─ UnityEngine.Component
    │   ├─ UnityEngine.Behaviour
    │   │   └─ UnityEngine.MonoBehaviour
    │   └─ UnityEngine.Transform
    ├─ UnityEngine.GameObject
    └─ UnityEngine.ScriptableObject
```

### 关键基类介绍

#### 1. `UnityEngine.Object`
* **继承链**：`System.Object` ——> `UnityEngine.Object`
* **作用**：**Unity 引擎中所有原生对象的顶级基类**（注意与 C# 的 `System.Object` 区别）。
* **核心能力**：内存引用管理、Destroy 销毁机制、C++/C# 混合内存映射、实例对比重载（`== null` 判定）。包括 `Texture`、`AudioClip`、`GameObject` 等资源和对象都继承自它。

#### 2. `UnityEngine.GameObject`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.GameObject`
* **作用**：**场景中所有实体的通用容器**（类似于 UE5 的 `AActor`，但自身不包含任何具体逻辑或位姿）。
* **特点**：自身只是一个空壳，所有实际功能（位置、渲染、脚本、物理）全靠挂载的 `Component` 来提供。必须且一定绑定有一个 `Transform` 组件。

#### 3. `UnityEngine.Component`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.Component`
* **作用**：所有挂载到 `GameObject` 上组件的基类。
* **核心能力**：能够访问宿主物体（`gameObject`）、获取同物体上的其他组件（`GetComponent<T>()`）。

#### 4. `UnityEngine.Transform`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.Component` ——> `UnityEngine.Transform`
* **作用**：专管**空间三维变换与场景树层级结构**（Position、Rotation、Scale，以及父子节点管理 `parent` / `children`）。

#### 5. `UnityEngine.Behaviour`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.Component` ——> `UnityEngine.Behaviour`
* **作用**：增加了 **“可开关状态”（`enabled` 属性）** 的组件基类。
* **特点**：如果组件被禁用（`enabled = false`），它将暂停其特定的更新机制（如 `Camera`、`Light`、`Animation` 都是 `Behaviour`）。

#### 6. `UnityEngine.MonoBehaviour`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.Component` ——> `UnityEngine.Behaviour` ——> `UnityEngine.MonoBehaviour`
* **作用**：**所有开发者自定义 C# 脚本的基类**。
* **核心能力**：驱动 Unity 引擎生命周期回调（`Awake`、`Start`、`Update`、`FixedUpdate`、`OnDestroy` 等），支持协程（Coroutine）以及 Inspector 视图面板属性序列化。

#### 7. `UnityEngine.ScriptableObject`
* **继承链**：`System.Object` ——> `UnityEngine.Object` ——> `UnityEngine.ScriptableObject`
* **作用**：专门用于**数据驱动开发（Data-Driven Design）与配置存储**的数据容器。
* **特点**：它继承自 `UnityEngine.Object` 但**不继承 `Component`**，因此不能也不需要挂载到 `GameObject` 上，常用于存储装备表、怪物属性表、减少重复内存占用。

---

## 三、 两大引擎核心基类概念对照表

| 概念/功能 | UE5 基类 | Unity 基类 | 核心差异说明 |
| :--- | :--- | :--- | :--- |
| **底层原生对象** | `UObject` | `UnityEngine.Object` | UE5 `UObject` 内置复杂的垃圾回收与反射；Unity 侧是 C++ 与 C# 的跨语言包装器。 |
| **场景实体** | `AActor` | `GameObject` | UE5 `AActor` 内置了同步与逻辑，功能重；Unity `GameObject` 只是纯粹的组件容器。 |
| **挂载组件基类** | `UActorComponent` | `Component` | 功能基本一致，都是用作模块化扩展。 |
| **带 Transform 的组件** | `USceneComponent` | `Transform` | UE5 将 Transform 视作一种组件类型；Unity 中 Transform 既是组件也是层级树节点。 |
| **自定义逻辑脚本** | 继承 `AActor` 或 `UActorComponent` | `MonoBehaviour` | UE5 可以直接继承 Actor 实现具体实体逻辑，而 Unity 必须写 `MonoBehaviour` 并挂到 `GameObject` 上。 |
| **纯配置数据容器** | `UDataAsset` (继承自 `UObject`) | `ScriptableObject` | 都用于在磁盘保存不随单实例变化的静态配置数据。 |