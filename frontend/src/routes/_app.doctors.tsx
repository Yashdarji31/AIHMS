import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, Stethoscope } from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { api } from "@/lib/api";


export const Route = createFileRoute("/_app/doctors")({
  head: () => ({
    meta: [{ title: "Doctors — AIHMS" }],
  }),
  component: DoctorsPage,
});


function DoctorsPage() {

  const { data = [] } = useQuery({
    queryKey:["doctors"],
    queryFn:api.getDoctors
  });


  return (

    <div>

      <PageHeader
        title="Doctors"
        description="Specialists, consultants and residents."
        actions={
          <Button>
            <Plus className="h-4 w-4"/>
            Add doctor
          </Button>
        }
      />


      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {data.slice(0,4).map((doctor:any)=>(

          <Card key={doctor.id}>

            <CardContent className="p-4">

              <div className="flex items-center gap-3">

                <Avatar>
                  <AvatarFallback>
                    <Stethoscope className="h-4 w-4"/>
                  </AvatarFallback>
                </Avatar>


                <div>

                  <div className="font-semibold">
                    Doctor #{doctor.id}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {doctor.specialization}
                  </div>

                </div>


              </div>


              <div className="mt-3 text-sm">

                Experience:
                {" "}
                {doctor.experience} years

              </div>


              <div className="text-sm">

                Fee:
                {" "}
                ₹{doctor.consultation_fee}

              </div>


              <div className="text-sm">

                Status:
                {" "}
                {doctor.available ? "Available":"Unavailable"}

              </div>


            </CardContent>


          </Card>


        ))}


      </div>



      <DataTable

        rows={data}

        searchKeys={
          [
            "specialization",
            "qualification"
          ] as any
        }


        columns={[


          {
            key:"id",
            header:"Doctor",

            cell:(doctor:any)=>(

              <div className="flex items-center gap-3">

                <Avatar>
                  <AvatarFallback>
                    <Stethoscope className="h-4 w-4"/>
                  </AvatarFallback>
                </Avatar>


                <div>

                  <div className="font-medium">
                    Doctor #{doctor.id}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {doctor.qualification}
                  </div>

                </div>


              </div>

            )

          },


          {
            key:"specialization",
            header:"Specialization"
          },


          {
            key:"experience",
            header:"Experience"
          },


          {
            key:"consultation_fee",
            header:"Fee"
          },


          {
            key:"available",
            header:"Status",

            cell:(doctor:any)=>(

              <span>
                {
                  doctor.available
                  ? "Available"
                  : "Unavailable"
                }
              </span>

            )
          },


          {
            key:"actions",
            header:"",
            cell:()=>(
              <Button variant="ghost" size="sm">
                Schedule
              </Button>
            )
          }


        ]}

      />


    </div>

  );

}