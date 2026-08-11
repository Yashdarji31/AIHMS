import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Receipt } from "lucide-react";

import { api } from "@/lib/api";

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

interface Props {
  appointments: {
    id: number;
  }[];
}

export default function BillingForm({
  appointments,
}: Props) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [appointmentId, setAppointmentId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("pending");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!appointmentId) {
      toast.error(
        "Please enter an appointment ID"
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error(
        "Please enter a valid amount"
      );
      return;
    }

    if (!paymentMethod) {
      toast.error(
        "Please enter a payment method"
      );
      return;
    }

    try {
      setSaving(true);

      await api.createBilling({
        appointment_id: Number(appointmentId),
        amount: Number(amount),
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        description,
      });

      toast.success(
        "Billing record created successfully"
      );

      setOpen(false);

      setAppointmentId("");
      setAmount("");
      setPaymentStatus("pending");
      setPaymentMethod("");
      setDescription("");

      await queryClient.invalidateQueries({
        queryKey: ["billings"],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to create billing record"
        );
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Receipt className="mr-2 h-4 w-4" />
          Add Billing
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Billing Record
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
          {/* Appointment */}

          <div>
            <Label>
              Appointment ID
            </Label>

            <Input
              type="number"
              min="1"
              value={appointmentId}
              onChange={(e) =>
                setAppointmentId(
                  e.target.value
                )
              }
              placeholder="Enter appointment ID"
              required
            />
          </div>

          {/* Amount */}

          <div>
            <Label>
              Amount
            </Label>

            <Input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Payment Status */}

          <div>
            <Label>
              Payment Status
            </Label>

            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="pending">
                Pending
              </option>

              <option value="paid">
                Paid
              </option>

              <option value="failed">
                Failed
              </option>

              <option value="refunded">
                Refunded
              </option>
            </select>
          </div>

          {/* Payment Method */}

          <div>
            <Label>
              Payment Method
            </Label>

            <Input
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              placeholder="e.g. Cash, UPI, Card"
              required
            />
          </div>

          {/* Description */}

          <div>
            <Label>
              Description
            </Label>

            <Input
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Billing description"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Creating..."
                : "Create Billing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}