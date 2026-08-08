import { Appointment } from "@/types/appointment";

import { DataTable } from "@/components/app/data-table";
import StatusBadge from "./StatusBadge";

import { Button } from "@/components/ui/button";

interface AppointmentTableProps {
  appointments: Appointment[];

  onEdit: (appointment: Appointment) => void;

  onDelete: (appointment: Appointment) => void;
}

export default function AppointmentTable({
  appointments,
  onEdit,
  onDelete,
}: AppointmentTableProps) {
  return (
    <DataTable
      rows={appointments}
      searchKeys={[
        "patient",
        "doctor",
        "specialization",
        "reason",
        "status",
      ]}
      columns={[
        {
          key: "patient",
          header: "Patient",
        },

        {
          key: "doctor",
          header: "Doctor",
        },

        {
          key: "specialization",
          header: "Specialization",
        },

        {
          key: "appointment_date",
          header: "Date",
        },

        {
          key: "appointment_time",
          header: "Time",
        },

        {
          key: "reason",
          header: "Reason",
        },

        {
          key: "status",
          header: "Status",

          cell: (appointment) => (
            <StatusBadge
              status={appointment.status}
            />
          ),
        },

        {
          key: "actions",
          header: "Actions",

          cell: (appointment) => (
            <div className="flex gap-2">

              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(appointment)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(appointment)}
              >
                Delete
              </Button>

            </div>
          ),
        },
      ]}
    />
  );
}