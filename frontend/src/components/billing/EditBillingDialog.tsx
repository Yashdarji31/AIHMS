import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
  Billing,
  BillingUpdate,
} from "@/types/billing";

import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billing: Billing | null;
}

export default function EditBillingDialog({
  open,
  onOpenChange,
  billing,
}: Props) {
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] =
    useState("pending");
  const [paymentMethod, setPaymentMethod] =
    useState("");
  const [description, setDescription] =
    useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!billing) return;

    setAmount(String(billing.amount));
    setPaymentStatus(
      billing.payment_status
    );
    setPaymentMethod(
      billing.payment_method
    );
    setDescription(
      billing.description || ""
    );
  }, [billing]);

  async function save() {
    if (!billing) return;

    if (!amount || Number(amount) <= 0) {
      toast.error(
        "Please enter a valid amount"
      );
      return;
    }

    if (!paymentMethod.trim()) {
      toast.error(
        "Please enter a payment method"
      );
      return;
    }

    const payload: BillingUpdate = {
      amount: Number(amount),
      payment_status: paymentStatus,
      payment_method: paymentMethod,
      description,
    };

    try {
      setSaving(true);

      await api.updateBilling(
        billing.id,
        payload
      );

      toast.success(
        "Billing record updated successfully"
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
          "Failed to update billing record"
        );
      }
    } finally {
      setSaving(false);
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
            Edit Billing Record
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

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
              placeholder="Amount"
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
              placeholder="Payment method"
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
              placeholder="Description"
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={saving}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={saving}
            onClick={save}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}