import { motion } from "framer-motion";
import { ExternalLink, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/data/skills";

interface EntryPointSkillsGridProps {
  skills: Skill[];
  onInstall: (skill: Skill) => void;
}

export function EntryPointSkillsGrid({ skills, onInstall }: EntryPointSkillsGridProps) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        暂无推荐技能
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group relative bg-secondary/50 rounded-xl p-4 border border-border/50 hover:border-border hover:bg-secondary/80 transition-all duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-mono font-semibold text-foreground text-sm tracking-tight line-clamp-1">
              {skill.name}
            </h4>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {skill.description}
          </p>

          {/* Use case */}
          <div className="flex items-center gap-1.5 mb-3">
            <Zap className="h-3 w-3 text-muted-foreground shrink-0" />
            <span className="text-xs text-foreground/70 line-clamp-1">{skill.useCase}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skill.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-2 py-0.5 font-mono bg-background/50"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Button
              size="sm"
              onClick={() => onInstall(skill)}
              className="h-7 px-3 text-xs font-medium bg-foreground text-background hover:bg-foreground/80 shadow-none rounded-lg transition-all flex-1"
            >
              <Download className="h-3 w-3 mr-1" />
              安装
            </Button>
            <a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-background/50 transition-colors text-muted-foreground hover:text-foreground"
              title="查看文档"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}