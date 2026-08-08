import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { MedicalRecord } from "@/types/medicalRecord";

import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: MedicalRecord | null;
}

export default function DeleteMedicalRecordDialog({
  open,
  onOpenChange,
  record,
}: Props) {
  const queryClient = useQueryClient();

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!record) return;

    try {
      setDeleting(true);

      await api.deleteMedicalRecord(record.id);

      toast.success(
        "Medical record deleted successfully"
      );

      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["medical-records"],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to delete medical record"
        );
      }
    } finally {
      setDeleting(false);
    }
  }

  if (!record) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Medical Record
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this
            medical record?
          </p>

          <div className="rounded-lg border p-4 text-sm">
            <p>
              <strong>Record ID:</strong>{" "}
              {record.id}
            </p>

            <p>
              <strong>Appointment:</strong>{" "}
              {record.appointment_id}
            </p>

            <p>
              <strong>Diagnosis:</strong>{" "}
              {record.diagnosis}
            </p>
          </div>

          <p className="text-sm text-destructive">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={deleting}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting
              ? "Deleting..."
              : "Delete Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}