import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { useMode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { mode, setMode } = useMode();

  const handleToggle = (checked: boolean) => {
    setMode(checked ? "pro" : "basic");
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-muted/50 px-4 py-2",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setMode("basic")}
        className={cn(
          "text-sm font-medium transition-all duration-200",
          mode !== "pro"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        🎯 小白模式
      </button>

      <Switch
        checked={mode === "pro"}
        onCheckedChange={handleToggle}
        aria-label="切换模式"
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      />

      <button
        type="button"
        onClick={() => setMode("pro")}
        className={cn(
          "text-sm font-medium transition-all duration-200",
          mode === "pro"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        ⚡ Pro 模式
      </button>
    </div>
  );
}