import {
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

import { AppSidebar } from "@/components/app/sidebar-nav";

import { Topbar } from "@/components/app/topbar";

import { motion } from "framer-motion";


export const Route = createFileRoute("/_app")({
  component: AppLayout,
});


function AppLayout() {

  return (

    <div
      className="
        flex
        min-h-screen
        bg-slate-50
        text-slate-900
        dark:bg-slate-950
        dark:text-slate-100
      "
    >

      {/* SIDEBAR */}

      <AppSidebar />


      {/* MAIN */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >

        {/* TOPBAR */}

        <div
          className="
            sticky
            top-0
            z-40
            border-b
            border-slate-200
            bg-white
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <Topbar />

        </div>


        {/* CONTENT */}

        <main
          className="
            flex-1
            overflow-y-auto
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              px-4
              py-6
              sm:px-6
              lg:px-8
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >

              <Outlet />

            </motion.div>

          </div>

        </main>

      </div>

    </div>
  );
}