import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import {
  Activity,
} from "lucide-react";


const colors = [
  "#2563eb",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];


export default function DiseaseChart({
  data = [],
}: {
  data?: any[];
}) {

  const hasData = data.length > 0;


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
          gap-3
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-500/10
            text-blue-600
          "
        >

          <Activity className="h-5 w-5" />

        </div>


        <div>

          <h2 className="font-semibold">
            Disease Distribution
          </h2>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Patient diagnosis overview
          </p>

        </div>

      </div>


      {/* CHART */}

      <div className="h-80 p-5">

        {hasData ? (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={3}
              >

                {data.map((_, index) => (

                  <Cell
                    key={index}
                    fill={
                      colors[
                        index % colors.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

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

              <Activity className="h-5 w-5" />

            </div>

            <p className="text-sm font-medium">
              No disease data available
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              Diagnosis statistics will appear here
            </p>

          </div>

        )}

      </div>

    </motion.div>
  );
}