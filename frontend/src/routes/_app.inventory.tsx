import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Boxes, AlertTriangle, Truck } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/inventory")({
  head: () => ({ meta: [{ title: "Inventory — AIHMS" }] }),
  component: InventoryPage,
});

function InventoryPage() {
  const { data = [] } = useQuery({ queryKey: ["inventory"], queryFn: api.getMedicines });
  return (
    <div>
      <PageHeader title="Inventory" description="Medicines, consumables and equipment across warehouses." actions={<Button>Add item</Button>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total SKUs" value={data.length} icon={Boxes} tone="primary" />
        <StatCard label="Low stock" value={data.filter((m) => m.status === "Low Stock").length} icon={AlertTriangle} tone="warning" />
        <StatCard label="Out of stock" value={data.filter((m) => m.status === "Out of Stock").length} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Suppliers" value={5} icon={Truck} tone="info" />
      </div>
      <DataTable rows={data} searchKeys={["name","category","supplier"] as const as any}
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Item" },
          { key: "category", header: "Category" },
          { key: "stock", header: "Stock" },
          { key: "expiry", header: "Expiry" },
          { key: "supplier", header: "Supplier" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </div>
  );
}