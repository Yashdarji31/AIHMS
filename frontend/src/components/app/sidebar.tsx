import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";


const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    name: "Patients",
    icon: Users,
    path: "/patients",
  },

  {
    name: "Doctors",
    icon: Stethoscope,
    path: "/doctors",
  },

  {
    name: "Appointments",
    icon: Calendar,
    path: "/appointments",
  },

  {
    name: "Medical Records",
    icon: FileText,
    path: "/medical-records",
  },

  {
    name: "Billing",
    icon: CreditCard,
    path: "/billing",
  },

  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
];


export default function Sidebar() {

  const router = useRouterState();

  const currentPath = router.location.pathname;


  return (

    <aside
      className="
      flex
      h-screen
      w-64
      flex-col
      border-r
      bg-white
      px-4
      py-6
      "
    >

      {/* Logo */}

      <div
        className="
        mb-8
        flex
        items-center
        gap-3
        px-2
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
          bg-primary
          text-white
          font-bold
          "
        >
          +
        </div>


        <div>

          <h1
            className="
            text-lg
            font-bold
            "
          >
            AIHMS
          </h1>

          <p
            className="
            text-xs
            text-muted-foreground
            "
          >
            Hospital System
          </p>

        </div>

      </div>



      {/* Menu */}

      <nav
        className="
        flex-1
        space-y-1
        "
      >

        {
          menu.map((item)=>{

            const Icon = item.icon;

            const active =
              currentPath === item.path;


            return (

              <Link
                key={item.path}
                to={item.path}

                className={`
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-sm
                font-medium
                transition

                ${
                  active
                  ?
                  "bg-primary text-white"
                  :
                  "text-muted-foreground hover:bg-muted hover:text-foreground"
                }

                `}
              >

                <Icon
                  className="
                  h-5
                  w-5
                  "
                />

                {item.name}


              </Link>

            )

          })
        }

      </nav>



      {/* Bottom */}

      <div
        className="
        space-y-1
        border-t
        pt-4
        "
      >

        <button
          className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-sm
          text-muted-foreground
          hover:bg-muted
          "
        >

          <Settings
            className="
            h-5
            w-5
            "
          />

          Settings

        </button>



        <button
          className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-sm
          text-red-500
          hover:bg-red-50
          "
        >

          <LogOut
            className="
            h-5
            w-5
            "
          />

          Logout

        </button>


      </div>


    </aside>

  );
}