import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { Doctor } from "@/types/doctor";
import type {
  Appointment,
  AppointmentUpdate,
} from "@/types/appointment";

import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
  doctors: Doctor[];
}

export default function EditAppointmentDialog({
  open,
  onOpenChange,
  appointment,
  doctors,
}: Props) {

  const queryClient = useQueryClient();

  const [doctorId, setDoctorId] = useState("");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [reason, setReason] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {

    if (!appointment) return;

    setDoctorId(
      String(appointment.doctor_id)
    );

    setDate(
      appointment.appointment_date
    );

    setTime(
      appointment.appointment_time
    );

    setReason(
      appointment.reason
    );

    setStatus(
      appointment.status
    );

  }, [appointment]);

  async function save() {

    if (!appointment) return;

    const payload: AppointmentUpdate = {

      doctor_id: Number(doctorId),

      appointment_date: date,

      appointment_time: time,

      reason,

      status,

    };

    try {

      await api.updateAppointment(
        appointment.id,
        payload
      );

      toast.success(
        "Appointment updated successfully"
      );

      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

    } catch (error) {

      if (error instanceof Error) {
        toast.error(error.message);
      }

    }

  }

  if (!appointment) return null;

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Edit Appointment

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <div>

            <Label>Doctor</Label>

            <Select
              value={doctorId}
              onValueChange={setDoctorId}
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                {doctors.map((doctor) => (

                  <SelectItem
                    key={doctor.id}
                    value={String(doctor.id)}
                  >

                    {doctor.name} - {doctor.specialization}

                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <Label>Date</Label>

              <Input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>

            <div>

              <Label>Time</Label>

              <Input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
              />

            </div>

          </div>

          <div>

            <Label>Reason</Label>

            <Input
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />

          </div>

          <div>

            <Label>Status</Label>

            <Select
              value={status}
              onValueChange={setStatus}
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="scheduled">
                  Scheduled
                </SelectItem>

                <SelectItem value="pending">
                  Pending
                </SelectItem>

                <SelectItem value="completed">
                  Completed
                </SelectItem>

                <SelectItem value="cancelled">
                  Cancelled
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>

        <DialogFooter>

          <Button
            onClick={save}
          >
            Save Changes
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}