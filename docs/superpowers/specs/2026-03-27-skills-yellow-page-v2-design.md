# Skills Yellow Page v2 设计方案

## 概述

将 Skills Yellow Page 从"技能展示页"升级为"极致易用的技能发现与安装工具"。核心目标：让小白用户能一键找到最合适的 Skill，让专业用户能看到完整技术细节。

## 核心策略

- **默认小白模式** — 任务直通车，2步内完成安装
- **Pro 模式可切换** — 完整技能库 + 高级筛选
- **命令区分平台** — CLAUDE Code vs OpenAI Codex 一键切换复制

---

## 界面设计

### 1. 入口层（默认小白模式）

首页显示 3 个大按钮入口：

| 入口 | 推荐 Skills |
|------|------------|
| 🕸️ 做网页 | frontend-dev, fullstack-dev, frontend-design, impeccable |
| 📱 做App | android-native-dev, ios-application-dev |
| ✍️ 公众号文章 | pdf-docx, summarize |

点击按钮后展开推荐 Skills 卡片组，支持一键安装。

### 2. 技能卡片交互

```
┌─────────────────────────────────────────────────┐
│  🧨 frontend-dev                          ⭐⭐⭐⭐⭐ │
│  全栈前端开发，融合高级 UI 设计、电影级动画...   │
│                                                 │
│  🏷️ React  Next.js  Tailwind CSS              │
├─────────────────────────────────────────────────┤
│  ○ Claude Code    ○ OpenAI Codex        [复制]  │
│  npx skills add minimax/frontend-dev            │
└─────────────────────────────────────────────────────┘
```

- **radio 按钮**：切换命令平台，左选左显，右选右显
- **复制按钮**：一键复制当前显示的命令到剪贴板
- 平台前缀明确标注（Claude Code / OpenAI Codex）

### 3. Pro 模式

- **顶部 Toggle**：全局切换开关
- **URL 参数支持**：`?mode=pro`，方便分享
- **记住偏好**：localStorage 存储用户模式选择

Pro 模式展示：
- 完整技能库（紧凑网格布局）
- 分类筛选
- 技能详情：名称、描述、技术栈、installCmd、对应的两个平台命令

---

## 数据模型

```typescript
type Platform = 'claude-code' | 'openai-codex';

interface SkillInstall {
  platform: Platform;
  cmd: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  useCase: string;
  rating: number;
  category: Category;
  tags: string[];
  url: string;
  // 区分平台的安装命令
  installCmds: SkillInstall[];
}
```

---

## 实施计划

### Phase 1: 入口与直通车
- 改造首页为 3 入口布局（做网页/做App/公众号文章）
- 实现点击展开推荐 Skills逻辑

### Phase 2: 安装交互
- 技能卡片增加 radio 切换
- 复制功能
- installCmd 按平台区分存储

### Phase 3: Pro 模式
- Toggle 切换组件
- URL 参数 + localStorage 记忆
- Pro 模式完整技能库视图

---

## 验收标准

- [ ] 小白用户 30 秒内能完成首次 Skill 安装
- [ ] Pro 用户能快速复制任意平台的安装命令
- [ ] 模式切换操作不超过 1 次点击
- [ ] URL 可直接打开指定模式