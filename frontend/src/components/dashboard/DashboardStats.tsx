import {
 Users,
 Stethoscope,
 DollarSign,
 Activity,
 Clock,
 BedDouble,
 Pill,
 Siren
} from "lucide-react";

import { StatCard } from "@/components/app/stat-card";


interface Props {
 analytics:any;
 emergency:number;
}


export default function DashboardStats({
 analytics,
 emergency
}:Props){


return (

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4
">


<StatCard
label="Total Patients"
value={analytics.kpis.totalPatients}
icon={Users}
tone="primary"
/>


<StatCard
label="Doctors"
value={analytics.kpis.doctors}
icon={Stethoscope}
tone="info"
/>


<StatCard
label="Revenue MTD"
value={`₹${analytics.kpis.revenueMTD}`}
icon={DollarSign}
tone="success"
/>


<StatCard
label="Admissions"
value={analytics.kpis.admissions}
icon={Activity}
tone="primary"
/>


<StatCard
label="Waiting Time"
value={`${analytics.kpis.avgWaitMin} min`}
icon={Clock}
tone="info"
/>


<StatCard
label="Beds Available"
value={analytics.kpis.bedsAvailable}
icon={BedDouble}
tone="warning"
/>


<StatCard
label="Medicine Stock"
value={analytics.kpis.medicinesInStock}
icon={Pill}
tone="warning"
/>


<StatCard
label="Emergency"
value={emergency}
icon={Siren}
tone="destructive"
/>


</div>

)

}