import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: any;
}

export default function DeleteAppointmentDialog({
  open,
  onOpenChange,
  appointment,
}: Props) {
  const queryClient = useQueryClient();

  async function handleDelete() {
    if (!appointment) return;

    try {
      await api.deleteAppointment(appointment.id);

      toast.success("Appointment deleted successfully");

      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this appointment?
          This action cannot be undone.
        </p>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}