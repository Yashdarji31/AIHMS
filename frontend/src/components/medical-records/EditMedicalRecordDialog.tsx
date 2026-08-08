import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
  MedicalRecord,
  MedicalRecordUpdate,
} from "@/types/medicalRecord";

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
  record: MedicalRecord | null;
}

export default function EditMedicalRecordDialog({
  open,
  onOpenChange,
  record,
}: Props) {
  const queryClient = useQueryClient();

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!record) return;

    setDiagnosis(record.diagnosis);
    setPrescription(record.prescription);
    setNotes(record.notes);
  }, [record]);

  async function save() {
    if (!record) return;

    const payload: MedicalRecordUpdate = {
      diagnosis,
      prescription,
      notes,
    };

    try {
      setSaving(true);

      await api.updateMedicalRecord(
        record.id,
        payload
      );

      toast.success(
        "Medical record updated successfully"
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
          "Failed to update medical record"
        );
      }
    } finally {
      setSaving(false);
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
            Edit Medical Record
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>
              Diagnosis
            </Label>

            <Input
              value={diagnosis}
              onChange={(e) =>
                setDiagnosis(e.target.value)
              }
              placeholder="Diagnosis"
            />
          </div>

          <div>
            <Label>
              Prescription
            </Label>

            <Input
              value={prescription}
              onChange={(e) =>
                setPrescription(e.target.value)
              }
              placeholder="Prescription"
            />
          </div>

          <div>
            <Label>
              Notes
            </Label>

            <Input
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Notes"
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