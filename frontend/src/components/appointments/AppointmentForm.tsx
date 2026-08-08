import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CalendarPlus } from "lucide-react";

import { Doctor } from "@/types/doctor";
import { AppointmentCreate } from "@/types/appointment";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  doctors: Doctor[];
}

export default function AppointmentForm({
  doctors,
}: Props) {

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [doctorId, setDoctorId] = useState("");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [reason, setReason] = useState("");

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!doctorId) {
      toast.error("Please select a doctor");
      return;
    }

    const payload: AppointmentCreate = {
      doctor_id: Number(doctorId),
      appointment_date: date,
      appointment_time: time,
      reason,
    };

    try {

      await api.createAppointment(payload);

      toast.success(
        "Appointment booked successfully"
      );

      setOpen(false);

      setDoctorId("");
      setDate("");
      setTime("");
      setReason("");

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

    } catch (error) {

      if (error instanceof Error) {
        toast.error(error.message);
      }

    }
  }

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>

          <CalendarPlus className="mr-2 h-4 w-4" />

          Book Appointment

        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Book Appointment

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <div>

            <Label>Doctor</Label>

            <Select
              value={doctorId}
              onValueChange={setDoctorId}
            >

              <SelectTrigger>

                <SelectValue placeholder="Select Doctor" />

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
                required
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
                required
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
              placeholder="Reason for appointment"
              required
            />

          </div>

          <DialogFooter>

            <Button type="submit">

              Book Appointment

            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}