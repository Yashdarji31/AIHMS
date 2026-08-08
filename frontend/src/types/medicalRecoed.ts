export interface MedicalRecord {
  id: number;

  appointment_id: number;

  doctor_id: number;

  patient_id: number;

  diagnosis: string;

  prescription: string;

  notes: string;

  created_at: string;
}

export interface MedicalRecordCreate {
  appointment_id: number;

  diagnosis: string;

  prescription: string;

  notes: string;
}

export interface MedicalRecordUpdate {
  diagnosis?: string;

  prescription?: string;

  notes?: string;
}