import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


export function StatCard({

  label,

  value,

  delta,

  icon: Icon,

  tone = "primary",

}: {

  label: string;

  value: string | number;

  delta?: string;

  icon: LucideIcon;

  tone?:
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "destructive";

}) {


  const toneMap = {


    primary:
      "from-blue-500/20 to-blue-500/5 text-blue-600",


    success:
      "from-green-500/20 to-green-500/5 text-green-600",


    warning:
      "from-yellow-500/20 to-yellow-500/5 text-yellow-600",


    info:
      "from-cyan-500/20 to-cyan-500/5 text-cyan-600",


    destructive:
      "from-red-500/20 to-red-500/5 text-red-600",


  };



  return (

    <motion.div

      whileHover={{
        y: -6,
      }}

      transition={{
        duration: 0.2
      }}

    >


      <Card

        className="
overflow-hidden
border
bg-card
shadow-sm

hover:shadow-xl

transition
"

      >


        <CardContent

          className="
p-5
"

        >


          <div

            className="
flex
items-center
justify-between
"

          >


            <div>


              <p

                className="
text-sm
font-medium
text-muted-foreground
"

              >

                {label}

              </p>



              <h2

                className="
mt-2
text-3xl
font-bold
tracking-tight
"

              >

                {value}

              </h2>



              {
                delta &&

                <p

                  className="
mt-2
text-xs
text-muted-foreground
"

                >

                  {delta}

                </p>

              }


            </div>



            <div

              className={cn(

                "h-12 w-12",

                "rounded-2xl",

                "grid place-items-center",

                "bg-gradient-to-br",

                toneMap[tone]

              )}

            >


              <Icon

                className="
h-6
w-6
"

              />


            </div>



          </div>


        </CardContent>


      </Card>


    </motion.div>

  )

}