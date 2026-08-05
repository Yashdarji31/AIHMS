import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, Stethoscope, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/departments")({
  head: () => ({ meta: [{ title: "Departments — AIHMS" }] }),
  component: DepartmentsPage,
});

const depts = [
  { name: "Cardiology", head: "Dr. Sharma", doctors: 14, patients: 320 },
  { name: "Neurology", head: "Dr. Patel", doctors: 9, patients: 210 },
  { name: "Orthopedics", head: "Dr. Iyer", doctors: 11, patients: 265 },
  { name: "Pediatrics", head: "Dr. Nair", doctors: 12, patients: 410 },
  { name: "Oncology", head: "Dr. Rao", doctors: 8, patients: 155 },
  { name: "Radiology", head: "Dr. Verma", doctors: 6, patients: 190 },
  { name: "General Medicine", head: "Dr. Kumar", doctors: 22, patients: 720 },
  { name: "Dermatology", head: "Dr. Das", doctors: 5, patients: 130 },
];

function DepartmentsPage() {
  return (
    <div>
      <PageHeader title="Departments" description="Clinical departments and their key metrics." actions={<Button>Add department</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {depts.map((d) => (
          <Card key={d.name} className="transition hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{d.name}</div>
                  <div className="truncate text-xs text-muted-foreground">Head: {d.head}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-md bg-muted/50 p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Stethoscope className="h-3 w-3" /> Doctors</div>
                  <div className="mt-0.5 text-lg font-semibold">{d.doctors}</div>
                </div>
                <div className="rounded-md bg-muted/50 p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" /> Patients</div>
                  <div className="mt-0.5 text-lg font-semibold">{d.patients}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full justify-between">View department <ArrowRight className="h-3 w-3" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}