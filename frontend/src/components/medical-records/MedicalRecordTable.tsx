import type { MedicalRecord } from "@/types/medicalRecord";

import { DataTable } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";

interface Props {
  records: MedicalRecord[];

  onEdit?: (
    record: MedicalRecord
  ) => void;

  onDelete?: (
    record: MedicalRecord
  ) => void;
}

export default function MedicalRecordTable({
  records,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DataTable
      rows={records}
      searchKeys={[
        "diagnosis",
        "prescription",
        "notes",
      ]}
      columns={[
        {
          key: "id",
          header: "ID",
        },

        {
          key: "appointment_id",
          header: "Appointment",
        },

        {
          key: "doctor_id",
          header: "Doctor ID",
        },

        {
          key: "patient_id",
          header: "Patient ID",
        },

        {
          key: "diagnosis",
          header: "Diagnosis",
        },

        {
          key: "prescription",
          header: "Prescription",
        },

        {
          key: "notes",
          header: "Notes",
        },

        {
          key: "created_at",
          header: "Created",

          cell: (record) =>
            new Date(
              record.created_at
            ).toLocaleDateString(),
        },

        {
          key: "actions",
          header: "Actions",

          cell: (record) => (
            <div className="flex gap-2">

              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onEdit(record)
                  }
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    onDelete(record)
                  }
                >
                  Delete
                </Button>
              )}

            </div>
          ),
        },
      ]}
    />
  );
}