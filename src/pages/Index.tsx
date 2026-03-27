import { motion } from "framer-motion";
import { Zap, ExternalLink } from "lucide-react";
import { useMode } from "@/hooks/use-mode";
import { BasicModeView } from "@/components/BasicModeView";
import { ProModeView } from "@/components/ProModeView";
import { ModeToggle } from "@/components/ModeToggle";

export default function Index() {
  const { mode } = useMode();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative border-b border-border">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl border border-border shadow-soft flex items-center justify-center">
                <Zap className="h-4 w-4 text-foreground" />
              </div>
              <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">2026 · Skills Yellow Page</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-foreground">
              AI Skills 目录
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
              精选 Claude 系与 OpenClaw 生态中最实用的 Skills。支持搜索、浏览与一键安装。
            </p>
            {/* Mode Toggle */}
            <ModeToggle />
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        {/* Conditional rendering based on mode */}
        {mode === "basic" ? <BasicModeView /> : <ProModeView />}

        <section className="mb-12 border border-border rounded-2xl shadow-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <ExternalLink className="h-5 w-5 text-foreground" />
            <h2 className="text-xl font-display font-semibold text-foreground">资源目录</h2>
          </div>

          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-base">1. ClawHub - OpenClaw 生态技能商店</h3>
                <a href="https://clawhub.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground font-mono underline-offset-4 hover:underline shrink-0">clawhub.ai</a>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed mb-2">收录大量社区技能，支持搜索、分类浏览与安装指引。</p>
              <div className="bg-secondary rounded-lg px-4 py-2.5 font-mono text-xs text-foreground inline-block">npm i -g clawhub && clawhub search xxx</div>
            </div>

            <div className="border-b border-border pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-base">2. skills.sh - Agent Skills 目录</h3>
                <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground font-mono underline-offset-4 hover:underline shrink-0">skills.sh</a>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed mb-2">聚合多种 Agent 平台技能，并提供仓库跳转。</p>
              <div className="bg-secondary rounded-lg px-4 py-2.5 font-mono text-xs text-foreground inline-block">npx skills add owner/repo</div>
            </div>

            <div className="border-b border-border pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-base">3. awesome-claude-skills</h3>
                <a href="https://github.com/ComposioHQ/awesome-claude-skills" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground font-mono underline-offset-4 hover:underline shrink-0">GitHub</a>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">面向 Claude 的精选技能合集，适合快速发现高质量项目。</p>
            </div>

            <div className="border-b border-border pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-base">4. awesome-openclaw-skills</h3>
                <a href="https://github.com/VoltAgent/awesome-openclaw-skills" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground font-mono underline-offset-4 hover:underline shrink-0">GitHub</a>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">面向 OpenClaw 的整理清单，覆盖常见任务场景。</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-base mb-3">5. 其他补充目录</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <a href="https://github.com/alirezarezvani/claude-skills" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">alirezarezvani/claude-skills</p>
                    <p className="text-xs text-muted-foreground">社区维护的 Claude Skills 集合</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
                <a href="https://github.com/MiniMax-AI/skills" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">MiniMax-AI/skills</p>
                    <p className="text-xs text-muted-foreground">MiniMax 官方 AI Skills（前端/全栈/移动端/Shader）</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
                <a href="https://github.com/JimLiu/baoyu-skills" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">JimLiu/baoyu-skills</p>
                    <p className="text-xs text-muted-foreground">内容生成技能栈（信息图/幻灯片/漫画/封面图）</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
                <a href="https://mcpmarket.com/tools/skills/leaderboard" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">MCP Market Leaderboard</p>
                    <p className="text-xs text-muted-foreground">第三方技能热度榜单</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
                <a href="https://oneskill.dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">oneskill.dev</p>
                    <p className="text-xs text-muted-foreground">面向 Agent 技能的提交与浏览站点</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
                <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 hover:bg-secondary/80 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-foreground">Claude 官方 Skills 文档</p>
                    <p className="text-xs text-muted-foreground">官方规范与开发指南</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-muted-foreground font-mono">
          Skills Yellow Page · 数据来源于社区公开资料 · 2026
        </div>
      </footer>
    </div>
  );
}