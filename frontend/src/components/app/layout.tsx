import {
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

import { motion } from "framer-motion";

import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";

export default function Layout() {
  const router = useRouterState();

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

      <aside className="hidden shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* MAIN AREA */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* TOPBAR */}

        <Topbar />

        {/* CONTENT */}

        <main className="flex-1 overflow-y-auto">
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
              key={router.location.pathname}
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
                ease: "easeOut",
              }}
              className="min-h-[calc(100vh-120px)]"
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}