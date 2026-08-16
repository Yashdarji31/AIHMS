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
// MENU
// ======================================================


const mainMenu = [

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




const managementMenu = [

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


export default function Sidebar() {


  const router =
    useRouterState();



  const currentPath =
    router.location.pathname;





  function MenuItem({
    item
  }: {
    item: any
  }) {


    const Icon =
      item.icon;



    const active =
      currentPath === item.path;



    return (

      <Link

        to={item.path}

        className="relative"

      >


        <motion.div

          whileHover={{
            x: 4
          }}

          transition={{
            duration: 0.2
          }}

          className={`
flex
items-center
gap-3
rounded-xl
px-3
py-2.5
text-sm
font-medium
transition

${active

              ?

              "bg-primary text-primary-foreground shadow-sm"

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


          <span>

            {item.name}

          </span>



        </motion.div>



      </Link>


    )

  }







  return (


    <aside


      className="
hidden
md:flex
h-screen
w-72
flex-col
border-r
bg-background
px-5
py-6
"


    >




      {/* BRAND */}


      <div

        className="
mb-8
flex
items-center
gap-3
"

      >


        <div

          className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-primary
text-primary-foreground
shadow-md
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

            Hospital Management

          </p>


        </div>



      </div>







      {/* NAVIGATION */}


      <nav

        className="
flex-1
space-y-6
"

      >



        <div>


          <p

            className="
mb-3
px-3
text-xs
font-semibold
uppercase
tracking-wider
text-muted-foreground
"

          >

            Main

          </p>



          <div

            className="
space-y-1
"

          >


            {
              mainMenu.map(
                (item) => (

                  <MenuItem

                    key={
                      item.path
                    }

                    item={
                      item
                    }

                  />

                )
              )
            }



          </div>


        </div>







        <div>


          <p

            className="
mb-3
px-3
text-xs
font-semibold
uppercase
tracking-wider
text-muted-foreground
"

          >

            Management

          </p>




          <div

            className="
space-y-1
"

          >


            {
              managementMenu.map(
                (item) => (

                  <MenuItem

                    key={
                      item.path
                    }

                    item={
                      item
                    }

                  />

                )

              )

            }


          </div>


        </div>




      </nav>









      {/* USER AREA */}



      <div

        className="
border-t
pt-4
space-y-2
"

      >


        <div

          className="
rounded-xl
bg-muted
p-3
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







        <button


          className="
flex
w-full
items-center
gap-3
rounded-xl
px-3
py-2.5
text-sm
text-muted-foreground
hover:bg-muted
transition
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
rounded-xl
px-3
py-2.5
text-sm
text-red-500
hover:bg-red-500/10
transition
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