export interface Appointment {
  id: number;

  patient: string;
  doctor: string;
  specialization: string;

  appointment_date: string;
  appointment_time: string;

  reason: string;
  status: string;
}

export interface AppointmentCreate {
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  reason: string;
}

export interface AppointmentUpdate {
  appointment_date?: string;
  appointment_time?: string;
  reason?: string;
  status?: string;
}