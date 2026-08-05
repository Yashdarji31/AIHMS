import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, delta, icon: Icon, tone = "primary",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "info" | "destructive";
}) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]",
    warning: "bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]",
    info: "bg-[color:var(--color-info)]/15 text-[color:var(--color-info)]",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-0.5 truncate text-2xl font-bold">{value}</div>
          {delta && <div className="mt-0.5 text-xs text-muted-foreground">{delta}</div>}
        </div>
      </CardContent>
    </Card>
  );
}