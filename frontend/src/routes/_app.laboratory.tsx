import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Upload, Download, FlaskConical, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/laboratory")({
  head: () => ({ meta: [{ title: "Laboratory — AIHMS" }] }),
  component: LabPage,
});

function LabPage() {
  const { data = [] } = useQuery({ queryKey: ["labs"], queryFn: api.getLabTests });
  return (
    <div>
      <PageHeader title="Laboratory" description="Test requests, results and AI-assisted report summaries."
        actions={<><Button variant="outline"><Upload className="h-4 w-4" /> Upload report</Button><Button><Download className="h-4 w-4" /> Download all</Button></>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pending" value={data.filter((l) => l.status === "Pending").length} icon={FlaskConical} tone="warning" />
        <StatCard label="In progress" value={data.filter((l) => l.status === "In Progress").length} icon={FlaskConical} tone="info" />
        <StatCard label="Completed" value={data.filter((l) => l.status === "Completed").length} icon={FlaskConical} tone="success" />
        <StatCard label="AI summaries" value={12} icon={Sparkles} tone="primary" />
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>All tests</CardTitle><CardDescription>Sortable, filterable list of ordered tests</CardDescription></CardHeader>
          <CardContent>
            <DataTable
              rows={data}
              searchKeys={["patient","test","requestedBy"] as const as any}
              pageSize={6}
              columns={[
                { key: "id", header: "ID" },
                { key: "patient", header: "Patient" },
                { key: "test", header: "Test" },
                { key: "requestedBy", header: "Requested by" },
                { key: "date", header: "Date" },
                { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI report summary</CardTitle>
            <CardDescription>Auto-generated clinical summary preview</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <div className="text-xs font-semibold text-muted-foreground">CBC · P-1023</div>
              <p className="mt-1">Hemoglobin 11.2 g/dL (low), WBC 9,600, Platelets 250k. Mild microcytic anemia; recommend iron studies.</p>
              <div className="mt-2 text-[11px] text-muted-foreground">Confidence: 92%</div>
            </div>
            <Button variant="outline" className="w-full">Run analysis on selected</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}