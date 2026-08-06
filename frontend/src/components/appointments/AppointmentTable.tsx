import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/app/data-table";
import StatusBadge from "./StatusBadge";

interface AppointmentTableProps {
  appointments: any[];
  onEdit: (appointment: any) => void;
  onDelete: (appointment: any) => void;
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
      ] as any}
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
          key: "status",
          header: "Status",
          cell: (appointment: any) => (
            <StatusBadge status={appointment.status} />
          ),
        },
        {
          key: "reason",
          header: "Reason",
        },
        {
          key: "actions",
          header: "Actions",
          cell: (appointment: any) => (
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