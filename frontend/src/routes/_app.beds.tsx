import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BedDouble } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/beds")({
  head: () => ({ meta: [{ title: "Bed Management — AIHMS" }] }),
  component: BedsPage,
});

const wards = ["ICU","General","Emergency","Private"] as const;

function BedsPage() {
  const { data = [] } = useQuery({ queryKey: ["beds"], queryFn: api.getBeds });
  const stats = wards.map((w) => ({
    ward: w,
    occupied: data.filter((b) => b.ward === w && b.status === "Occupied").length,
    available: data.filter((b) => b.ward === w && b.status === "Available").length,
    maintenance: data.filter((b) => b.ward === w && b.status === "Maintenance").length,
  }));
  return (
    <div>
      <PageHeader title="Bed Management" description="Real-time occupancy across ICU, General, Emergency and Private wards." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.ward} label={s.ward} value={`${s.occupied}/${s.occupied + s.available + s.maintenance}`} delta={`${s.available} available`} icon={BedDouble}
            tone={s.available === 0 ? "destructive" : s.available < 3 ? "warning" : "success"} />
        ))}
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Ward occupancy</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="ward" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="occupied" stackId="a" fill="var(--color-primary)" />
                  <Bar dataKey="available" stackId="a" fill="var(--color-chart-2)" />
                  <Bar dataKey="maintenance" stackId="a" fill="var(--color-muted-foreground)" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Legend</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-primary" /> Occupied</div>
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[color:var(--color-chart-2)]" /> Available</div>
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-muted-foreground" /> Maintenance</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="All">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          {wards.map((w) => <TabsTrigger key={w} value={w}>{w}</TabsTrigger>)}
        </TabsList>
        {(["All", ...wards] as const).map((w) => (
          <TabsContent key={w} value={w} className="mt-4">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {data.filter((b) => w === "All" ? true : b.ward === w).map((b) => (
                <div key={b.id} className={cn(
                  "rounded-md border p-3 text-center text-xs",
                  b.status === "Occupied" && "border-primary/40 bg-primary/10 text-primary",
                  b.status === "Available" && "border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]",
                  b.status === "Maintenance" && "border-border bg-muted text-muted-foreground",
                )}>
                  <BedDouble className="mx-auto h-4 w-4" />
                  <div className="mt-1 font-semibold">{b.number}</div>
                  <div className="text-[10px] opacity-80">{b.status}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}