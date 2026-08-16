import {
  Bell,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  LogOut,
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
      z-40

      flex
      h-16
      items-center
      gap-4

      border-b

      bg-background/80

      px-4
      md:px-6

      backdrop-blur-xl
      "

    >



      {/* Mobile Sidebar */}

      <SidebarTrigger />





      {/* Search */}


      <div

        className="
        relative
        hidden
        flex-1
        max-w-xl
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
          bg-muted/50
          pl-10
          "

        />


      </div>








      {/* RIGHT ACTIONS */}


      <div

        className="
        ml-auto
        flex
        items-center
        gap-2
        "

      >





        {/* Theme Toggle */}


        <Button

          variant="ghost"

          size="icon"

          className="
          rounded-xl
          "

          onClick={toggle}

        >

          {
            theme === "dark"

              ?

              <Sun className="h-5 w-5" />

              :

              <Moon className="h-5 w-5" />

          }


        </Button>








        {/* Notifications */}



        <DropdownMenu>


          <DropdownMenuTrigger asChild>


            <Button

              variant="ghost"

              size="icon"

              className="
              relative
              rounded-xl
              "

            >


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


            </Button>


          </DropdownMenuTrigger>



          <DropdownMenuContent

            align="end"

            className="
            w-72
            rounded-xl
            "

          >


            <DropdownMenuLabel>

              Notifications

            </DropdownMenuLabel>


            <DropdownMenuSeparator />



            <DropdownMenuItem>

              New appointment booked

            </DropdownMenuItem>


            <DropdownMenuItem>

              Lab report uploaded

            </DropdownMenuItem>


            <DropdownMenuItem>

              Payment received

            </DropdownMenuItem>



            <DropdownMenuSeparator />


            <DropdownMenuItem asChild>


              <Link to="/notifications">

                View all notifications

              </Link>


            </DropdownMenuItem>


          </DropdownMenuContent>



        </DropdownMenu>









        {/* Settings */}



        <Button

          variant="ghost"

          size="icon"

          className="
          rounded-xl
          "

          asChild

        >

          <Link to="/settings">

            <Settings className="h-5 w-5" />

          </Link>


        </Button>








        {/* Profile */}



        <DropdownMenu>


          <DropdownMenuTrigger asChild>


            <Button

              variant="ghost"

              className="
              flex
              items-center
              gap-3
              rounded-xl
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
                text-primary-foreground
                "

              >

                <User className="h-4 w-4" />


              </div>




              <div

                className="
                hidden
                text-left
                md:block
                "

              >

                <p

                  className="
                  text-sm
                  font-semibold
                  "

                >

                  Dr. Admin


                </p>


                <p

                  className="
                  text-xs
                  text-muted-foreground
                  "

                >

                  Administrator


                </p>


              </div>



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


              <div className="font-semibold">

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

                <User className="mr-2 h-4 w-4" />

                Profile

              </Link>

            </DropdownMenuItem>





            <DropdownMenuItem asChild>


              <Link to="/settings">

                <Settings className="mr-2 h-4 w-4" />

                Settings


              </Link>


            </DropdownMenuItem>





            <DropdownMenuSeparator />





            <DropdownMenuItem

              className="
              text-red-500
              "

              asChild

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