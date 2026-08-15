import {
  Bell,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SidebarTrigger } from "@/components/ui/sidebar";

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

  const {
    theme,
    toggle,
  } = useTheme();


  return (

    <header
      className="
      sticky
      top-0
      z-30

      flex
      h-16
      items-center
      gap-4

      border-b

      bg-background/90

      px-6

      backdrop-blur

      "
    >


      {/* Mobile Sidebar Button */}

      <SidebarTrigger />



      {/* Search */}

      <div
        className="
        relative
        hidden
        w-full
        max-w-lg
        md:block
        "
      >

        <Search
          className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
          "
        />


        <Input

          placeholder="
          Search patients, doctors, appointments...
          "

          className="
          h-10
          rounded-xl
          pl-10
          "

        />


      </div>




      <div
        className="
        ml-auto
        flex
        items-center
        gap-2
        "
      >


        {/* Theme */}

        <Button

          variant="ghost"

          size="icon"

          className="
          rounded-full
          "

          onClick={toggle}

        >

          {
            theme === "dark"

            ?

            <Sun
              className="
              h-5
              w-5
              "
            />

            :

            <Moon
              className="
              h-5
              w-5
              "
            />
          }


        </Button>




        {/* Notification */}

        <Button

          variant="ghost"

          size="icon"

          className="
          relative
          rounded-full
          "

          asChild

        >

          <Link to="/notifications">


            <Bell
              className="
              h-5
              w-5
              "
            />


            <span

              className="
              absolute

              right-1
              top-1

              flex

              h-4
              w-4

              items-center
              justify-center

              rounded-full

              bg-red-500

              text-[10px]

              font-bold

              text-white

              "

            >

              3

            </span>


          </Link>


        </Button>




        {/* Settings */}

        <Button

          variant="ghost"

          size="icon"

          className="
          rounded-full
          "

          asChild

        >

          <Link to="/settings">

            <Settings
              className="
              h-5
              w-5
              "
            />

          </Link>

        </Button>




        {/* Profile */}

        <DropdownMenu>


          <DropdownMenuTrigger asChild>


            <Button

              variant="outline"

              className="
              flex
              items-center
              gap-2
              rounded-xl
              "

            >

              <User
                className="
                h-4
                w-4
                "
              />


              <span
                className="
                hidden
                md:block
                "
              >

                Admin

              </span>


            </Button>


          </DropdownMenuTrigger>



          <DropdownMenuContent

            align="end"

            className="
            w-64
            rounded-xl
            "

          >


            <DropdownMenuLabel>


              <div
                className="
                font-semibold
                "
              >

                Dr. Admin

              </div>


              <div
                className="
                mt-1
                flex
                items-center
                gap-2
                text-xs
                text-muted-foreground
                "
              >

                admin@aihms.io


                <Badge>

                  ADMIN

                </Badge>


              </div>


            </DropdownMenuLabel>



            <DropdownMenuSeparator />


            <DropdownMenuItem asChild>

              <Link to="/profile">

                Profile

              </Link>

            </DropdownMenuItem>



            <DropdownMenuItem asChild>

              <Link to="/settings">

                Settings

              </Link>

            </DropdownMenuItem>


            <DropdownMenuSeparator />


            <DropdownMenuItem asChild>

              <Link to="/auth/login">

                Logout

              </Link>

            </DropdownMenuItem>


          </DropdownMenuContent>


        </DropdownMenu>


      </div>


    </header>

  );
}