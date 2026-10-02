import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";


interface RevenueData {
  month: string;
  value: number;
}


export default function RevenueChart({
  data = [],
}: {
  data?: RevenueData[];
}) {

  const hasData = data.length > 0;

  const totalRevenue =
    data.reduce(
      (sum, item) => sum + Number(item.value || 0),
      0
    );


  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-800
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-emerald-500/10
              text-emerald-600
            "
          >

            <TrendingUp className="h-5 w-5" />

          </div>

          <div>

            <h2 className="font-semibold">
              Monthly Revenue
            </h2>

            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Revenue performance over time
            </p>

          </div>

        </div>


        {hasData && (
          <div
            className="
              flex
              items-center
              gap-1
              text-sm
              font-semibold
              text-emerald-600
            "
          >

            <IndianRupee className="h-4 w-4" />

            {totalRevenue.toLocaleString("en-IN")}

          </div>
        )}

      </div>


      {/* CHART */}

      <div className="h-80 p-5">

        {hasData ? (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="100%"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.15}
              />


              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />


              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />


              <Tooltip />


              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#revenueGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        ) : (

          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              rounded-xl
              bg-slate-50
              dark:bg-slate-950
            "
          >

            <div
              className="
                mb-3
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-slate-200
                text-slate-500
                dark:bg-slate-800
              "
            >

              <TrendingUp className="h-5 w-5" />

            </div>

            <p className="text-sm font-medium">
              No revenue data available
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              Revenue information will appear here
            </p>

          </div>

        )}

      </div>

    </motion.div>
  );
}