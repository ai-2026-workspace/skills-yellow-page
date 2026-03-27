import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { categories, type Skill } from "@/data/skills";

type Platform = 'claude-code' | 'openai-codex' | 'openclaw' | 'cursor';

interface SkillInstallCmd {
  platform: Platform;
  cmd: string;
}

const PLATFORM_LABELS: Record<Platform, string> = {
  'claude-code': 'Claude Code',
  'openai-codex': 'OpenAI Codex',
  'openclaw': 'OpenClaw',
  'cursor': 'Cursor',
};

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
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    skill.installCmds && skill.installCmds.length > 0 ? skill.installCmds[0].platform : null
  );
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const installCmds: SkillInstallCmd[] = skill.installCmds || [];
  const availablePlatforms = installCmds.map(cmd => cmd.platform);
  
  const currentCmd = installCmds.find(cmd => cmd.platform === selectedPlatform)?.cmd || '';

  const handleCopy = async () => {
    if (!currentCmd) return;
    
    try {
      await navigator.clipboard.writeText(currentCmd);
      setCopied(true);
      toast({
        description: "已复制到剪贴板",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        variant: "destructive",
        description: "复制失败",
      });
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
      {installCmds.length > 0 && (
        <div className="border-t border-border bg-secondary/30 p-4">
          {/* Platform Toggle */}
          <RadioGroup
            value={selectedPlatform || undefined}
            onValueChange={(value) => setSelectedPlatform(value as Platform)}
            className="flex flex-wrap gap-x-4 gap-y-2 mb-3"
          >
            {availablePlatforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <RadioGroupItem value={platform} id={`${skill.id}-${platform}`} />
                <Label
                  htmlFor={`${skill.id}-${platform}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {PLATFORM_LABELS[platform]}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Command Display */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground overflow-x-auto">
              {currentCmd || '暂无安装命令'}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              disabled={!currentCmd}
              className="shrink-0 h-10 w-10 rounded-lg"
              title="复制命令"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Install Button */}
          <div className="flex justify-end mt-3">
            <Button
              size="sm"
              onClick={() => onInstall(skill)}
              className="h-8 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/80 shadow-none rounded-lg transition-all"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              安装
            </Button>
          </div>
        </div>
      )}

      {/* No install commands available */}
      {installCmds.length === 0 && (
        <div className="border-t border-border bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground text-center">
            暂无安装命令
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default SkillCardWithInstall;