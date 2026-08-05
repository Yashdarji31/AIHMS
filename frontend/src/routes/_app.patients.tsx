import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { UserPlus, Download, Users } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/patients")({
  head: () => ({ meta: [{ title: "Patients — AIHMS" }] }),
  component: PatientsPage,
});

function PatientsPage() {
  const { data = [] } = useQuery({ queryKey: ["patients"], queryFn: api.getPatients });

  return (
    <div>
      <PageHeader
        title="Patients"
        description="Registered patients and admissions across all departments."
        actions={
          <>
            <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
            <Button><UserPlus className="h-4 w-4" /> Add patient</Button>
          </>
        }
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Patients" value={data.length} icon={Users} tone="primary" />
        <StatCard label="Admitted" value={data.filter((p) => p.status === "Admitted").length} icon={Users} tone="info" />
        <StatCard label="Active" value={data.filter((p) => p.status === "Active").length} icon={Users} tone="success" />
        <StatCard label="Discharged" value={data.filter((p) => p.status === "Discharged").length} icon={Users} tone="warning" />
      </div>
      <DataTable
        rows={data}
        searchKeys={["name", "id", "doctor", "department"] as const as any}
        columns={[
          { key: "name", header: "Patient", cell: (r) => (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback>{r.name.split(" ").map((x) => x[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
              <div className="min-w-0">
                <div className="truncate font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.id} · {r.gender}, {r.age}</div>
              </div>
            </div>
          )},
          { key: "bloodGroup", header: "Blood" },
          { key: "doctor", header: "Doctor" },
          { key: "department", header: "Department" },
          { key: "lastVisit", header: "Last visit" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", cell: () => <Button variant="ghost" size="sm">View</Button> },
        ]}
      />
    </div>
  );
}