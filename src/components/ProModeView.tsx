import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { skills, categories, type Category, type Skill } from "@/data/skills";
import { SkillCardWithInstall } from "@/components/SkillCardWithInstall";
import { InstallDialog } from "@/components/InstallDialog";

type SortOption = "default" | "rating" | "name";

export function ProModeView() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [installSkill, setInstallSkill] = useState<Skill | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = skills.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchCat = selectedCat === "all" || s.category === selectedCat;
      return matchSearch && matchCat;
    });

    // Sort
    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCat, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <header className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-7 w-7 rounded-lg border border-border shadow-soft flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-foreground" />
            </div>
            <h1 className="text-lg font-display font-semibold text-foreground tracking-tight">
              Pro Mode · Skills Library
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            完整技能目录，快速浏览与安装
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Search & Controls - Sticky */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-3 pt-1 -mx-4 px-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索名称、描述、标签..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-9 bg-secondary border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:ring-foreground/20 rounded-lg"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[140px] h-9 bg-secondary border-border rounded-lg text-sm">
                <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border rounded-lg">
                <SelectItem value="default" className="text-sm">默认顺序</SelectItem>
                <SelectItem value="rating" className="text-sm">评分最高</SelectItem>
                <SelectItem value="name" className="text-sm">名称排序</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCat === "all"
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              全部 ({skills.length})
            </button>
            {categories.map((cat) => {
              const count = skills.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(selectedCat === cat.id ? "all" : cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all flex items-center gap-1 ${
                    selectedCat === cat.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground font-mono">
            显示 {filteredAndSorted.length} 个 Skills
          </p>
        </div>

        {/* Skills Grid - 4 cols xl, 3 lg, 2 md, 1 mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCat}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredAndSorted.map((skill, i) => (
              <SkillCardWithInstall
                key={skill.id}
                skill={skill}
                index={i}
                onInstall={setInstallSkill}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">没有找到匹配的 Skill</p>
          </div>
        )}
      </main>

      {/* Install Dialog */}
      <InstallDialog
        skill={installSkill}
        open={!!installSkill}
        onOpenChange={(open) => !open && setInstallSkill(null)}
      />
    </div>
  );
}

export default ProModeView;