import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { categories, type Skill } from "@/data/skills";

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

interface SkillCardWithInstallProps {
  skill: Skill;
  index?: number;
  onInstall: (skill: Skill) => void;
}

export function SkillCardWithInstall({ skill, index = 0, onInstall }: SkillCardWithInstallProps) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const { toast } = useToast();

  // Get actual install commands from data
  const installCmds = skill.installCmds || [];
  
  // Only show commands that exist in the data
  const npxCmd = installCmds.find(c => c.platform === 'claude-code')?.cmd;
  const clawhubCmd = installCmds.find(c => c.platform === 'openclaw')?.cmd;

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 2000);
      toast({ description: "已复制到剪贴板" });
    } catch {
      toast({ variant: "destructive", description: "复制失败" });
    }
  };

  const categoryIcon = categories.find(c => c.id === skill.category)?.icon || '📦';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{categoryIcon}</span>
            <h3 className="font-mono font-semibold text-foreground text-base tracking-tight">
              {skill.name}
            </h3>
          </div>
          <StarRating rating={skill.rating} />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/85 leading-relaxed mb-3 line-clamp-2">
          {skill.description}
        </p>

        {/* Use case */}
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm text-foreground/80">{skill.useCase}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Install Section */}
      <div className="border-t border-border bg-secondary/30 p-4 space-y-3">
        {/* NPX Command - only show if exists */}
        {npxCmd && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16 shrink-0">Claude Code</span>
            <div className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 font-mono text-xs text-foreground overflow-x-auto">
              {npxCmd}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleCopy(npxCmd)}
              className="shrink-0 h-8 w-8 rounded-lg"
              title="复制"
            >
              {copiedCmd === npxCmd ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        )}

        {/* Clawhub Command - only show if exists */}
        {clawhubCmd && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16 shrink-0">OpenClaw</span>
            <div className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 font-mono text-xs text-foreground overflow-x-auto">
              {clawhubCmd}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleCopy(clawhubCmd)}
              className="shrink-0 h-8 w-8 rounded-lg"
              title="复制"
            >
              {copiedCmd === clawhubCmd ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        )}

        {/* No install commands */}
        {installCmds.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            暂无安装命令，请查看 GitHub 仓库
          </p>
        )}

        {/* Install Button */}
        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            onClick={() => onInstall(skill)}
            className="h-8 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/80 shadow-none rounded-lg transition-all"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            查看详情
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default SkillCardWithInstall;