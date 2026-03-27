import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Star, Zap, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { skills, categories, type Category, type Skill } from "@/data/skills";
import { InstallDialog } from "@/components/InstallDialog";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-foreground/85 text-foreground/85" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function SkillCard({ skill, index, onInstall }: { skill: Skill; index: number; onInstall: (s: Skill) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{categories.find((c) => c.id === skill.category)?.icon}</span>
          <h3 className="font-mono font-semibold text-foreground text-base tracking-tight">{skill.name}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/85 leading-relaxed mb-3">{skill.description}</p>

      {/* Use case */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground/80">{skill.useCase}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skill.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-mono">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <StarRating rating={skill.rating} />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onInstall(skill)}
            className="h-8 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/80 shadow-none rounded-lg transition-all"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            安装
          </Button>
          <a
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<Category | "all">("all");
  const [installSkill, setInstallSkill] = useState<Skill | null>(null);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchCat = selectedCat === "all" || s.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  const activeCats = useMemo(() => {
    const used = new Set(filtered.map((s) => s.category));
    return categories.filter((c) => selectedCat === "all" ? used.has(c.id) : c.id === selectedCat);
  }, [filtered, selectedCat]);

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
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              精选 Claude 系与 OpenClaw 生态中最实用的 Skills。支持搜索、浏览与一键安装。
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        {/* Search & Filters */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-lg border-b border-border pb-5 pt-3 -mx-6 px-6 mb-2">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="搜索 Skills（名称、描述、标签）..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-secondary border-border text-foreground font-mono text-base placeholder:text-muted-foreground focus-visible:ring-foreground/20 rounded-xl"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1.5 font-medium">分类</span>
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCat === "all"
                  ? "bg-foreground text-background border border-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(selectedCat === cat.id ? "all" : cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                  selectedCat === cat.id
                    ? "bg-foreground text-background border border-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <p className="text-sm text-muted-foreground font-mono">
            {filtered.length} 个 Skills
          </p>
        </div>

        {/* Grid by category */}
        <AnimatePresence mode="wait">
          {activeCats.map((cat) => {
            const catSkills = filtered.filter((s) => s.category === cat.id);
            if (catSkills.length === 0) return null;
            return (
              <motion.section
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-lg">{cat.icon}</span>
                  <h2 className="text-lg font-display font-semibold text-foreground">{cat.label}</h2>
                  <span className="text-xs text-muted-foreground font-mono ml-1">({catSkills.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catSkills.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} index={i} onInstall={setInstallSkill} />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">没有找到匹配的 Skill</p>
          </div>
        )}

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

      {/* Install Dialog */}
      <InstallDialog skill={installSkill} open={!!installSkill} onOpenChange={(open) => !open && setInstallSkill(null)} />
    </div>
  );
}


