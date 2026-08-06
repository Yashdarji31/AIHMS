import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CalendarPlus } from "lucide-react";

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

import { api } from "@/lib/api";

interface Props {
  doctors: any[];
}

export default function AppointmentForm({
  doctors,
}: Props) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      await api.createAppointment({
        doctor_id: Number(doctorId),
        appointment_date: String(form.get("date")),
        appointment_time: String(form.get("time")),
        reason: String(form.get("reason")),
      });

      toast.success("Appointment booked successfully");

      setOpen(false);

      e.currentTarget.reset();
      setDoctorId("");

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    } catch (err: any) {
      toast.error(err.message);
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
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>

              <SelectContent>
                {doctors.map((doctor: any) => (
                  <SelectItem
                    key={doctor.id}
                    value={String(doctor.id)}
                  >
                    {doctor.full_name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date</Label>

              <Input
                name="date"
                type="date"
                required
              />
            </div>

            <div>
              <Label>Time</Label>

              <Input
                name="time"
                type="time"
                required
              />
            </div>
          </div>

          <div>
            <Label>Reason</Label>

            <Input
              name="reason"
              placeholder="Consultation"
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}