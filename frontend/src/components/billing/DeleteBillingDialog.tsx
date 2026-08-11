import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { Billing } from "@/types/billing";

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
  billing: Billing | null;
}

export default function DeleteBillingDialog({
  open,
  onOpenChange,
  billing,
}: Props) {
  const queryClient = useQueryClient();

  const [deleting, setDeleting] =
    useState(false);

  async function handleDelete() {
    if (!billing) return;

    try {
      setDeleting(true);

      await api.deleteBilling(billing.id);

      toast.success(
        "Billing record deleted successfully"
      );

      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["billings"],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to delete billing record"
        );
      }
    } finally {
      setDeleting(false);
    }
  }

  if (!billing) {
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
            Delete Billing Record
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this
            billing record?
          </p>

          <div className="rounded-lg border p-4 text-sm">
            <p>
              <strong>Billing ID:</strong>{" "}
              {billing.id}
            </p>

            <p>
              <strong>Appointment:</strong>{" "}
              {billing.appointment_id}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              ₹{billing.amount.toFixed(2)}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {billing.payment_status}
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
              : "Delete Billing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}