import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { EntryPoint } from "@/data/entry-points";

export interface EntryPointButtonProps {
  id: EntryPoint;
  label: string;
  icon: string;
  description: string;
  isExpanded: boolean;
  onClick: () => void;
}

export function EntryPointButton({
  id,
  label,
  icon,
  description,
  isExpanded,
  onClick,
}: EntryPointButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left group relative"
      initial={false}
      animate={{
        scale: isExpanded ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`
          relative w-full p-6 rounded-2xl border transition-all duration-300
          ${isExpanded
            ? "bg-card border-foreground/20 shadow-elevated"
            : "bg-card/80 border-border hover:border-foreground/30 hover:shadow-card"
          }
        `}
      >
        {/* Background gradient on hover */}
        <div
          className={`
            absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "group-hover:opacity-100"}
          `}
          style={{
            background: id === 'web'
              ? "radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.08), transparent 50%)"
              : id === 'app'
              ? "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.08), transparent 50%)"
              : "radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.08), transparent 50%)"
          }}
        />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon container */}
            <div
              className={`
                h-14 w-14 rounded-xl flex items-center justify-center text-2xl
                transition-all duration-300
                ${isExpanded
                  ? "bg-foreground/10 shadow-soft"
                  : "bg-secondary group-hover:bg-foreground/5"
                }
              `}
            >
              {icon}
            </div>

            {/* Text content */}
            <div>
              <h3
                className={`
                  text-lg font-display font-semibold tracking-tight transition-colors
                  ${isExpanded ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"}
                `}
              >
                {label}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {description}
              </p>
            </div>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              p-2 rounded-lg transition-colors
              ${isExpanded
                ? "bg-foreground/10 text-foreground"
                : "bg-transparent text-muted-foreground group-hover:text-foreground"
              }
            `}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}