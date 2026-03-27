export type Category =
  | "meta"
  | "frontend"
  | "docs"
  | "devops"
  | "code-quality"
  | "automation"
  | "search"
  | "agent"
  | "design"
  | "productivity"
  | "mobile"
  | "graphics";

export interface Skill {
  id: string;
  name: string;
  description: string;
  useCase: string;
  rating: number;
  category: Category;
  url: string;
  installCmd?: string;
  installCmds?: { platform: 'claude-code' | 'openai-codex' | 'openclaw' | 'cursor'; cmd: string }[];
  entryPoints?: ('web' | 'app' | 'article')[];
  tags: string[];
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "meta", label: "元技能", icon: "🧬" },
  { id: "frontend", label: "前端/UI", icon: "🎨" },
  { id: "docs", label: "文档处理", icon: "📄" },
  { id: "code-quality", label: "代码质量", icon: "🔍" },
  { id: "devops", label: "CI/CD & 运维", icon: "🚀" },
  { id: "automation", label: "业务自动化", icon: "⚡" },
  { id: "search", label: "搜索 & 信息", icon: "🔎" },
  { id: "agent", label: "Agent 进化", icon: "🤖" },
  { id: "design", label: "设计打磨", icon: "✨" },
  { id: "productivity", label: "效率工具", icon: "📋" },
  { id: "mobile", label: "移动开发", icon: "📱" },
  { id: "graphics", label: "图形 & 视觉", icon: "🎬" },
];

export const skills: Skill[] = [
  {
    id: "skill-creator",
    name: "skill-creator",
    description:
      "元技能：让 Claude 帮你自动创建、迭代新 Skill（Anthropic 官方 meta 工具）",
    useCase: "入门/自定义任何新 Skill 的起点",
    rating: 5,
    category: "meta",
    url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    installCmd: "git clone → ~/.claude/skills/",
    installCmds: [{ platform: 'claude-code', cmd: 'git clone https://github.com/anthropics/skills.git ~/.claude/skills/skill-creator' }],
    tags: ["官方", "入门必装", "meta"],
  },
  {
    id: "find-skills",
    name: "find-skills (npx skills)",
    description: "Vercel 开源的 Skills CLI，搜索、安装、管理全网 Claude Skills",
    useCase: "发现新 Skill、一键安装、避免重复造轮子",
    rating: 5,
    category: "meta",
    url: "https://github.com/vercel-labs/skills",
    installCmd: "npx skills add find-skills",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add find-skills' }],
    tags: ["Vercel", "CLI", "必装", "skills.sh"],
  },
  {
    id: "frontend-design",
    name: "frontend-design",
    description:
      "Anthropic 官方前端设计 Skill，引导 Claude 生成生产级 UI（typography、color、motion、composition）",
    useCase: "前端/UI 设计、快速原型、避免 AI 审美",
    rating: 5,
    category: "frontend",
    url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    installCmd: "npx skills add frontend-design",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add frontend-design' }],
    entryPoints: ['web'],
    tags: ["React", "官方", "UI", "热门"],
  },
  {
    id: "pdf-docx",
    name: "pdf / docx / pptx / xlsx",
    description:
      "Anthropic 官方文档处理技能（提取、总结、编辑、转换结构化数据）",
    useCase: "知识工作、报告分析、批量文档处理",
    rating: 5,
    category: "docs",
    url: "https://github.com/anthropics/skills/tree/main/skills",
    installCmd: "git clone → ~/.claude/skills/",
    installCmds: [{ platform: 'claude-code', cmd: 'git clone https://github.com/anthropics/skills.git ~/.claude/skills/' }],
    entryPoints: ['article'],
    tags: ["文档", "PDF", "Excel", "官方"],
  },
  {
    id: "commit-helper",
    name: "commit-helper",
    description: "自动生成规范 commit message + changelog",
    useCase: "日常 Git 提交、团队协作",
    rating: 4,
    category: "code-quality",
    url: "https://github.com/anthropics/skills",
    installCmd: "npx skills add commit-helper",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add commit-helper' }],
    entryPoints: ['web'],
    tags: ["Git", "commit", "团队"],
  },
  {
    id: "pr-reviewer",
    name: "pr-reviewer",
    description:
      "自动代码审查（安全、性能、风格、建议改进），支持 GitHub PR 内联评论",
    useCase: "Code Review、提升代码质量",
    rating: 5,
    category: "code-quality",
    url: "https://github.com/SpillwaveSolutions/pr-reviewer-skill",
    installCmd: "npx skills add pr-reviewer",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add pr-reviewer' }],
    entryPoints: ['web'],
    tags: ["Code Review", "安全", "GitHub Actions"],
  },
  {
    id: "agent-browser",
    name: "agent-browser",
    description:
      "浏览器自动化，基于 Playwright 的网页操作（导航、点击、截图、数据抓取）",
    useCase: "网页数据采集、表单自动化、日常跑腿",
    rating: 5,
    category: "automation",
    url: "https://github.com/openclaw/skills",
    installCmd: "clawhub install agent-browser",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install agent-browser' }],
    tags: ["浏览器", "Playwright", "自动化", "热门"],
  },
  {
    id: "self-improving-agent",
    name: "self-improving-agent",
    description:
      "自我进化 Agent：从每次交互中学习、记忆失败、自动优化 Skill",
    useCase: "长期运行 Agent、越用越聪明",
    rating: 5,
    category: "agent",
    url: "https://github.com/VoltAgent/awesome-openclaw-skills",
    installCmd: "clawhub install self-improving-agent",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install self-improving-agent' }],
    tags: ["Agent", "进化", "记忆"],
  },
  {
    id: "capability-evolver",
    name: "capability-evolver",
    description:
      "Agent 能力自动进化引擎，分析运行历史并自动提炼新 Skill",
    useCase: "构建持久数字分身、长期任务优化",
    rating: 5,
    category: "agent",
    url: "https://clawhub.ai/autogame-17/capability-evolver",
    installCmd: "clawhub install capability-evolver",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install capability-evolver' }],
    tags: ["Agent", "进化", "数字分身"],
  },
  {
    id: "gog",
    name: "gog",
    description:
      "Google Workspace 全家桶 CLI（Gmail/Calendar/Drive/Docs/Sheets），Peter Steinberger 出品",
    useCase: "邮件/日程/文档自动化、效率神器",
    rating: 5,
    category: "productivity",
    url: "https://clawhub.ai/steipete/gog",
    installCmd: "clawhub install gog",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install gog' }],
    tags: ["Google", "Gmail", "Calendar", "119K+ downloads"],
  },
  {
    id: "tavily-search",
    name: "tavily-search",
    description:
      "AI 优化实时 web 搜索，结构化结果，支持 basic/advanced 模式",
    useCase: "研究、信息搜集、热点挖掘",
    rating: 4,
    category: "search",
    url: "https://clawhub.ai/arun-8687/tavily-search",
    installCmd: "clawhub install tavily-web-search",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install tavily-web-search' }],
    tags: ["搜索", "AI", "75K+ downloads"],
  },
  {
    id: "summarize",
    name: "summarize",
    description:
      "多格式总结（URL/PDF/音频/YouTube → 精炼输出），Peter Steinberger 出品",
    useCase: "快速消化长内容、每日简报",
    rating: 4,
    category: "productivity",
    url: "https://clawhub.ai/steipete/summarize",
    installCmd: "clawhub install summarize",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install summarize' }],
    entryPoints: ['article'],
    tags: ["总结", "PDF", "YouTube", "174K+ downloads"],
  },
  {
    id: "ontology",
    name: "ontology",
    description: "结构化知识图谱（实体关系、Typed graph），Agent 记忆基础设施",
    useCase: "第二大脑、复杂知识管理、Obsidian 增强",
    rating: 4,
    category: "search",
    url: "https://clawhub.ai/oswalpalash/ontology",
    installCmd: "clawhub install ontology",
    installCmds: [{ platform: 'openclaw', cmd: 'clawhub install ontology' }],
    entryPoints: ['article'],
    tags: ["知识图谱", "Obsidian", "114K+ downloads"],
  },
  {
    id: "composio",
    name: "composio connect",
    description:
      "一键解锁 1000+ 外部工具集成（GitHub/Slack/Gmail/Notion 等），自动处理 OAuth",
    useCase: "构建完整 AI Agent、工具链扩展",
    rating: 5,
    category: "automation",
    url: "https://github.com/composiohq/awesome-claude-skills",
    installCmd: "npx skills add composio-connect",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add composio-connect' }],
    tags: ["集成", "1000+ 工具", "OAuth"],
  },
  {
    id: "impeccable",
    name: "Impeccable",
    description:
      "设计语言 + 20 个命令（/polish /audit /spacing 等），让 AI 前端输出更有品味",
    useCase: "设计/产品打磨、提升视觉质感",
    rating: 5,
    category: "design",
    url: "https://github.com/pbakaus/impeccable",
    installCmd: "npx skills add impeccable",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add impeccable' }],
    entryPoints: ['web'],
    tags: ["UI", "10K+ stars", "impeccable.style"],
  },
  {
    id: "taste-skill",
    name: "Taste Skill",
    description:
      "让 AI 写出有品味的前端代码，高级字体 + 动画 + 间距，杜绝 AI 审美",
    useCase: "前端质感提升、避免 generic AI slop",
    rating: 4,
    category: "design",
    url: "https://github.com/Leonxlnx/taste-skill",
    installCmd: "npx skills add taste-skill",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add taste-skill' }],
    entryPoints: ['web'],
    tags: ["UI", "3.7K+ stars", "品味"],
  },
  {
    id: "awesome-claude-skills",
    name: "awesome-claude-skills",
    description:
      "社区精选 Claude Skills 合集，持续更新的 awesome list",
    useCase: "发现优质 Skill、学习最佳实践",
    rating: 5,
    category: "meta",
    url: "https://github.com/travisvn/awesome-claude-skills",
    installCmd: "",
    tags: ["合集", "9K+ stars", "awesome-list"],
  },
  {
    id: "awesome-openclaw",
    name: "awesome-openclaw-skills",
    description:
      "5400+ OpenClaw Skills 精选分类合集，VoltAgent 维护",
    useCase: "发现优质 OpenClaw Skill、分类浏览",
    rating: 5,
    category: "meta",
    url: "https://github.com/VoltAgent/awesome-openclaw-skills",
    installCmd: "",
    tags: ["合集", "39K+ stars", "awesome-list"],
  },
  // MiniMax Skills
  {
    id: "frontend-dev",
    name: "frontend-dev",
    description:
      "全栈前端开发，融合高级 UI 设计、电影级动画（Framer Motion、GSAP）、通过 MiniMax API 生成媒体资源（图片、视频、音频、音乐、TTS）、基于 AIDA 框架的说服力文案、生成艺术（p5.js、Three.js、Canvas）。技术栈：React / Next.js、Tailwind CSS。",
    useCase: "高级前端开发、媒体生成、生成艺术",
    rating: 5,
    category: "frontend",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/frontend-dev",
    installCmd: "npx skills add minimax/frontend-dev",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/frontend-dev' }],
    entryPoints: ['web'],
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "MiniMax API", "生成艺术"],
  },
  {
    id: "fullstack-dev",
    name: "fullstack-dev",
    description:
      "全栈后端架构与前后端集成。REST API 设计、认证流程（JWT、Session、OAuth）、实时功能（SSE、WebSocket）、数据库集成（SQL / NoSQL）、生产环境加固与发布清单。引导式工作流：需求收集 → 架构决策 → 实现。",
    useCase: "后端架构、API 设计、数据库集成",
    rating: 5,
    category: "frontend",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/fullstack-dev",
    installCmd: "npx skills add minimax/fullstack-dev",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/fullstack-dev' }],
    entryPoints: ['web'],
    tags: ["REST API", "JWT", "OAuth", "WebSocket", "SQL", "NoSQL"],
  },
  {
    id: "android-native-dev",
    name: "android-native-dev",
    description:
      "基于 Material Design 3 的 Android 原生应用开发。Kotlin / Jetpack Compose、自适应布局、Gradle 配置、无障碍（WCAG）、构建问题排查、性能优化与动效系统。",
    useCase: "Android 原生开发、Kotlin、Material Design 3",
    rating: 5,
    category: "mobile",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/android-native-dev",
    installCmd: "npx skills add minimax/android-native-dev",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/android-native-dev' }],
    entryPoints: ['app'],
    tags: ["Kotlin", "Jetpack Compose", "Material Design 3", "Android", "WCAG"],
  },
  {
    id: "ios-application-dev",
    name: "ios-application-dev",
    description:
      "iOS 应用开发指南，涵盖 UIKit、SnapKit 和 SwiftUI。触控目标、安全区域、导航模式、Dynamic Type、深色模式、无障碍、集合视图，符合 Apple HIG 规范。",
    useCase: "iOS 开发、SwiftUI、Apple HIG",
    rating: 5,
    category: "mobile",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/ios-application-dev",
    installCmd: "npx skills add minimax/ios-application-dev",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/ios-application-dev' }],
    entryPoints: ['app'],
    tags: ["SwiftUI", "UIKit", "SnapKit", "Apple HIG", "Dynamic Type"],
  },
  {
    id: "shader-dev",
    name: "shader-dev",
    description:
      "全面的 GLSL 着色器技术，用于创建惊艳的视觉效果 — 光线行进、SDF 建模、流体模拟、粒子系统、程序化生成、光照、后处理等。兼容 ShaderToy。",
    useCase: "GLSL 着色器、视觉效果、ShaderToy",
    rating: 5,
    category: "graphics",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/shader-dev",
    installCmd: "npx skills add minimax/shader-dev",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/shader-dev' }],
    tags: ["GLSL", "ShaderToy", "SDF", "光线行进", "程序化生成"],
  },
  {
    id: "gif-sticker-maker",
    name: "gif-sticker-maker",
    description:
      "将照片（人物、宠物、物品、Logo）转换为 4 张带字幕的动画 GIF 贴纸。Funko Pop / Pop Mart 盲盒风格，基于 MiniMax 图片与视频生成 API。",
    useCase: "GIF 贴纸生成、Funko Pop 风格",
    rating: 5,
    category: "graphics",
    url: "https://github.com/MiniMax-AI/skills/tree/main/skills/gif-sticker-maker",
    installCmd: "npx skills add minimax/gif-sticker-maker",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add minimax/gif-sticker-maker' }],
    tags: ["GIF", "MiniMax API", "盲盒风格", "动画贴纸"],
  },
  // Baoyu Skills
  {
    id: "baoyu-infographic",
    name: "baoyu-infographic",
    description:
      "专业信息图生成器，支持 20 种布局（金字塔、时间线、韦恩图等）× 17 种视觉风格（手绘、赛博朋克、像素风等）。自动分析内容并推荐最佳组合。",
    useCase: "知识卡片、信息图、可视化内容创作",
    rating: 5,
    category: "graphics",
    url: "https://github.com/JimLiu/baoyu-skills",
    installCmd: "npx skills add jimliu/baoyu-skills",
    installCmds: [{ platform: 'claude-code', cmd: 'npx skills add jimliu/baoyu-skills' }],
    tags: ["信息图", "可视化", "11.8K+ stars", "Baoyu"],
  },
];
