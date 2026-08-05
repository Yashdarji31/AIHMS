import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — AIHMS" }] }),
  component: AnalyticsPage,
});

const COLORS = ["var(--color-chart-1)","var(--color-chart-2)","var(--color-chart-3)","var(--color-chart-4)","var(--color-chart-5)","var(--color-muted-foreground)"];

function Chart({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent><div className="h-64">{children}</div></CardContent>
    </Card>
  );
}

const tt = { contentStyle: { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 } };

function AnalyticsPage() {
  const {data=[]} = useQuery({
  queryKey:["analytics"],
  queryFn: api.getAnalytics
});
  if (!data) return null;

  return (
    <div>
      <PageHeader title="Analytics" description="Operational, clinical and financial performance across the hospital." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Chart title="Patient growth" description="14-day trend">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.appointmentsTimeline}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...tt} />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#pg)" />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Revenue (last 7 months)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...tt} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Department performance" description="Patient throughput by department">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.departmentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="dept" type="category" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={110} />
              <Tooltip {...tt} />
              <Bar dataKey="patients" fill="var(--color-chart-2)" radius={[0,6,6,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Bed usage by ward">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.bedOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="ward" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...tt} />
              <Bar dataKey="occupied" stackId="a" fill="var(--color-primary)" />
              <Bar dataKey="available" stackId="a" fill="var(--color-chart-2)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Waiting time (avg. min per day)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dailyPatients.map((d) => ({ day: d.day, wait: 8 + Math.round(d.value / 40) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...tt} />
              <Line type="monotone" dataKey="wait" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Disease distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.diseaseDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                {data.diseaseDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip {...tt} />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    </div>
  );
}