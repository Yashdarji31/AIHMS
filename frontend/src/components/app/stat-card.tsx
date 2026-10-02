import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?:
    | "primary"
    | "success"
    | "warning"
    | "info"
    | "destructive";
}) {
  const toneMap = {
    primary: {
      icon: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      accent: "bg-blue-500",
    },

    success: {
      icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      accent: "bg-emerald-500",
    },

    warning: {
      icon: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      accent: "bg-amber-500",
    },

    info: {
      icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
      accent: "bg-cyan-500",
    },

    destructive: {
      icon: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
      accent: "bg-red-500",
    },
  };

  const colors = toneMap[tone];

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="h-full"
    >
      <Card
        className="
          relative
          h-full
          overflow-hidden
          border-slate-200
          bg-white
          shadow-sm
          transition-shadow
          hover:shadow-md
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Top accent */}

        <div
          className={cn(
            "absolute left-0 top-0 h-1 w-full",
            colors.accent
          )}
        />

        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">

            {/* Information */}

            <div className="min-w-0">

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {label}
              </p>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {value}
              </h2>

              {delta && (
                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {delta}
                </p>
              )}
            </div>

            {/* Icon */}

            <div
              className={cn(
                `
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                `,
                colors.icon
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}