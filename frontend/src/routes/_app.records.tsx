import { createFileRoute } from "@tanstack/react-router";
import { FileText, Image as ImageIcon, Pill, FlaskConical, ClipboardList, Download } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/records")({
  head: () => ({ meta: [{ title: "Medical Records — AIHMS" }] }),
  component: RecordsPage,
});

const timeline = [
  { date: "2026-07-19", title: "MRI Brain — Report uploaded", icon: ImageIcon, tag: "Radiology" },
  { date: "2026-07-14", title: "Prescription — Metformin 500mg", icon: Pill, tag: "Prescription" },
  { date: "2026-07-12", title: "Lab report — CBC", icon: FlaskConical, tag: "Laboratory" },
  { date: "2026-07-04", title: "Consultation notes — Cardiology", icon: ClipboardList, tag: "Notes" },
  { date: "2026-06-28", title: "X-Ray Chest", icon: ImageIcon, tag: "Radiology" },
];

function RecordsPage() {
  return (
    <div>
      <PageHeader title="Medical Records" description="Longitudinal patient records, timeline and clinical documents." />
      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="lab">Lab reports</TabsTrigger>
          <TabsTrigger value="notes">Doctor notes</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Patient timeline</CardTitle></CardHeader>
            <CardContent>
              <ol className="relative ml-3 border-l border-border">
                {timeline.map((t, i) => (
                  <li key={i} className="mb-6 ml-6">
                    <span className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <t.icon className="h-3 w-3" />
                    </span>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{t.title}</div>
                        <div className="text-xs text-muted-foreground">{t.date} · <Badge variant="secondary" className="ml-1">{t.tag}</Badge></div>
                      </div>
                      <Button size="sm" variant="outline"><Download className="h-3 w-3" /> Download</Button>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        {["reports","prescriptions","lab","notes","images"].map((v) => (
          <TabsContent key={v} value={v} className="mt-4">
            <Card>
              <CardContent className="p-10 text-center text-sm text-muted-foreground">
                <FileText className="mx-auto mb-3 h-8 w-8" />
                Section connects to <code>GET /records/{v}</code>. Placeholder view — plug in your FastAPI endpoint.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}