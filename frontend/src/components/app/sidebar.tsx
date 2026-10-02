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
  HeartPulse,
} from "lucide-react";

import {
  Link,
  useRouterState,
} from "@tanstack/react-router";

import { motion } from "framer-motion";


// ======================================================
// TYPES
// ======================================================

type MenuItemType = {
  name: string;
  icon: typeof LayoutDashboard;
  path: string;
};


// ======================================================
// MAIN MENU
// ======================================================

const mainMenu: MenuItemType[] = [

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

];


// ======================================================
// MANAGEMENT MENU
// ======================================================

const managementMenu: MenuItemType[] = [

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


// ======================================================
// SIDEBAR
// ======================================================

export function Sidebar() {

  const router = useRouterState();

  const currentPath =
    router.location.pathname;


  // ====================================================
  // MENU ITEM
  // ====================================================

  function MenuItem({
    item,
  }: {
    item: MenuItemType;
  }) {

    const Icon = item.icon;


    const active =
      item.path === "/"
        ? currentPath === "/"
        : currentPath === item.path ||
          currentPath.startsWith(
            `${item.path}/`
          );


    return (

      <Link
        to={item.path}
        className="block"
      >

        <motion.div

          whileHover={{
            x: active ? 0 : 3,
          }}

          transition={{
            duration: 0.15,
          }}

          className={`
            group
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-medium
            transition-all
            duration-200

            ${
              active

                ? `
                  bg-primary
                  text-primary-foreground
                  shadow-md
                  shadow-primary/20
                `

                : `
                  text-slate-500
                  hover:bg-slate-100
                  hover:text-slate-900

                  dark:text-slate-400
                  dark:hover:bg-slate-800
                  dark:hover:text-slate-100
                `
            }
          `}
        >

          <Icon
            className="
              h-5
              w-5
              shrink-0
            "
          />

          <span>
            {item.name}
          </span>

        </motion.div>

      </Link>

    );
  }


  // ====================================================
  // SIDEBAR UI
  // ====================================================

  return (

    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-white
        px-5
        py-6

        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* ================================================
          BRAND
      ================================================= */}

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
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-primary
            text-primary-foreground
            shadow-md
            shadow-primary/20
          "
        >

          <HeartPulse
            className="
              h-6
              w-6
            "
          />

        </div>


        <div>

          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-slate-100
            "
          >
            AIHMS
          </h1>


          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Hospital Management
          </p>

        </div>

      </div>


      {/* ================================================
          NAVIGATION
      ================================================= */}

      <nav
        className="
          flex-1
          space-y-7
          overflow-y-auto
        "
      >

        {/* MAIN */}

        <div>

          <p
            className="
              mb-3
              px-3
              text-[11px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Main
          </p>


          <div className="space-y-1">

            {mainMenu.map((item) => (

              <MenuItem
                key={item.path}
                item={item}
              />

            ))}

          </div>

        </div>


        {/* MANAGEMENT */}

        <div>

          <p
            className="
              mb-3
              px-3
              text-[11px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Management
          </p>


          <div className="space-y-1">

            {managementMenu.map((item) => (

              <MenuItem
                key={item.path}
                item={item}
              />

            ))}

          </div>

        </div>

      </nav>


      {/* ================================================
          USER SECTION
      ================================================= */}

      <div
        className="
          mt-4
          space-y-2
          border-t
          border-slate-200
          pt-4

          dark:border-slate-800
        "
      >

        {/* USER */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3

            dark:border-slate-700
            dark:bg-slate-800
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-primary
                text-xs
                font-bold
                text-primary-foreground
              "
            >
              DA
            </div>


            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                  dark:text-slate-100
                "
              >
                Dr. Admin
              </p>


              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Administrator
              </p>

            </div>

          </div>

        </div>


        {/* SETTINGS */}

        <Link
          to="/settings"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-medium
            text-slate-500
            transition

            hover:bg-slate-100
            hover:text-slate-900

            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-slate-100
          "
        >

          <Settings className="h-5 w-5" />

          Settings

        </Link>


        {/* LOGOUT */}

        <Link
          to="/auth/login"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-medium
            text-red-500
            transition

            hover:bg-red-50

            dark:hover:bg-red-950/30
          "
        >

          <LogOut className="h-5 w-5" />

          Logout

        </Link>

      </div>

    </aside>

  );
}