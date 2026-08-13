import type { Billing } from "@/types/billing";
import { Download } from "lucide-react";
import { DataTable } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";

interface Props {
  billings: Billing[];

  onEdit?: (
    billing: Billing
  ) => void;

  onDelete?: (
    billing: Billing
  ) => void;

  onDownload?: (
    billing: Billing
  ) => void;
}

export default function BillingTable({
  billings,
  onEdit,
  onDelete,
  onDownload,
}: Props) {
  return (
    <DataTable
      rows={billings}
      searchKeys={[
        "payment_status",
        "payment_method",
        "description",
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
          key: "amount",
          header: "Amount",

          cell: (billing) =>
            `₹${billing.amount.toFixed(2)}`,
        },

        {
          key: "payment_status",
          header: "Payment Status",
        },

        {
          key: "payment_method",
          header: "Payment Method",
        },

        {
          key: "description",
          header: "Description",
        },

        {
          key: "created_at",
          header: "Created",

          cell: (billing) =>
            new Date(
              billing.created_at
            ).toLocaleDateString(),
        },

        {
          key: "actions",
          header: "Actions",

          cell: (billing) => (
            <div className="flex gap-2">

  {onDownload && (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        onDownload(billing)
      }
    >
      <Download className="mr-1 h-4 w-4" />
      PDF
    </Button>
  )}

  {onEdit && (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        onEdit(billing)
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
        onDelete(billing)
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