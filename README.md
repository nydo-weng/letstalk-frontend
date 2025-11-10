# Let's Talk - English Speaking Practice

情景英语口语练习前端应用，使用 AI 提供实时评估和反馈。

## 功能特性

- 🎤 **实时录音**：浏览器内录音，支持 WebM 格式
- 🎲 **随机场景**：AI 生成多样化的练习场景
- 📊 **详细评估**：语法、发音、内容相关性、流畅度全方位分析
- 💡 **智能反馈**：具体的改进建议和示范答案
- 🎯 **难度分级**：Beginner、Intermediate、Advanced
- 📱 **响应式设计**：支持桌面和移动设备

## 技术栈

- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **API**：后端 Cloudflare Worker

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板：
```bash
cp .env.example .env
```

编辑 `.env` 文件，设置后端 API 地址：
```
VITE_API_URL=http://localhost:8787
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 启动。

### 4. 确保后端运行

前端需要连接到后端 API。请确保后端 Worker 已启动：
```bash
cd ../noagent
npm run dev
```

## 项目结构

```
letstalk/
├── src/
│   ├── components/
│   │   ├── ScenarioCard.tsx      # 场景卡片组件
│   │   ├── AudioRecorder.tsx     # 录音控制组件
│   │   └── EvaluationResult.tsx  # 评估结果展示
│   ├── hooks/
│   │   └── useAudioRecorder.ts   # 录音功能 Hook
│   ├── services/
│   │   └── api.ts                # API 调用服务
│   ├── types/
│   │   └── index.ts              # TypeScript 类型定义
│   ├── App.tsx                   # 主应用组件
│   └── index.css                 # 全局样式
├── .env.example                  # 环境变量模板
├── tailwind.config.js            # Tailwind 配置
└── package.json
```

## 使用指南

1. **查看场景**：页面加载时会自动获取一个随机练习场景
2. **开始录音**：点击麦克风按钮开始录音
3. **停止录音**：再次点击停止录音
4. **提交评估**：点击"Submit for Evaluation"按钮
5. **查看结果**：等待几秒后查看详细的评估报告
6. **继续练习**：点击"Try Next Scenario"继续下一个场景

## 构建与部署

### 本地构建

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 部署到 Cloudflare Pages

#### 方法 1: 通过 GitHub 自动部署

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Pages 部分
4. 点击 "Create a project"
5. 连接你的 GitHub 仓库
6. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework preset**: `Vite`
7. 添加环境变量：
   - `VITE_API_URL`: 你的后端 Worker URL
8. 点击 "Save and Deploy"

#### 方法 2: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 构建项目
npm run build

# 部署到 Pages
wrangler pages deploy dist --project-name=letstalk
```

## 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_URL` | 后端 API 地址 | `https://your-worker.workers.dev` |

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

需要支持：
- MediaRecorder API
- getUserMedia API
- Fetch API

## 开发注意事项

### 录音权限

首次使用时，浏览器会请求麦克风权限。请确保：
- 使用 HTTPS 或 localhost
- 允许麦克风权限
- 检查浏览器设置

### CORS 问题

如果遇到 CORS 错误，请确保后端 Worker 已正确配置 CORS：
```typescript
app.use('/*', cors({
  origin: '*', // 或指定前端域名
}));
```

### 音频格式

录音使用 WebM 格式（如果浏览器不支持则回退到 MP4）。后端 Whisper API 支持多种格式。

## 性能优化

- 使用 Vite 的代码分割
- 图片和资源懒加载
- Tailwind CSS 的 purge 配置自动移除未使用的样式
- API 请求错误处理和重试机制

## 故障排除

### 问题：无法录音

**解决方案**：
- 检查浏览器麦克风权限
- 确保使用 HTTPS 或 localhost
- 查看浏览器控制台错误信息

### 问题：API 请求失败

**解决方案**：
- 检查 `.env` 文件中的 `VITE_API_URL` 配置
- 确保后端 Worker 正在运行
- 查看网络请求详情

### 问题：评估速度慢

**解决方案**：
- 这是正常的，OpenAI API 需要几秒处理时间
- 确保网络连接良好
- 考虑录制较短的音频（1-2分钟）

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT
