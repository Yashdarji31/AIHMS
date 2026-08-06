export interface MedicalRecord {
  id: number;

  appointment_id: number;

  doctor_id: number;

  patient_id: number;

  diagnosis: string;

  prescription: string;

  notes: string;
}