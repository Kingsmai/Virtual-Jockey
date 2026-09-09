# 🎛️ VJ Modular Strobe Engine

本项目采用 **A - Z 模块化 Plugin 插件驱动体系** 与标准 **Web Index 根入口架构**。支持 **26 组独立插件**，每组包含 **Variant1 ~ Variant4（共 104+ 种独立变体）**，支持通过标准 ES Module 动态无限扩展，并具备全键盘专业快捷键映射矩阵与即时 HUD 反馈系统。

---

## 🚀 快速开始

```bash
# 安装并启动服务 (默认端口 3000)
npm start
```

- **VJ 主控制台 (根入口)**：`http://localhost:3000/`
- **独立大屏幕舞台端**：`http://localhost:3000/screen.html`（或在主控制台顶部一键唤起）

---

## 📁 目录结构

```text
├── index.html                    # 网站根主入口 (VJ Master Console: Program 监视器 + 插件矩阵 + 快捷键面板)
├── screen.html                   # 纯净舞台大屏幕端 (60FPS 极速渲染 + 全键盘支持 + 广播总线)
├── server.js                     # 零依赖高性能本地静态 HTTP 服务器
├── package.json                  # 项目配置与 npm scripts
├── test-plugins.js               # 全量插件 104 种变体自动化渲染测试脚本
├── build-plugins.js              # 插件构建辅助工具
└── plugins/                      # 模块化插件库
    ├── utils.js                  # 共享渲染与色彩辅助工具
    ├── index.js                  # 插件总注册中心 (Master Registry)
    ├── A/                        # [Plugin A] Atomic Flash 爆闪
    │   ├── variant1.js ~ variant4.js
    │   └── index.js
    ├── B/                        # [Plugin B] Blind Slats 百叶窗光栅
    │   ├── variant1.js ~ variant4.js
    │   └── index.js
    ├── ...                       # [Plugin C ~ Y]
    └── Z/                        # [Plugin Z] Zenith Shards 水晶碎片
        ├── variant1.js ~ variant4.js
        └── index.js
```

---

## ⌨️ 全键盘专业快捷键矩阵 (Keyboard Shortcut Matrix)

控制台（`index.html`）与大屏幕（`screen.html`）均全面支持以下快捷键操作，带有实时 HUD 浮动反馈提示：

| 操作分类 | 快捷键 | 功能描述 |
| :--- | :--- | :--- |
| **插件触发 (26 通道)** | `A` ~ `Z` | 开关对应字母的视觉插件 (Toggle Plugin On/Off) |
| **插件变体循环** | `Shift` + `A` ~ `Z` | 循环切换对应插件的变体 (V1 ➔ V2 ➔ V3 ➔ V4 ➔ V1) |
| **指定变体直选** | `Shift` + `1` ~ `4` | 将当前选中的聚焦插件直接设为 Variant 1~4 |
| **瞬时高能爆闪** | `Ctrl` + `A` ~ `Z` | 触发指定图层的 100% 满功率白炽冲击波 (Flash Burst) |
| **全局色彩/Style** | `Alt` + `1` | 切换为 **V1 CYBER NEON** (经典高饱和赛博霓虹) |
| **全局色彩/Style** | `Alt` + `2` | 切换为 **V2 HYPER LASER** (极限高对比度纯白激光) |
| **全局色彩/Style** | `Alt` + `3` | 切换为 **V3 ACID RAINBOW** (全色谱动态彩虹色彩流动) |
| **全局色彩/Style** | `Alt` + `4` | 切换为 **V4 GLITCH NOIR** (反色切片黑白硬核工业) |
| **全局色彩循环** | `←` / `→` 或 `[` / `]` | 快速前后轮播 4 大全局 Style 色系 |
| **场景预设 (Cues)** | `1` ~ `5` | 1 键载入 5 大经典场景预设组合 (Synth / Warp / Laser 等) |
| **超空间随机突变** | `6` 或 `` ` `` 或 `Tab` | 🎲 随机抽取 3~5 个插件并分配独立变体 + 随机 Style |
| **速度倍率调节** | `↑` / `↓` | 渲染速度 ±0.1x (BPM ±12) |
| **速度大幅调节** | `Shift` + `↑` / `↓` | 渲染速度 ±0.5x |
| **速度重置** | `0` | 重置速度为 1.00x 标准 (120 BPM) |
| **打拍测速 (Tap)** | `Enter` 或 `\` | 连续按击根据节拍自动计算并同步 BPM |
| **全黑切断 (B.O.)** | `Space` | Master Blackout 极速瞬间黑屏 / 恢复 |
| **清空全部插件** | `Esc` | 一键关闭所有当前正在运行的插件图层 |
| **快捷键速查面板** | `?` 或 `/` | 弹出 / 关闭玻璃拟态全屏快捷键矩阵速查表 |
| **全屏切换** | `F11` | 切换当前窗口全屏 |

---

## 🛠️ 如何添加新的变体或插件

- **为现有插件添加 Variant5**：
  1. 在 `plugins/[Letter]/` 下新建 `variant5.js`：
     ```javascript
     export const id = 'var5';
     export const name = 'My Super Variant';
     export const desc = '描述文字';
     export const render = (ctx, state) => {
       const { width: w, height: h, time, intensity: p, utils } = state;
       // 你的 Canvas 2D / WebGL 绘制代码
     };
     ```
  2. 在该插件的 `index.js` 的 `variants` 数组中引入即可直接在控制台和快捷键中生效！
