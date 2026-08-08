import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

import AppointmentTable from "@/components/appointments/AppointmentTable";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import EditAppointmentDialog from "@/components/appointments/EditAppointmentDialog";
import DeleteAppointmentDialog from "@/components/appointments/DeleteAppointmentDialog";

import { api } from "@/lib/api";

import type { Appointment } from "@/types/appointment";

export const Route = createFileRoute("/_app/appointments")({
  head: () => ({
    meta: [
      {
        title: "Appointments — AIHMS",
      },
    ],
  }),

  component: AppointmentsPage,
});

function AppointmentsPage() {
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteAppointment, setDeleteAppointment] =
    useState<Appointment | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: api.getAppointments,
  });

  const {
    data: doctors = [],
    isLoading: doctorsLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: api.getDoctors,
  });

  /*
   * -------------------------
   * Loading
   * -------------------------
   */

  if (isLoading || doctorsLoading) {
    return (
      <div className="flex min-h-[75] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading appointments...
        </p>
      </div>
    );
  }

  /*
   * -------------------------
   * Error
   * -------------------------
   */

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">
          Failed to load appointments
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Something went wrong."}
        </p>
      </div>
    );
  }

  /*
   * -------------------------
   * Statistics
   * -------------------------
   */

  const totalAppointments =
    appointments.length;

  const waitingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "pending" ||
        appointment.status === "scheduled"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "cancelled"
    ).length;

  /*
   * -------------------------
   * Edit
   * -------------------------
   */

  function handleEdit(
    appointment: Appointment
  ) {
    setEditingAppointment(appointment);
    setEditOpen(true);
  }

  /*
   * -------------------------
   * Delete
   * -------------------------
   */

  function handleDelete(
    appointment: Appointment
  ) {
    setDeleteAppointment(appointment);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
          ========================= */}

      <PageHeader
        title="Appointments"
        description="Schedule and manage appointments."
        actions={
          <AppointmentForm
            doctors={doctors}
          />
        }
      />

      {/* =========================
          STATISTICS
          ========================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          label="Total"
          value={totalAppointments}
          icon={CalendarDays}
        />

        <StatCard
          label="Waiting"
          value={waitingAppointments}
          icon={Clock}
          tone="warning"
        />

        <StatCard
          label="Completed"
          value={completedAppointments}
          icon={CheckCircle2}
          tone="success"
        />

        <StatCard
          label="Cancelled"
          value={cancelledAppointments}
          icon={XCircle}
          tone="destructive"
        />

      </div>

      {/* =========================
          APPOINTMENT TABLE
          ========================= */}

      <AppointmentTable
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* =========================
          EDIT DIALOG
          ========================= */}

      <EditAppointmentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        appointment={editingAppointment}
        doctors={doctors}
      />

      {/* =========================
          DELETE DIALOG
          ========================= */}

      <DeleteAppointmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        appointment={deleteAppointment}
      />

    </div>
  );
}