import { createFileRoute, Link }
  from "@tanstack/react-router";

import { useQuery }
  from "@tanstack/react-query";


import { Button }
  from "@/components/ui/button";


import { PageHeader }
  from "@/components/app/page-header";


import { api }
  from "@/lib/api";


import DashboardStats
  from "@/components/dashboard/DashboardStats";


import RevenueChart
  from "@/components/dashboard/RevenueChart";


import DiseaseChart
  from "@/components/dashboard/DiseaseChart";

import { motion } from "framer-motion";

export const Route = createFileRoute(
  "/_app/dashboard"
)({

  component: DashboardPage

});



function DashboardPage(){

const {
data:analytics,
isLoading
}=useQuery({

queryKey:["analytics"],

queryFn:api.getAnalytics

});


const {
data:emergency=[]
}=useQuery({

queryKey:["emergency"],

queryFn:api.getEmergencyCases

});



if(isLoading || !analytics)

return (

<div className="p-6">
Loading dashboard...
</div>

)



return (

<motion.div

className="space-y-6"

initial={{
 opacity:0,
 y:20
}}

animate={{
 opacity:1,
 y:0
}}

transition={{
 duration:0.5
}}

>


<PageHeader

title="Executive Dashboard"

description="Hospital management overview"

/>



<DashboardStats

analytics={analytics}

emergency={emergency.length}

/>



<div className="
grid
lg:grid-cols-3
gap-6
">


<div className="lg:col-span-2">

<RevenueChart

data={analytics.monthlyRevenue}

/>

</div>



<DiseaseChart

data={analytics.diseaseDistribution}

/>


</div>


</motion.div>

)

}