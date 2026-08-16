import { Outlet } from "@tanstack/react-router";
import { motion } from "framer-motion";

import Sidebar from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";


export default function Layout() {


  return (


    <div

      className="
      flex
      min-h-screen
      bg-muted/20
      "

    >



      {/* SIDEBAR */}

      <Sidebar />





      {/* MAIN CONTENT */}


      <div

        className="
        flex
        flex-1
        flex-col
        overflow-hidden
        "

      >




        {/* TOP NAVBAR */}


        <Topbar />






        {/* PAGE CONTENT */}


        <main

          className="
          flex-1
          overflow-y-auto
          p-4
          md:p-6
          lg:p-8
          "

        >



          <motion.div


            key={
              location.pathname
            }



            initial={{

              opacity:0,

              y:10

            }}



            animate={{

              opacity:1,

              y:0

            }}



            transition={{

              duration:0.25

            }}


            className="
            h-full
            "

          >


            <Outlet />


          </motion.div>



        </main>




      </div>



    </div>


  );

}