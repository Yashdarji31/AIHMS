import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { Appointment } from "@/types/appointment";

import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function DeleteAppointmentDialog({
  open,
  onOpenChange,
  appointment,
}: Props) {
  const queryClient = useQueryClient();

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!appointment) return;

    try {
      setDeleting(true);

      await api.deleteAppointment(appointment.id);

      toast.success(
        "Appointment deleted successfully"
      );

      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDeleting(false);
    }
  }

  if (!appointment) {
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
            Delete Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this appointment?
          </p>

          <div className="rounded-lg border p-3 text-sm">
            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctor}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointment.appointment_date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointment.appointment_time}
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}