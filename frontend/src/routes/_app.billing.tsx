import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Receipt, Download, CreditCard, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/billing")({
  head: () => ({ meta: [{ title: "Billing — AIHMS" }] }),
  component: BillingPage,
});

function BillingPage() {
  const { data = [] } = useQuery({ queryKey: ["invoices"], queryFn: api.getInvoices });
  const total = data.reduce((s, i) => s + i.amount, 0);
  const paid = data.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  return (
    <div>
      <PageHeader title="Billing" description="Invoices, payments and insurance claims." actions={<Button><Receipt className="h-4 w-4" /> New invoice</Button>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Invoices" value={data.length} icon={Receipt} tone="primary" />
        <StatCard label="Total billed" value={`₹${(total/1000).toFixed(1)}k`} icon={CreditCard} tone="info" />
        <StatCard label="Collected" value={`₹${(paid/1000).toFixed(1)}k`} icon={CreditCard} tone="success" />
        <StatCard label="Insurance claims" value={18} icon={ShieldCheck} tone="warning" />
      </div>
      <DataTable rows={data} searchKeys={["patient","id","method"] as const as any}
        columns={[
          { key: "id", header: "Invoice" },
          { key: "patient", header: "Patient" },
          { key: "date", header: "Date" },
          { key: "amount", header: "Amount", cell: (r) => `₹${r.amount.toLocaleString()}` },
          { key: "method", header: "Method" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", cell: () => <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button> },
        ]}
      />
    </div>
  );
}