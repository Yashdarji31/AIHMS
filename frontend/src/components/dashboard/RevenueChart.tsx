import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    month: "Jan",
    revenue: 30000,
  },
  {
    month: "Feb",
    revenue: 45000,
  },
  {
    month: "Mar",
    revenue: 52000,
  },
  {
    month: "Apr",
    revenue: 70000,
  },
];


export default function RevenueChart() {

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
        Revenue Analytics
      </h2>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month"/>

          <YAxis />

          <Tooltip />


          <Line

            type="monotone"

            dataKey="revenue"

            stroke="#0284c7"

            strokeWidth={3}

          />


        </LineChart>

      </ResponsiveContainer>


    </div>

  );
}