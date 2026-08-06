import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  CalendarPlus,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";

import { api } from "@/lib/api";

import AppointmentTable from "@/components/appointments/AppointmentTable";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import EditAppointmentDialog from "@/components/appointments/EditAppointmentDialog";
import DeleteAppointmentDialog from "@/components/appointments/DeleteAppointmentDialog";

export const Route = createFileRoute("/_app/appointments")({
  head: () => ({
    meta: [{ title: "Appointments — AIHMS" }],
  }),
  component: AppointmentsPage,
});



function AppointmentsPage() {

  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: appointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: api.getAppointments,
  });

  console.log("Appointments:", appointments);
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  if (error) {
    console.error(error);
  }



  const {
    data: doctors = [],
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: api.getDoctors,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAppointment, setDeleteAppointment] = useState<any>(null);

  if (isLoading) {
    return <div>Loading appointments...</div>;
  }


  return (

    <div>


      <PageHeader
        title="Appointments"
        description="Schedule and manage appointments."
        actions={
          <AppointmentForm doctors={doctors} />
        }
      />



      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">


        <StatCard

          label="Total"

          value={appointments.length}

          icon={CalendarDays}

        />



        <StatCard

          label="Waiting"

          value={0}

          icon={Clock}

        />



        <StatCard

          label="Completed"

          value={0}

          icon={CheckCircle2}

        />



        <StatCard

          label="Cancelled"

          value={0}

          icon={XCircle}

        />


      </div>





      <AppointmentTable
        appointments={appointments}
        onEdit={(appointment) => {
          setEditingAppointment(appointment);
          setEditOpen(true);
        }}
        onDelete={(appointment) => {
          setDeleteAppointment(appointment);
          setDeleteOpen(true);
        }}
      />
      <EditAppointmentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        appointment={editingAppointment}
        doctors={doctors}
      />
      <DeleteAppointmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        appointment={deleteAppointment}
      />

    </div>

  );

}