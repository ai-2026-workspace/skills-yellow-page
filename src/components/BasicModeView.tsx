import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { skills } from "@/data/skills";
import { entryPoints, entryPointSkills, type EntryPoint } from "@/data/entry-points";
import { EntryPointButton } from "@/components/EntryPointButton";
import { EntryPointSkillsGrid } from "@/components/EntryPointSkillsGrid";
import { InstallDialog } from "@/components/InstallDialog";
import type { Skill } from "@/data/skills";

export function BasicModeView() {
  const [expandedEntry, setExpandedEntry] = useState<EntryPoint | null>(null);
  const [installSkill, setInstallSkill] = useState<Skill | null>(null);

  const handleEntryClick = (id: EntryPoint) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  const getSkillsForEntry = (entryId: EntryPoint): Skill[] => {
    const skillIds = entryPointSkills[entryId] || [];
    return skillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter((s): s is Skill => s !== undefined);
  };

  const expandedSkills = useMemo(() => {
    if (!expandedEntry) return [];
    return getSkillsForEntry(expandedEntry);
  }, [expandedEntry]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-8 w-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-foreground" />
          </div>
          <span className="text-sm font-mono text-muted-foreground tracking-wide">
            小白模式
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground mb-2">
          你想做什么？
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          选择一个场景，我们会推荐最适合的 Skills 帮你快速上手。
        </p>
      </div>

      {/* Entry Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {entryPoints.map((entry) => (
          <EntryPointButton
            key={entry.id}
            id={entry.id}
            label={entry.label}
            icon={entry.icon}
            description={entry.description}
            isExpanded={expandedEntry === entry.id}
            onClick={() => handleEntryClick(entry.id)}
          />
        ))}
      </div>

      {/* Expanded Skills Panel */}
      <AnimatePresence mode="wait">
        {expandedEntry && (
          <motion.div
            key={expandedEntry}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="bg-card/50 rounded-2xl border border-border p-6 shadow-card"
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">
                  {entryPoints.find((e) => e.id === expandedEntry)?.icon}
                </span>
                <h3 className="text-base font-display font-semibold text-foreground">
                  推荐技能
                </h3>
                <span className="text-xs text-muted-foreground font-mono ml-1">
                  ({expandedSkills.length})
                </span>
              </div>

              {/* Skills grid */}
              <EntryPointSkillsGrid
                skills={expandedSkills}
                onInstall={setInstallSkill}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Dialog */}
      <InstallDialog
        skill={installSkill}
        open={!!installSkill}
        onOpenChange={(open) => !open && setInstallSkill(null)}
      />
    </div>
  );
}