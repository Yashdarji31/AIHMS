import {
  Bell,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  LogOut,
  ChevronDown,
  CalendarDays,
  FileText,
  CreditCard,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTheme } from "@/lib/theme";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[72px]
        w-full
        items-center
        gap-4
        border-b
        border-slate-200
        bg-white
        px-4
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        md:px-6
      "
    >
      {/* =========================================
          SEARCH
      ========================================== */}

      <div
        className="
          relative
          hidden
          max-w-2xl
          flex-1
          md:block
        "
      >
        <Search
          className="
            absolute
            left-3.5
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-slate-400
          "
        />

        <Input
          placeholder="Search patients, doctors, appointments..."
          className="
            h-11
            w-full
            rounded-xl
            border-slate-200
            bg-slate-50
            pl-10
            text-sm
            shadow-none
            outline-none
            transition
            focus-visible:ring-2
            focus-visible:ring-blue-500/20
            dark:border-slate-700
            dark:bg-slate-800
          "
        />
      </div>

      {/* Mobile Search */}

      <Button
        variant="ghost"
        size="icon"
        className="
          rounded-xl
          text-slate-600
          md:hidden
          dark:text-slate-300
        "
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* =========================================
          RIGHT ACTIONS
      ========================================== */}

      <div
        className="
          ml-auto
          flex
          items-center
          gap-1
          sm:gap-2
        "
      >
        {/* =====================================
            THEME
        ====================================== */}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="
            h-10
            w-10
            rounded-xl
            text-slate-600
            hover:bg-slate-100
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </Button>

        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="
                relative
                h-10
                w-10
                rounded-xl
                text-slate-600
                hover:bg-slate-100
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              <Bell className="h-[18px] w-[18px]" />

              <span
                className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-[17px]
                  min-w-[17px]
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[9px]
                  font-bold
                  text-white
                  ring-2
                  ring-white
                  dark:ring-slate-900
                "
              >
                3
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-80
              rounded-2xl
              border-slate-200
              bg-white
              p-2
              shadow-xl
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="text-sm font-semibold">
                Notifications
              </div>

              <div className="mt-1 text-xs font-normal text-muted-foreground">
                You have 3 new notifications
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="rounded-xl p-3">
              <div
                className="
                  mr-3
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-500/10
                "
              >
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  New appointment booked
                </p>

                <p className="text-xs text-muted-foreground">
                  A new appointment was scheduled
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl p-3">
              <div
                className="
                  mr-3
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-purple-50
                  text-purple-600
                  dark:bg-purple-500/10
                "
              >
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Lab report uploaded
                </p>

                <p className="text-xs text-muted-foreground">
                  A new medical report is available
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl p-3">
              <div
                className="
                  mr-3
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-500/10
                "
              >
                <CreditCard className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Payment received
                </p>

                <p className="text-xs text-muted-foreground">
                  Hospital payment successfully received
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="justify-center rounded-xl font-medium"
            >
              <Link to="/notifications">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* =====================================
            SETTINGS
        ====================================== */}

        <Button
          variant="ghost"
          size="icon"
          asChild
          className="
            hidden
            h-10
            w-10
            rounded-xl
            text-slate-600
            hover:bg-slate-100
            sm:flex
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Link to="/settings">
            <Settings className="h-[18px] w-[18px]" />
          </Link>
        </Button>

        {/* =====================================
            PROFILE
        ====================================== */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="
                ml-1
                h-11
                rounded-xl
                px-2
                hover:bg-slate-100
                dark:hover:bg-slate-800
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
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500
                  text-white
                  shadow-sm
                "
              >
                <User className="h-4 w-4" />
              </div>

              <div className="hidden text-left sm:block">
                <p
                  className="
                    ml-2
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-slate-100
                  "
                >
                  Dr. Admin
                </p>

                <p
                  className="
                    ml-2
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Administrator
                </p>
              </div>

              <ChevronDown
                className="
                  ml-1
                  hidden
                  h-4
                  w-4
                  text-slate-400
                  sm:block
                "
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-64
              rounded-2xl
              border-slate-200
              bg-white
              p-2
              shadow-xl
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-500
                    text-white
                  "
                >
                  <User className="h-4 w-4" />
                </div>

                <div>
                  <div className="font-semibold">
                    Dr. Admin
                  </div>

                  <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                    admin@aihms.io
                  </div>
                </div>
              </div>

              <Badge
                className="
                  mt-3
                  rounded-md
                  bg-blue-50
                  text-[10px]
                  text-blue-600
                  hover:bg-blue-50
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                ADMIN
              </Badge>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="rounded-xl"
            >
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="rounded-xl"
            >
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="
                rounded-xl
                text-red-500
                focus:text-red-500
              "
            >
              <Link to="/auth/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}