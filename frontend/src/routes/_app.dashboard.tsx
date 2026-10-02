import { useEffect, useState } from "react";

import {
  Activity,
  Bed,
  CalendarCheck,
  IndianRupee,
  Pill,
  Stethoscope,
  UserRoundCheck,
  Users,
} from "lucide-react";

import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";

import { StatCard } from "@/components/app/stat-card";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import RevenueChart from "@/components/dashboard/RevenueChart";
import DiseaseChart from "@/components/dashboard/DiseaseChart";

import type { Appointment } from "@/types/appointment";

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

  monthlyRevenue?: {
    month?: string;
    value?: number;
  }[];

  diseaseDistribution?: {
    name?: string;
    value?: number;
  }[];

  dailyPatients?: any[];

  bedOccupancy?: any[];

  healthTrend?: any[];
}

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
        const [
          analyticsResponse,
          appointmentResponse,
        ] = await Promise.all([
          api.getAnalytics(),
          api.getAppointments(),
        ]);

        setAnalytics(
          analyticsResponse as Analytics,
        );

        setAppointments(
          appointmentResponse,
        );
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading || !analytics) {
    return <DashboardSkeleton />;
  }

  const {
    kpis,
    monthlyRevenue = [],
    diseaseDistribution = [],
  } = analytics;

  const recentAppointments =
    appointments.slice(0, 5);

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            Overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hospital Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Monitor hospital operations, patients,
            appointments and revenue.
          </p>
        </div>

        <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
          <p className="text-xs text-muted-foreground">
            Completed Appointments
          </p>

          <p className="mt-1 text-xl font-bold">
            {kpis.completedAppointments}
          </p>
        </div>
      </div>

      {/* PRIMARY KPIs */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Patients"
          value={kpis.totalPatients}
          icon={Users}
          tone="primary"
          delta="Active patients"
        />

        <StatCard
          label="Doctors"
          value={kpis.doctors}
          icon={Stethoscope}
          tone="info"
          delta="Medical staff"
        />

        <StatCard
          label="Revenue MTD"
          value={`₹${Number(
            kpis.revenueMTD ?? 0,
          ).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          tone="success"
          delta="Current month"
        />

        <StatCard
          label="Appointments"
          value={kpis.appointments}
          icon={CalendarCheck}
          tone="warning"
          delta="Scheduled visits"
        />
      </div>

      {/* SECONDARY KPIs */}

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Hospital Operations
          </h2>

          <p className="text-sm text-muted-foreground">
            Current operational status
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard
            label="Admissions"
            value={kpis.admissions ?? 0}
            icon={Activity}
            tone="destructive"
            delta="Current admissions"
          />

          <StatCard
            label="Beds Available"
            value={kpis.bedsAvailable ?? 0}
            icon={Bed}
            tone="info"
            delta="Available capacity"
          />

          <StatCard
            label="Medicines Stock"
            value={kpis.medicinesInStock ?? 0}
            icon={Pill}
            tone="success"
            delta="Items in inventory"
          />
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart
          data={monthlyRevenue}
        />

        <DiseaseChart
          data={diseaseDistribution}
        />
      </div>

      {/* APPOINTMENTS */}

      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <UserRoundCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold">
                Recent Appointments
              </h2>

              <p className="text-xs text-muted-foreground">
                Latest scheduled patient visits
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            {appointments.length} total
          </span>
        </div>

        <div className="p-5">
          {recentAppointments.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <CalendarCheck className="mx-auto h-8 w-8 text-muted-foreground" />

              <p className="mt-3 font-medium">
                No appointments found
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                There are no recent appointments to display.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map(
                (appointment) => {
                  const status =
                    String(
                      appointment.status ?? "",
                    ).toLowerCase();

                  const completed =
                    status === "completed";

                  const cancelled =
                    status === "cancelled";

                  return (
                    <div
                      key={appointment.id}
                      className="flex flex-col gap-4 rounded-xl border p-4 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {appointment.patient ||
                              "Unknown Patient"}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Dr.{" "}
                            {appointment.doctor ||
                              "Unknown Doctor"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium">
                            {
                              appointment.appointment_date
                            }
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Appointment
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            completed
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                              : cancelled
                                ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                          }`}
                        >
                          {appointment.status ||
                            "Pending"}
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute(
  "/_app/dashboard",
)({
  component: DashboardPage,
});