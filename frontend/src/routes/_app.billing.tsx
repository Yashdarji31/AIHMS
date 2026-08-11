import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  Receipt,
  ClipboardList,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

import BillingTable from "@/components/billing/BillingTable";
import BillingForm from "@/components/billing/BillingForm";
import EditBillingDialog from "@/components/billing/EditBillingDialog";
import DeleteBillingDialog from "@/components/billing/DeleteBillingDialog";

import { api } from "@/lib/api";

import type { Billing } from "@/types/billing";
import type { User } from "@/types/user";


// ======================================================
// ROUTE
// ======================================================

export const Route = createFileRoute(
  "/_app/billing"
)({
  head: () => ({
    meta: [
      {
        title: "Billing — AIHMS",
      },
    ],
  }),

  component: BillingPage,
});


// ======================================================
// PAGE
// ======================================================

function BillingPage() {

  // ====================================================
  // STATE
  // ====================================================

  const [
    editingBilling,
    setEditingBilling,
  ] = useState<Billing | null>(null);

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    deleteBilling,
    setDeleteBilling,
  ] = useState<Billing | null>(null);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);


  // ====================================================
  // CURRENT USER
  // ====================================================

  const {
    data: currentUser,
    isLoading: userLoading,
  } = useQuery<User>({
    queryKey: ["current-user"],
    queryFn: api.getCurrentUser,
  });


  // ====================================================
  // BILLING
  // ====================================================

  const {
    data: billings = [],
    isLoading: billingLoading,
    isError,
    error,
  } = useQuery<Billing[]>({
    queryKey: ["billings"],
    queryFn: api.getBillings,
  });


  // ====================================================
  // APPOINTMENTS
  // ====================================================

  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: api.getAppointments,
  });


  // ====================================================
  // LOADING
  // ====================================================

  if (
    userLoading ||
    billingLoading ||
    appointmentsLoading
  ) {
    return (
      <div className="flex min-h-[75] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading billing records...
        </p>
      </div>
    );
  }


  // ====================================================
  // ERROR
  // ====================================================

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">

        <h2 className="font-semibold text-destructive">
          Failed to load billing records
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Something went wrong."}
        </p>

      </div>
    );
  }


  // ====================================================
  // ROLE
  // ====================================================

  const role = currentUser?.role;


  // Admin can create billing records
  const canCreate =
    role === "admin";


  // Admin can edit billing records
  const canEdit =
    role === "admin";


  // Admin can delete billing records
  const canDelete =
    role === "admin";


  // ====================================================
  // EDIT HANDLER
  // ====================================================

  function handleEdit(
    billing: Billing
  ) {
    setEditingBilling(billing);
    setEditOpen(true);
  }


  // ====================================================
  // DELETE HANDLER
  // ====================================================

  function handleDelete(
    billing: Billing
  ) {
    setDeleteBilling(billing);
    setDeleteOpen(true);
  }


  // ====================================================
  // TOTAL REVENUE
  // ====================================================

  const totalAmount = billings.reduce(
    (total, billing) =>
      total + Number(billing.amount),
    0
  );


  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="space-y-6">

      {/* ================================================
          HEADER
      ================================================= */}

      <PageHeader
        title="Billing"
        description="View and manage patient billing records."

        actions={
          canCreate ? (
            <BillingForm
              appointments={appointments}
            />
          ) : undefined
        }
      />


      {/* ================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <StatCard
          label="Total Bills"
          value={billings.length}
          icon={Receipt}
        />

        <StatCard
          label="Total Amount"
          value={`₹${totalAmount.toFixed(2)}`}
          icon={ClipboardList}
          tone="info"
        />

      </div>


      {/* ================================================
          BILLING TABLE
      ================================================= */}

      <BillingTable
        billings={billings}

        onEdit={
          canEdit
            ? handleEdit
            : undefined
        }

        onDelete={
          canDelete
            ? handleDelete
            : undefined
        }
      />


      {/* ================================================
          EDIT DIALOG
      ================================================= */}

      {canEdit && (
        <EditBillingDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          billing={editingBilling}
        />
      )}


      {/* ================================================
          DELETE DIALOG
      ================================================= */}

      {canDelete && (
        <DeleteBillingDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          billing={deleteBilling}
        />
      )}

    </div>
  );
}