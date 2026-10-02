import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  HeartPulse,
  ChevronRight,
} from "lucide-react";

import {
  Link,
  useRouterState,
} from "@tanstack/react-router";

import { motion } from "framer-motion";


// ======================================================
// NAVIGATION DATA
// ======================================================

const mainNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
];

const managementNavigation = [
  {
    title: "Medical Records",
    href: "/medical-records",
    icon: FileText,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];


// ======================================================
// NAVIGATION ITEM
// ======================================================

function NavigationItem({
  title,
  href,
  icon: Icon,
  currentPath,
}: {
  title: string;
  href: string;
  icon: React.ElementType;
  currentPath: string;
}) {

  const isActive =
    currentPath === href ||
    (href !== "/dashboard" &&
      currentPath.startsWith(href));

  return (
    <Link
      to={href}
      className="block"
    >

      <motion.div
        whileHover={{
          x: 3,
        }}
        transition={{
          duration: 0.15,
        }}
        className={`
          group
          relative
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-sm
          font-medium
          transition-all
          duration-200

          ${
            isActive
              ? `
                bg-blue-600
                text-white
                shadow-lg
                shadow-blue-600/20
              `
              : `
                text-slate-300
                hover:bg-white/10
                hover:text-white
              `
          }
        `}
      >

        {/* ACTIVE INDICATOR */}

        {isActive && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-7
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-white
            "
          />
        )}


        {/* ICON */}

        <Icon
          className={`
            h-5
            w-5
            shrink-0
            ${
              isActive
                ? "text-white"
                : "text-slate-400 group-hover:text-white"
            }
          `}
        />


        {/* TITLE */}

        <span className="flex-1">
          {title}
        </span>


        {/* ACTIVE ARROW */}

        {isActive && (
          <ChevronRight
            className="
              h-4
              w-4
              text-white/80
            "
          />
        )}

      </motion.div>

    </Link>
  );
}


// ======================================================
// SECTION TITLE
// ======================================================

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <p
      className="
        mb-3
        px-3
        text-[10px]
        font-bold
        uppercase
        tracking-[0.18em]
        text-slate-500
      "
    >
      {children}
    </p>
  );
}


// ======================================================
// APP SIDEBAR
// ======================================================

export function AppSidebar() {

  const router = useRouterState();

  const currentPath =
    router.location.pathname;


  return (

    <aside
      className="
        flex
        h-screen
        w-[260px]
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-slate-800
        bg-[#0b1224]
        text-white
      "
    >

      {/* ==================================================
          BRAND
      ================================================== */}

      <div
        className="
          flex
          h-[86px]
          shrink-0
          items-center
          gap-3
          border-b
          border-slate-800
          px-5
        "
      >

        {/* LOGO */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            shadow-lg
            shadow-blue-600/20
          "
        >

          <HeartPulse
            className="
              h-6
              w-6
              text-white
            "
          />

        </div>


        {/* BRAND TEXT */}

        <div className="min-w-0">

          <h1
            className="
              truncate
              text-lg
              font-bold
              tracking-tight
              text-white
            "
          >
            AIHMS
          </h1>

          <p
            className="
              truncate
              text-[11px]
              text-slate-400
            "
          >
            Hospital Management
          </p>

        </div>

      </div>


      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-3
          py-6
        "
      >

        {/* MAIN */}

        <div className="mb-7">

          <SectionTitle>
            Main
          </SectionTitle>

          <div className="space-y-1">

            {mainNavigation.map(
              (item) => (

                <NavigationItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  currentPath={currentPath}
                />

              )
            )}

          </div>

        </div>


        {/* MANAGEMENT */}

        <div>

          <SectionTitle>
            Management
          </SectionTitle>

          <div className="space-y-1">

            {managementNavigation.map(
              (item) => (

                <NavigationItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  currentPath={currentPath}
                />

              )
            )}

          </div>

        </div>

      </nav>


      {/* ==================================================
          USER AREA
      ================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-slate-800
          p-3
        "
      >

        {/* USER CARD */}

        <div
          className="
            mb-2
            flex
            items-center
            gap-3
            rounded-xl
            bg-white/[0.05]
            p-3
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-sm
              font-bold
            "
          >
            DA
          </div>


          <div className="min-w-0">

            <p
              className="
                truncate
                text-sm
                font-semibold
                text-white
              "
            >
              Dr. Admin
            </p>

            <p
              className="
                truncate
                text-xs
                text-slate-400
              "
            >
              Administrator
            </p>

          </div>

        </div>


        {/* SETTINGS */}

        <Link
          to="/settings"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-slate-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >

          <Settings
            className="
              h-4
              w-4
            "
          />

          Settings

        </Link>


        {/* LOGOUT */}

        <Link
          to="/auth/login"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-red-400
            transition
            hover:bg-red-500/10
            hover:text-red-300
          "
        >

          <LogOut
            className="
              h-4
              w-4
            "
          />

          Logout

        </Link>

      </div>

    </aside>
  );
}