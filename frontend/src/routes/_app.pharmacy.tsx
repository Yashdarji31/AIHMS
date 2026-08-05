import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Pill, AlertTriangle, TrendingDown, Sparkles, Scan } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/pharmacy")({
  head: () => ({ meta: [{ title: "Pharmacy — AIHMS" }] }),
  component: PharmacyPage,
});

function PharmacyPage() {
  const { data = [] } = useQuery({ queryKey: ["meds"], queryFn: api.getMedicines });
  return (
    <div>
      <PageHeader title="Pharmacy" description="Inventory, sales and AI-assisted stock predictions."
        actions={<><Button variant="outline"><Scan className="h-4 w-4" /> Scan barcode</Button><Button>Verify prescription</Button></>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="SKUs in inventory" value={data.length} icon={Pill} tone="primary" />
        <StatCard label="Low stock" value={data.filter((m) => m.status === "Low Stock").length} icon={TrendingDown} tone="warning" />
        <StatCard label="Expiring soon" value={3} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Today's sales" value="₹48,220" icon={Pill} tone="success" />
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Medicines</CardTitle></CardHeader>
          <CardContent>
            <DataTable rows={data} searchKeys={["name","category","supplier"] as const as any} pageSize={6}
              columns={[
                { key: "name", header: "Medicine" },
                { key: "category", header: "Category" },
                { key: "stock", header: "Stock" },
                { key: "price", header: "Price", cell: (r) => `₹${r.price}` },
                { key: "expiry", header: "Expiry" },
                { key: "supplier", header: "Supplier" },
                { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI inventory prediction</CardTitle>
            <CardDescription>7-day forecast of stock-outs</CardDescription></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {["Amoxicillin 250mg — stock-out in 4 days","Metformin 500mg — reorder within 6 days","Salbutamol Inhaler — safe until Aug 2"].map((t) => (
              <div key={t} className="rounded-lg border border-border bg-muted/50 p-3">{t}</div>
            ))}
            <Button variant="outline" className="w-full">Run analysis</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}