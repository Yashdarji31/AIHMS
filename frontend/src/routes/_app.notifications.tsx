import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2, Siren } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/app/empty-state";
import { cn } from "@/lib/utils";
import { api, type Notification } from "@/lib/api";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — AIHMS" }] }),
  component: NotificationsPage,
});

const iconMap = {
  info: { icon: Info, cls: "text-[color:var(--color-info)] bg-[color:var(--color-info)]/10" },
  warning: { icon: AlertTriangle, cls: "text-[color:var(--color-warning)] bg-[color:var(--color-warning)]/10" },
  success: { icon: CheckCircle2, cls: "text-[color:var(--color-success)] bg-[color:var(--color-success)]/10" },
  critical: { icon: Siren, cls: "text-destructive bg-destructive/10" },
};

function NotificationsPage() {
  const { data = [] } = useQuery({ queryKey: ["notifications"], queryFn: api.getNotifications });
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const isRead = (n: Notification) => n.read || readIds.has(n.id);
  const unread = data.filter((n) => !isRead(n));
  const read = data.filter((n) => isRead(n));

  return (
    <div>
      <PageHeader title="Notifications" description="Real-time alerts across the hospital."
        actions={<Button variant="outline" onClick={() => setReadIds(new Set(data.map((n) => n.id)))}><CheckCheck className="h-4 w-4" /> Mark all read</Button>} />
      <Tabs defaultValue="unread">
        <TabsList>
          <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        {([["unread", unread], ["read", read], ["all", data]] as const).map(([k, list]) => (
          <TabsContent key={k} value={k} className="mt-4">
            <Card><CardContent className="p-0">
              {list.length === 0 ? (
                <EmptyState icon={Bell} title="You're all caught up" description="No notifications to show." />
              ) : (
                <ul className="divide-y divide-border">
                  {list.map((n) => {
                    const m = iconMap[n.type];
                    return (
                      <li key={n.id} className={cn("grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 p-4", !isRead(n) && "bg-primary/5")}>
                        <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", m.cls)}><m.icon className="h-4 w-4" /></div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{n.title}</div>
                          <div className="text-xs text-muted-foreground">{n.message}</div>
                        </div>
                        <div className="shrink-0 text-xs text-muted-foreground">{n.time}</div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}