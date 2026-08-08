import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FilePlus2 } from "lucide-react";

import type { MedicalRecordCreate } from "@/types/medicalRecord";

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

export default function MedicalRecordForm({
  appointments,
}: Props) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [appointmentId, setAppointmentId] =
    useState("");

  const [diagnosis, setDiagnosis] =
    useState("");

  const [prescription, setPrescription] =
    useState("");

  const [notes, setNotes] =
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

    const payload: MedicalRecordCreate = {
      appointment_id: Number(
        appointmentId
      ),

      diagnosis,

      prescription,

      notes,
    };

    try {
      setSaving(true);

      await api.createMedicalRecord(
        payload
      );

      toast.success(
        "Medical record created successfully"
      );

      setOpen(false);

      setAppointmentId("");
      setDiagnosis("");
      setPrescription("");
      setNotes("");

      await queryClient.invalidateQueries({
        queryKey: ["medical-records"],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to create medical record"
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
          <FilePlus2 className="mr-2 h-4 w-4" />

          Add Medical Record
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Medical Record
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
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

          <div>
            <Label>
              Diagnosis
            </Label>

            <Input
              value={diagnosis}
              onChange={(e) =>
                setDiagnosis(
                  e.target.value
                )
              }
              placeholder="Enter diagnosis"
              required
            />
          </div>

          <div>
            <Label>
              Prescription
            </Label>

            <Input
              value={prescription}
              onChange={(e) =>
                setPrescription(
                  e.target.value
                )
              }
              placeholder="Enter prescription"
              required
            />
          </div>

          <div>
            <Label>
              Notes
            </Label>

            <Input
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder="Additional notes"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Creating..."
                : "Create Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}