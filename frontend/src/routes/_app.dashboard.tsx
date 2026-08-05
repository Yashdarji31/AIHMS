import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Users, Stethoscope, CalendarDays, DollarSign, BedDouble, Pill, Clock,
  Activity, Siren, Sparkles, ArrowUpRight, HeartPulse, FileText,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Executive Dashboard — AIHMS" }] }),
  component: DashboardPage,
});

const PIE_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-muted-foreground)"];

function DashboardPage() {
  const { data: analytics, isLoading } = useQuery({ queryKey: ["analytics"], queryFn: api.getAnalytics });
  const { data: appts } = useQuery({ queryKey: ["appointments"], queryFn: api.getAppointments });
  const { data: emergency } = useQuery({ queryKey: ["emergency"], queryFn: api.getEmergencyCases });

  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        description="Real-time hospital operations, powered by AIHMS."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/analytics">View analytics</Link></Button>
            <Button asChild><Link to="/appointments">New appointment</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || !analytics ? (
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (
          <>
            <StatCard label="Total Patients" value={analytics.kpis.totalPatients.toLocaleString()} delta="+3.2% vs last week" icon={Users} tone="primary" />
            <StatCard label="Doctors" value={analytics.kpis.doctors} delta="12 on shift" icon={Stethoscope} tone="info" />
            <StatCard label="Revenue (MTD)" value={`₹${(analytics.kpis.revenueMTD / 100000).toFixed(1)}L`} delta="+8.1% MoM" icon={DollarSign} tone="success" />
            <StatCard label="Admissions" value={analytics.kpis.admissions} delta={`${analytics.kpis.discharges} discharges`} icon={Activity} tone="primary" />
            <StatCard label="Avg. Waiting Time" value={`${analytics.kpis.avgWaitMin} min`} delta="-6 min WoW" icon={Clock} tone="info" />
            <StatCard label="Beds Available" value={analytics.kpis.bedsAvailable} delta="of 260 total" icon={BedDouble} tone="warning" />
            <StatCard label="Medicines" value={analytics.kpis.medicinesInStock.toLocaleString()} delta="12 low stock" icon={Pill} tone="warning" />
            <StatCard label="Emergency Cases" value={emergency?.length ?? 0} delta="2 critical" icon={Siren} tone="destructive" />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Monthly revenue</CardTitle>
              <CardDescription>Consolidated across all departments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/analytics">Details <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.monthlyRevenue ?? []}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease distribution</CardTitle>
            <CardDescription>Active cases by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics?.diseaseDistribution ?? []} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                    {(analytics?.diseaseDistribution ?? []).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(analytics?.diseaseDistribution ?? []).map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto font-medium">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily patients</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.dailyPatients ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bed occupancy</CardTitle>
            <CardDescription>Live status by ward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.bedOccupancy ?? []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="ward" type="category" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={70} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="occupied" stackId="a" fill="var(--color-primary)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="available" stackId="a" fill="var(--color-muted)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health trend</CardTitle>
            <CardDescription>BP · Sugar · Pulse (avg)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics?.healthTrend ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="bp" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sugar" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pulse" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming appointments</CardTitle>
              <CardDescription>Next scheduled patient visits</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/appointments">View all</Link></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {(appts ?? []).slice(0, 6).map((a) => (
                <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{a.patient} <span className="text-muted-foreground">·</span> <span className="text-muted-foreground">{a.doctor}</span></div>
                    <div className="truncate text-xs text-muted-foreground">{a.department} · {a.reason}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="text-right text-xs">
                      <div className="font-medium">{a.time}</div>
                      <div className="text-muted-foreground">{a.date}</div>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI insights</CardTitle>
              <CardDescription>Predictions from the AIHMS models</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: BedDouble, title: "Bed occupancy forecast", body: "Projected 92% occupancy tomorrow. Prepare 6 general beds.", tone: "warning" as const },
              { icon: Pill, title: "Inventory prediction", body: "Amoxicillin 250mg will stock-out in 4 days at current burn.", tone: "destructive" as const },
              { icon: HeartPulse, title: "Readmission risk", body: "3 discharged patients above 70% readmission risk in 30 days.", tone: "info" as const },
              { icon: FileText, title: "Report summarizer", body: "48 lab reports pending clinical summary generation.", tone: "primary" as const },
            ].map((t) => (
              <div key={t.title} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <t.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.body}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/ai-center">Open AI Center</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}