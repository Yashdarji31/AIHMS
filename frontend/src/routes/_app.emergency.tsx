import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Siren, Ambulance, HeartPulse } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/emergency")({
  head: () => ({ meta: [{ title: "Emergency — AIHMS" }] }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { data = [] } = useQuery({ queryKey: ["emergency"], queryFn: api.getEmergencyCases });
  return (
    <div>
      <PageHeader title="Emergency Module" description="Triage board and priority queue for ER intake."
        actions={<><Button variant="outline"><Ambulance className="h-4 w-4" /> Dispatch ambulance</Button><Button><Siren className="h-4 w-4" /> New emergency</Button></>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active cases" value={data.length} icon={Siren} tone="destructive" />
        <StatCard label="Critical" value={data.filter((e) => e.priority === "Critical").length} icon={HeartPulse} tone="destructive" />
        <StatCard label="High" value={data.filter((e) => e.priority === "High").length} icon={HeartPulse} tone="warning" />
        <StatCard label="Ambulances" value={3} icon={Ambulance} tone="info" />
      </div>
      <DataTable rows={data} searchKeys={["patient","condition","assignedTo"] as const as any}
        columns={[
          { key: "id", header: "ID" },
          { key: "patient", header: "Patient" },
          { key: "arrival", header: "Arrival" },
          { key: "condition", header: "Condition" },
          { key: "assignedTo", header: "Assigned to" },
          { key: "priority", header: "Priority", cell: (r) => <StatusBadge status={r.priority} /> },
        ]}
      />
    </div>
  );
}