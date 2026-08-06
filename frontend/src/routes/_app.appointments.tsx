import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteAppointment, setDeleteAppointment] = useState<any>(null);

function AppointmentsPage() {

  const [open, setOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");

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



  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    const form = new FormData(e.currentTarget);


    try {


      await api.createAppointment({

        doctor_id: Number(doctorId),

        appointment_date:
          String(form.get("date")),

        appointment_time:
          String(form.get("time")),

        reason:
          String(form.get("reason"))

      });



      toast.success(
        "Appointment booked successfully"
      );


      setOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });


    }
    catch (error) {

      toast.error(
        "Failed to book appointment"
      );

    }

  }

  if (isLoading) {
    return <div>Loading appointments...</div>;
  }


  return (

    <div>


      <PageHeader

        title="Appointments"

        description="Schedule and manage appointments."

        actions={

          <PageHeader
            title="Appointments"
            description="Schedule and manage appointments."
            actions={
              <AppointmentForm
                doctors={doctors}
              />
            }
          />


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