import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  FileText,
  ClipboardList,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

import MedicalRecordTable from "@/components/medical-records/MedicalRecordTable";
import MedicalRecordForm from "@/components/medical-records/MedicalRecordForm";
import EditMedicalRecordDialog from "@/components/medical-records/EditMedicalRecordDialog";
import DeleteMedicalRecordDialog from "@/components/medical-records/DeleteMedicalRecordDialog";

import { api } from "@/lib/api";

import type { MedicalRecord } from "@/types/medicalRecord";
import type { User } from "@/types/user";


// ======================================================
// ROUTE
// ======================================================

export const Route = createFileRoute(
  "/_app/medical-records"
)({
  head: () => ({
    meta: [
      {
        title: "Medical Records — AIHMS",
      },
    ],
  }),

  component: MedicalRecordsPage,
});


// ======================================================
// PAGE
// ======================================================

function MedicalRecordsPage() {

  // ====================================================
  // STATE
  // ====================================================

  const [
    editingRecord,
    setEditingRecord,
  ] = useState<MedicalRecord | null>(null);

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    deleteRecord,
    setDeleteRecord,
  ] = useState<MedicalRecord | null>(null);

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
  // MEDICAL RECORDS
  // ====================================================

  const {
    data: records = [],
    isLoading: recordsLoading,
    isError,
    error,
  } = useQuery<MedicalRecord[]>({
    queryKey: ["medical-records"],
    queryFn: api.getMedicalRecords,
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
    recordsLoading ||
    appointmentsLoading
  ) {
    return (
      <div className="flex min-h-[75] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading medical records...
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
          Failed to load medical records
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


  // Doctor can create records
  const canCreate =
    role === "doctor";


  // Doctor can edit own records
  const canEdit =
    role === "doctor";


  // Admin can delete records
  const canDelete =
    role === "admin";


  // ====================================================
  // EDIT HANDLER
  // ====================================================

  function handleEdit(
    record: MedicalRecord
  ) {
    setEditingRecord(record);
    setEditOpen(true);
  }


  // ====================================================
  // DELETE HANDLER
  // ====================================================

  function handleDelete(
    record: MedicalRecord
  ) {
    setDeleteRecord(record);
    setDeleteOpen(true);
  }


  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="space-y-6">

      {/* ================================================
          HEADER
      ================================================= */}

      <PageHeader
        title="Medical Records"
        description="View and manage patient medical records."

        actions={
          canCreate ? (
            <MedicalRecordForm
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
          label="Total Records"
          value={records.length}
          icon={FileText}
        />

        <StatCard
          label="Appointments"
          value={appointments.length}
          icon={ClipboardList}
          tone="info"
        />

      </div>


      {/* ================================================
          MEDICAL RECORD TABLE
      ================================================= */}

      <MedicalRecordTable
        records={records}

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
        <EditMedicalRecordDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          record={editingRecord}
        />
      )}


      {/* ================================================
          DELETE DIALOG
      ================================================= */}

      {canDelete && (
        <DeleteMedicalRecordDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          record={deleteRecord}
        />
      )}

    </div>
  );
}