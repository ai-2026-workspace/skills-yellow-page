import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { useMode, type Mode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { mode, setMode } = useMode();

  const isPro = mode === "pro";

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
          !isPro
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        🎯 小白模式
      </button>

      <Switch
        checked={isPro}
        onCheckedChange={(checked) => setMode(checked ? "pro" : "basic")}
        aria-label="切换模式"
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      />

      <button
        type="button"
        onClick={() => setMode("pro")}
        className={cn(
          "text-sm font-medium transition-all duration-200",
          isPro
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        ⚡ Pro 模式
      </button>
    </div>
  );
}