# 🎛️ VJ Modular Strobe Engine (双版本发布体系)

本项目是一个专业级 **VJ 舞台灯光视觉与频闪控制系统**，采用 **A - Z 模块化 Plugin 插件驱动体系（26 组独立插件 x 104 种独立变体）**，支持 **全键盘快捷键矩阵** 与 **即时 HUD 反馈系统**。

本项目已全面支持 **双版本交付架构**：
- 🖥️ **Tauri 桌面客户端版**：跨平台原生桌面软件（Windows `.exe`/`.msi`、macOS `.dmg`、Linux），支持原生多窗口与硬件加速。
- 🐳 **Docker WebApp 容器化版**：基于高并发 `nginx:alpine` 极速分发，容器端口统一暴露在 **`20023`**。

---

## ⚡ 快速开始

### 方式一：本地极速运行 (Node.js)

```bash
# 启动本地服务（默认端口 20023）
npm start
```
- **VJ 主控制台**：`http://localhost:20023/`
- **舞台大屏幕端**：`http://localhost:20023/screen.html`（或在控制台顶部点击「打开独立舞台大屏」一键唤起）

---

### 方式二：Docker WebApp 部署 (暴露在端口 20023)

项目内置了生产级 `Dockerfile` 与 `docker-compose.yml`，采用高性能轻量 `nginx:alpine`，开启了 Gzip 压缩与 ES Module MIME 深度优化。

#### 1. 使用 Docker Compose 一键启动（推荐）：
```bash
# 启动容器
docker compose up -d
# 或使用 npm 命令
npm run docker:up

# 查看运行日志
npm run docker:logs

# 停止容器
npm run docker:down
```

#### 2. 使用标准 Docker 命令：
```bash
# 构建镜像
docker build -t vj-modular-strobe .

# 运行容器并映射 20023 端口
docker run -d -p 20023:20023 --name vj-app vj-modular-strobe
```

启动完成后直接在浏览器访问：
- **Web 控制台**：**`http://localhost:20023/`**
- **舞台渲染大屏**：**`http://localhost:20023/screen.html`**

---

### 方式三：Tauri 桌面端应用打包 (.exe / .dmg / .deb)

通过 Tauri 2.0 原生构建，内存占用极低（~15MB），启动速度毫秒级，且支持独立的舞台副屏输出与全屏沉浸式表演。

#### 1. 桌面端本地开发与预览：
```bash
# 启动 Tauri 桌面调试模式（自动拉起本地服务与桌面窗口）
npm run app:dev
```

#### 2. 桌面客户端生产打包：
```bash
# 编译并生成独立安装包
npm run app:build
```
> 打包输出产物位于 `src-tauri/target/release/bundle/`：
> - Windows: `.exe` / `.msi`
> - macOS: `.dmg` / `.app`
> - Linux: `.deb` / `.AppImage`

---

## 📁 架构与目录清单

```text
├── index.html                    # 网站根主入口 / VJ 主控制台 (Console)
├── screen.html                   # 纯净舞台大屏幕端 (Stage Display 60FPS)
├── icon.svg                      # 应用矢量高清图标
├── server.js                     # 零依赖本地轻量 HTTP 服务器 (Port 20023)
├── Dockerfile                    # 生产级 Nginx Alpine 镜像构建配置
├── docker-compose.yml            # Docker 编排配置 (Port 20023)
├── nginx.conf                    # Nginx 静态服务、Gzip 与 MIME 规则
├── package.json                  # 项目脚本 (Web/Docker/Tauri 一体化)
├── test-plugins.js               # 26 通道 104 种变体渲染测试套件
│
├── src-tauri/                    # 桌面端 Tauri 2.0 工程源码
│   ├── Cargo.toml                # Rust 依赖配置
│   ├── tauri.conf.json           # 桌面客户端窗口、安全与打包配置
│   ├── build.rs                  # 构建脚本
│   ├── capabilities/             # 权限能力管理
│   ├── icons/                    # 桌面应用图标
│   └── src/
│       ├── main.rs               # 桌面端主进程入口
│       └── lib.rs                # 原生多窗口 Stage 窗口调度器
│
└── plugins/                      # 26 个模块化视觉插件 (A ~ Z)
    ├── utils.js                  # 共享渲染与色彩辅助工具
    ├── index.js                  # 插件总注册中心 (Master Registry)
    ├── A/ ~ Z/                   # [Plugin A ~ Z] 插件集（每个含 variant1~4.js）
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

## 🛠️ 测试与验证

```bash
# 运行全量插件渲染验证测试（104 种变体）
npm test
```
