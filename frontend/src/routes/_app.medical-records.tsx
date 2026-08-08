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

function MedicalRecordsPage() {

  const [editingRecord, setEditingRecord] =
    useState<MedicalRecord | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteRecord, setDeleteRecord] =
    useState<MedicalRecord | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const {
    data: currentUser,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: api.getCurrentUser,
  });

  const {
    data: records = [],
    isLoading: recordsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["medical-records"],
    queryFn: api.getMedicalRecords,
  });

  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: api.getAppointments,
  });

  if (
    userLoading ||
    recordsLoading ||
    appointmentsLoading
  ) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading medical records...
        </p>
      </div>
    );
  }

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

  const role = currentUser?.role;

  const canCreate =
    role === "doctor";

  const canEdit =
    role === "doctor";

  const canDelete =
    role === "admin";

  function handleEdit(
    record: MedicalRecord
  ) {
    setEditingRecord(record);
    setEditOpen(true);
  }

  function handleDelete(
    record: MedicalRecord
  ) {
    setDeleteRecord(record);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
          ========================= */}

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

      {/* =========================
          STATISTICS
          ========================= */}

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

      {/* =========================
          TABLE
          ========================= */}

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

      {/* =========================
          EDIT
          ========================= */}

      {canEdit && (
        <EditMedicalRecordDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          record={editingRecord}
        />
      )}

      {/* =========================
          DELETE
          ========================= */}

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