import {
 AreaChart,
 Area,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer
} from "recharts";


export default function RevenueChart({
data=[]
}:{
data:any[]
}){


return (

<div className="
rounded-xl
border
bg-card
p-5
">


<h2 className="
font-semibold
mb-4
">
Monthly Revenue
</h2>


<div className="h-72">


<ResponsiveContainer
width="100%"
height="100%"
>


<AreaChart data={data}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="month"
/>


<YAxis/>


<Tooltip/>


<Area

type="monotone"

dataKey="value"

stroke="var(--color-primary)"

fill="var(--color-primary)"

fillOpacity={0.2}

/>


</AreaChart>


</ResponsiveContainer>


</div>


</div>

)

}