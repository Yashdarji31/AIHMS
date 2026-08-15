import {
  Users,
  Stethoscope,
  IndianRupee,
  CalendarCheck,
} from "lucide-react";

import { StatCard } from "@/components/app/stat-card";


export default function StatsGrid() {

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >

      <StatCard
        label="Patients"
        value="1,240"
        delta="+12% this month"
        icon={Users}
        tone="info"
      />


      <StatCard
        label="Doctors"
        value="52"
        delta="+3 new doctors"
        icon={Stethoscope}
        tone="success"
      />


      <StatCard
        label="Revenue"
        value="₹50,000"
        delta="+8% this month"
        icon={IndianRupee}
        tone="warning"
      />


      <StatCard
        label="Appointments"
        value="340"
        delta="+20 today"
        icon={CalendarCheck}
        tone="primary"
      />


    </div>
  );
}