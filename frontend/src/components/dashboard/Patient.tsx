import {
 PieChart,
 Pie,
 Cell,
 Tooltip,
 ResponsiveContainer,
} from "recharts";


const data = [

 {
  name:"General",
  value:400
 },

 {
  name:"Cardiology",
  value:250
 },

 {
  name:"Dental",
  value:150
 },

];


export default function PatientChart(){

return (

<div
className="
rounded-xl
border
bg-card
p-5
"
>

<h2
className="
mb-4
text-lg
font-semibold
"
>
Patient Departments
</h2>


<ResponsiveContainer
width="100%"
height={250}
>

<PieChart>

<Pie

data={data}

dataKey="value"

nameKey="name"

outerRadius={90}

>

{
data.map((_,index)=>(

<Cell key={index}/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>

)

}