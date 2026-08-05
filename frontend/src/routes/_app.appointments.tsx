import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarPlus,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { DataTable } from "@/components/app/data-table";
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


export const Route = createFileRoute("/_app/appointments")({
  head: () => ({
    meta: [{ title: "Appointments — AIHMS" }],
  }),
  component: AppointmentsPage,
});


function AppointmentsPage() {

  const queryClient = useQueryClient();
  console.log("API:", api);
  console.log("getAppointments:", api.getAppointments);

  const {
  data: appointments = [],
  refetch,
  isLoading,
  error,
} = useQuery({
  queryKey: ["appointments"],
  queryFn: api.getAppointments,
});

console.log("Appointments:", appointments);
console.log("Loading:", isLoading);
console.log("Error:", error);
if (error) {
  console.error(error);
}



  const {
    data: doctors = [],
  } = useQuery({
    queryKey:["doctors"],
    queryFn:api.getDoctors,
  });



  const [open,setOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");



  async function submit(
    e:React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();


    const form = new FormData(e.currentTarget);


    try{


      await api.createAppointment({

        doctor_id: Number(doctorId),

        appointment_date:
          String(form.get("date")),

        appointment_time:
          String(form.get("time")),

        reason:
          String(form.get("reason"))

      });



      toast.success(
        "Appointment booked successfully"
      );


      setOpen(false);

      await queryClient.invalidateQueries({
      queryKey: ["appointments"],
      });


    }
    catch(error){

      toast.error(
        "Failed to book appointment"
      );

    }

  }

  if (isLoading) {
  return <div>Loading appointments...</div>;
}


  return (

<div>


<PageHeader

title="Appointments"

description="Schedule and manage appointments."

actions={

<Dialog
open={open}
onOpenChange={setOpen}
>


<DialogTrigger asChild>

<Button>

<CalendarPlus className="h-4 w-4"/>

Book appointment

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

<Label>
Doctor
</Label>


<Select
    value={doctorId}
    onValueChange={(value) => setDoctorId(value)}
>

<SelectTrigger>

<SelectValue placeholder="Select doctor"/>

</SelectTrigger>


<SelectContent>


{
doctors.map((doctor:any)=>(

<SelectItem

key={doctor.id}

value={String(doctor.id)}

>

{doctor.name}
-
{doctor.specialization}

</SelectItem>

))

}


</SelectContent>


</Select>


</div>




<div className="grid grid-cols-2 gap-3">


<div>

<Label>
Date
</Label>

<Input

name="date"

type="date"

required

/>

</div>



<div>

<Label>
Time
</Label>

<Input

name="time"

type="time"

required

/>

</div>


</div>




<div>

<Label>
Reason
</Label>


<Input

name="reason"

placeholder="Consultation"

/>


</div>




<DialogFooter>


<Button type="submit">

Confirm booking

</Button>


</DialogFooter>



</form>


</DialogContent>


</Dialog>


}

/>



<div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">


<StatCard

label="Total"

value={appointments.length}

icon={CalendarDays}

/>



<StatCard

label="Waiting"

value={0}

icon={Clock}

/>



<StatCard

label="Completed"

value={0}

icon={CheckCircle2}

/>



<StatCard

label="Cancelled"

value={0}

icon={XCircle}

/>


</div>





<DataTable


rows={appointments}


searchKeys={
[
"reason"
] as any
}


columns={[


{
key:"id",
header:"ID"
},



{
key:"doctor_id",
header:"Doctor"
},



{
key:"appointment_date",
header:"Date"
},



{
key:"appointment_time",
header:"Time"
},



{
key:"reason",
header:"Reason"
}



]}


/>



</div>

  );

}