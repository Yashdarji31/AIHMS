import { useEffect, useState } from "react";

import {
  Users,
  Stethoscope,
  IndianRupee,
  CalendarCheck,
  Activity,
  Bed,
  Pill,
  UserRoundCheck,
} from "lucide-react";

import { api } from "@/lib/api";

import { StatCard } from "@/components/app/stat-card";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

import RevenueChart from "@/components/dashboard/RevenueChart";
import DiseaseChart from "@/components/dashboard/DiseaseChart";

import type { Appointment } from "@/types/appointment";


// ======================================================
// TYPES
// ======================================================

interface Analytics {

  kpis: {

    totalPatients: number;

    doctors: number;

    revenueMTD: number;

    appointments: number;

    completedAppointments: number;

    admissions?: number;

    discharges?: number;

    avgWaitMin?: number;

    bedsAvailable?: number;

    medicinesInStock?: number;

  };


  monthlyRevenue?: any[];

  diseaseDistribution?: any[];

  dailyPatients?: any[];

  bedOccupancy?: any[];

  healthTrend?: any[];

}




// ======================================================
// DASHBOARD
// ======================================================


export default function DashboardPage() {


  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);



  const [appointments, setAppointments] =
    useState<Appointment[]>([]);



  const [loading, setLoading] =
    useState(true);




  useEffect(() => {


    async function loadDashboard() {


      try {


        const analyticsResponse =
          await api.getAnalytics();


        const appointmentResponse =
          await api.getAppointments();



        setAnalytics(
          analyticsResponse as Analytics
        );


        setAppointments(
          appointmentResponse
        );


      }

      catch(error) {


        console.error(
          "Dashboard loading error",
          error
        );


      }


      finally {


        setLoading(false);


      }


    }



    loadDashboard();


  }, []);





  // ====================================================
  // LOADING STATE
  // ====================================================


  if (
    loading ||
    !analytics
  ) {


    return (

      <DashboardSkeleton />

    );


  }






  // ====================================================
  // SAFE DATA
  // ====================================================


  const {

    kpis,

    monthlyRevenue = [],

    diseaseDistribution = [],

    dailyPatients = [],

    healthTrend = []


  } = analytics;






  return (


    <div
      className="
      space-y-8
      animate-in
      fade-in
      duration-500
      "
    >



      {/* HEADER */}

      <div>


        <h1
          className="
          text-3xl
          font-bold
          "
        >

          Hospital Dashboard

        </h1>


        <p
          className="
          text-muted-foreground
          "
        >

          AI Hospital Management System overview

        </p>


      </div>






      {/* KPI CARDS */}


      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        "
      >


        <StatCard

          label="Total Patients"

          value={
            kpis.totalPatients
          }

          icon={Users}

          tone="primary"

        />



        <StatCard

          label="Doctors"

          value={
            kpis.doctors
          }

          icon={Stethoscope}

          tone="info"

        />



        <StatCard

          label="Revenue MTD"

          value={
            `₹${kpis.revenueMTD}`
          }

          icon={IndianRupee}

          tone="success"

        />



        <StatCard

          label="Appointments"

          value={
            kpis.appointments
          }

          icon={CalendarCheck}

          tone="warning"

        />


      </div>







      {/* EXTRA CARDS */}


      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-5
        "
      >



        <StatCard

          label="Admissions"

          value={
            kpis.admissions ?? 0
          }

          icon={Activity}

          tone="destructive"

        />



        <StatCard

          label="Beds Available"

          value={
            kpis.bedsAvailable ?? 0
          }

          icon={Bed}

          tone="info"

        />



        <StatCard

          label="Medicines Stock"

          value={
            kpis.medicinesInStock ?? 0
          }

          icon={Pill}

          tone="success"

        />



      </div>







      {/* CHARTS */}


      <div

        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        "

      >


        <RevenueChart

          data={
            monthlyRevenue
          }

        />



        <DiseaseChart

          data={
            diseaseDistribution
          }

        />


      </div>







      {/* APPOINTMENTS */}


      <div

        className="
        rounded-2xl
        border
        bg-card
        p-6
        "

      >


        <div

          className="
          flex
          items-center
          gap-2
          mb-5
          "

        >

          <UserRoundCheck
            className="
            h-5
            w-5
            "
          />


          <h2
            className="
            font-semibold
            "
          >

            Recent Appointments

          </h2>


        </div>





        <div
          className="
          space-y-3
          "
        >


          {

            appointments
            .slice(0,5)
            .map(
              (appointment)=>(


              <div

                key={
                  appointment.id
                }

                className="
                flex
                justify-between
                rounded-xl
                border
                p-4
                hover:bg-muted/50
                transition
                "

              >



                <div>


                  <p
                    className="
                    font-medium
                    "
                  >

                    {
                      appointment.patient
                    }

                  </p>


                  <p
                    className="
                    text-sm
                    text-muted-foreground
                    "
                  >

                    Dr. {
                      appointment.doctor
                    }

                  </p>


                </div>





                <div
                  className="
                  text-right
                  text-sm
                  "
                >

                  <p>

                    {
                      appointment.appointment_date
                    }

                  </p>


                  <p
                    className="
                    text-muted-foreground
                    "
                  >

                    {
                      appointment.status
                    }

                  </p>


                </div>



              </div>


              )

            )

          }



        </div>



      </div>






    </div>


  );


}