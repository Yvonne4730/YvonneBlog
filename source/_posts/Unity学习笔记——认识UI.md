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

|**功能/概念**|**Unity \(UGUI\)**|**UE5 \(UMG\)**|**区别与作用对比**|
|---|---|---|---|
|**画布 / 根容器**|**Canvas**|**Widget Blueprint \(UI 控件蓝图\)**|Unity: UI 的绘制根节点，决定 UI 是屏幕空间渲染还是世界空间渲染。<br>UE5: 在 UI 控件蓝图中，通常以 Canvas Panel 作为顶层根容器，用于确定控件的位置和层级。|
|**事件接收器**|**Event System**|**Player Controller / Input Mode**|Unity: 处理点击、拖拽等输入的独立组件机制。<br>UE5: 通过玩家控制器（Player Controller）设置 UI Input Mode（如 Set Input Mode UI Only）来管理交互。|

下述基础UI元素组件：

|**UI 元素对象**|**主要作用与核心功能**|**常用组件/属性**|**典型应用场景**|
|---|---|---|---|
|**Text / TextMeshPro \(TMP\)**|显示文本信息。TMP 为官方推荐的高清矢量文本组件，支持富文本。|Text, Font, Font Size, Alignment|游戏名、对话框、提示文字、数值显示|
|**Image**|渲染 2D 图像（Sprite），支持普通、切片（九宫格）、填充等模式。|Source Image, Image Type \(Sliced/Filled\)|背景图、技能图标、血条/冷却进度条|
|**Raw Image**|直接渲染非 Sprite 的原始纹理（Texture）。|Texture, UV Rect|渲染纹理（小地图）、小视频、3D 角色预览|
|**Button**|接收玩家点击操作，可配置不同状态（普通、高亮、按下、禁用）的颜色或图片。|Transition, OnClick\(\)|主菜单按钮、确定/取消、技能释放按键|
|**Input Field / TMP\_InputField**|允许玩家点击并输入单行或多行文本。|Text Component, Character Limit, Content Type|登录框、玩家命名、聊天输入框|
|**Toggle**|具有勾选/未勾选两种状态的单选或开关控件。|Is On, Toggle Transition, Group|开启/关闭音效、开关抗锯齿|
|**Toggle Group**|管理一组 Toggle，实现同一时间内只能选中一项的“单选框”逻辑。|Allow Switch Off|选项卡（Tab）切换、性别选择|
|**Slider**|可拖动改变数值的滑动条，包含背景、填充区和拖动块（Handle）。|Min Value, Max Value, Value, OnValueChanged\(\)|音量调节、画质等级调节、亮度设定|
|**Scrollbar**|滚动条，用于控制列表或区域的平移（可与 Scroll Rect 组合使用）。|Value, Size, Direction|滚动列表右侧的拖动条|
|**Scroll Rect \(Scroll View\)**|滚动区域容器，配合 Mask 可以限制并滚动超出显示范围的子对象。|Content, Movement Type, Viewport|背包物品列表、成就列表、长文本公告|
|**Dropdown / TMP\_Dropdown**|下拉选择菜单，点击后展开可供选择的列表项。|Options, Value, Caption Text|分辨率选择、语言选择、画质预设|
|**Panel**|基础容器板，本质是一个带有半透明默认背景图的 Image，用于分组管理 UI。|Image|弹窗背景、主界面布局面板|
|**Mask / RectMask2D**|遮罩组件，用于裁剪超出自身 RectTransform 范围的子 UI 内容。|Show Mask Graphic|隐藏滚动框外内容、圆形头像裁剪|



---



## 画布canvas

创建UI对象时，会自动创建canvas画布，所有的UI对象需要放在画布里，Unity会自动进行布局计算，用2d模式观察UI。

**属性参数：**

- Rect transform：替代其他game object的transform组件。

- Pivot：transform的中心点，是此UI缩放旋转的中心，可以自己设置，可以在UI外，不一定是UI图形的中心点，比如血条UI以最左侧为pivot。它的xy值是相对UI长和宽的比例，左下角为（0，0）右上角为（1，1）。

- Anchor：锚点，辅助UI布局，固定UI到锚点上下左右边的距离，其他部分按比例拉伸。



---



## Canvas——Render mode，渲染模式

|**渲染模式 \(Render Mode\)**|**核心渲染原理**|**是否依赖 Camera**|**与场景 3D 物体的遮挡关系**|**尺寸与位置决定因素**|**典型应用场景**|
|---|---|---|---|---|---|
|Screen Space \- Overlay<br>\(屏幕空间 \- 覆盖模式\)|UI 直接渲染在整个屏幕的最上层，像贴在屏幕玻璃上一样，永远覆盖其他画面，Pos\_Z不会影响渲染顺序。|否<br>（即使没有渲染相机也能显示）|无法遮挡<br>（UI 永远挡在所有 3D 模型和粒子特效前面）|自动拉伸适应当前屏幕分辨率（铺满屏幕）|• 游戏主界面 \(HUD\)<br>• 左上角头像/血条<br>• 设置菜单 / 暂停弹窗<br>• 固定按键与得分显示|
|Screen Space \- Camera<br>\(屏幕空间 \- 摄像机模式\)|UI 被放置在指定相机（需要选定相机）前方的固定距离平面上（Plane Distance），随相机移动和变形。|是<br>（必须指定 Render Camera）|可以相互遮挡<br>（取决于 3D 物体与相机、UI 之间的距离）<br>（但UI之间不会因为pos\_z影响遮挡）|自动适应指定相机的视角与屏幕分辨率|• 带 3D 模型的 UI（如装备栏里的 3D 角色展示）<br>• 卡牌游戏中可旋转的 3D 卡牌<br>• 需要受镜头后处理（如景深、模糊）影响的 UI|
|World Space<br>\(世界空间模式\)|Canvas 变为场景中的一个普通 3D 物体，拥有完整的 Transform，可自由放置在 3D 空间中。|否<br>（渲染机制与普通 3D 模型一致）|完全相互遮挡<br>（遵循标准的 3D 空间深度和物理遮挡）|由本身的 RectTransform（Pos, Rot, Scale）手动调节|• 角色/怪物头顶的血条与名字<br>• 游戏场景内的电脑屏幕、路牌提示<br>• 科幻风格的全息投影 UI<br>• VR / AR 游戏中的所有交互界面|



---



## Canvas scaler——UI Scale Mode，缩放模式

一般参考分辨率设置为1920\*1080；Screen match mode选择match width or height，Match滑块完全偏向height，开发时适配16:9。

|**缩放模式 \(Scale Mode\)**|**核心运作原理**|**UI 尺寸表现**|**关键配置参数**|**典型应用场景**|
|---|---|---|---|---|
|Constant Pixel Size<br>\(恒定像素大小\)|无论屏幕分辨率如何变化，UI 元素始终保持固定的物理像素点大小（1 比 1 渲染）。|高分辨率下 UI 变小，低分辨率下 UI 变大。|Scale Factor（缩放因子）<br>Reference Pixels Per Unit|• 仅针对固定分辨率（如桌面端固定窗口模式）<br>• 极少数不需要做多分辨率适配的特定界面|
|Scale With Screen Size<br>\(随屏幕尺寸缩放\)|根据设定的参考分辨率（Reference Resolution），按比例动态放大或缩小整个 Canvas。|在不同分辨率设备上，UI 占屏幕的相对比例基本保持一致。|Reference Resolution（参考分辨率）<br>Screen Match Mode（匹配模式）<br>Match \(Width \- Height 权重\)|• 绝大多数 2D / 3D 手游的首选模式<br>• 需要跨手机、平板、PC 等多尺寸屏幕的项目|
|Constant Physical Size<br>\(恒定物理尺寸\)|无论屏幕分辨率或 DPI 怎么变，UI 元素在真实世界中的物理尺寸（厘米/英寸）保持不变。|在屏幕尺寸相同的设备上，UI 拿尺子量出来是一样大的。|Physical Unit（单位：Centimeters/Inches等）<br>Fallback DPI / Default DPI|• 需要严谨物理尺寸的移动端应用/工具<br>• 必须保证玩家手指触控区域物理大小一致的设备（如VR设备）|

