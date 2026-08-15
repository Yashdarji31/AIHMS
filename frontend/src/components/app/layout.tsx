import { Outlet } from "@tanstack/react-router";

import Sidebar from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";


export default function Layout() {

  return (

    <div
      className="
      flex
      min-h-screen
      bg-background
      "
    >


      {/* Sidebar */}

      <Sidebar />



      {/* Main Area */}

      <div
        className="
        flex
        flex-1
        flex-col
        "
      >


        {/* Header */}

        <Topbar />



        {/* Page Content */}

        <main
          className="
          flex-1
          overflow-y-auto
          p-6
          "
        >

          <Outlet />

        </main>


      </div>


    </div>

  );
}