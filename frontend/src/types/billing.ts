export interface Billing {
  id: number;
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  amount: number;
  payment_status: string;
  payment_method: string;
  description: string;
  created_at: string;
}

export interface BillingCreate {
  appointment_id: number;
  amount: number;
  payment_status: string;
  payment_method: string;
  description: string;
}

export interface BillingUpdate {
  amount?: number;
  payment_status?: string;
  payment_method?: string;
  description?: string;
}