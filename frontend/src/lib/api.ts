import type { User } from "@/types/user";
import type { Appointment } from "@/types/appointment";
import type { Doctor } from "@/types/doctor";
import type {
  MedicalRecord,
  MedicalRecordCreate,
  MedicalRecordUpdate,
} from "@/types/medicalRecord";
import type {
  Billing,
  BillingCreate,
  BillingUpdate,
} from "@/types/billing";

// ======================================================
// BASE URL
// ======================================================

const BASE_URL =
  import.meta.env.VITE_API_URL;

// ======================================================
// TOKEN
// ======================================================

function getToken() {
  return localStorage.getItem("token");
}

// ======================================================
// API REQUEST
// ======================================================

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "API Error";

    try {
      const error = await response.json();

      errorMessage = error.detail || errorMessage;
    } catch {
      // Keep default error message
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

// ======================================================
// DELAY
// ======================================================

const delay = (ms = 250) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ======================================================
// SEED DATA
// ======================================================

const seedMedicines: any[] = [];

const seedBeds: any[] = [];

const seedInvoices: any[] = [];

const seedLabTests: any[] = [];

const seedEmergency: any[] = [];

const seedNotifications: any[] = [];

// ======================================================
// API
// ======================================================

export const api = {
  // ====================================================
  // AUTH
  // ====================================================

  async login(payload: { email: string; password: string }) {
    const formData = new URLSearchParams();

    formData.append("username", payload.email);

    formData.append("password", payload.password);

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: formData,
    });

    if (!response.ok) {
      let message = "Invalid credentials";

      try {
        const error = await response.json();

        message = error.detail || message;
      } catch {
        // Keep default message
      }

      throw new Error(message);
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token);

    return data;
  },

  async getCurrentUser() {
    return apiRequest<User>("/auth/me");
  },

  async register(data: any) {
    await delay();

    return {
      ok: true,
      user: data,
    };
  },

  async forgotPassword(email: string) {
    await delay();

    return {
      ok: true,
      email,
    };
  },

  async resetPassword(token: string, password: string) {
    await delay();

    return {
      ok: true,
    };
  },

  async verifyOtp(code: string) {
    await delay();

    return {
      ok: true,
    };
  },

  // ====================================================
  // PATIENTS
  // ====================================================

  async getPatients() {
    return apiRequest("/patients");
  },

  async getPatient(id: string) {
    return apiRequest(`/patients/${id}`);
  },

  // ====================================================
  // DOCTORS
  // ====================================================

  async getDoctors() {
    return apiRequest<Doctor[]>("/doctors");
  },

  async getDoctor(id: number) {
    return apiRequest(`/doctors/${id}`);
  },

  // ====================================================
  // APPOINTMENTS
  // ====================================================

  async getAppointments() {
    return apiRequest<Appointment[]>("/appointments");
  },

  async createAppointment(data: any) {
    return apiRequest("/appointments", {
      method: "POST",

      body: JSON.stringify(data),
    });
  },

  async updateAppointment(id: number, data: any) {
    return apiRequest(`/appointments/${id}`, {
      method: "PUT",

      body: JSON.stringify(data),
    });
  },

  async deleteAppointment(id: number) {
    return apiRequest(`/appointments/${id}`, {
      method: "DELETE",
    });
  },

  // ====================================================
  // MEDICAL RECORDS
  // ====================================================

  async getMedicalRecords() {
    return apiRequest<MedicalRecord[]>("/medical-records");
  },

  async getMyMedicalRecords() {
    return apiRequest<MedicalRecord[]>("/medical-records/me");
  },

  async getMedicalRecord(id: number) {
    return apiRequest<MedicalRecord>(`/medical-records/${id}`);
  },

  async createMedicalRecord(data: MedicalRecordCreate) {
    return apiRequest<MedicalRecord>("/medical-records", {
      method: "POST",

      body: JSON.stringify(data),
    });
  },

  async updateMedicalRecord(id: number, data: MedicalRecordUpdate) {
    return apiRequest<MedicalRecord>(`/medical-records/${id}`, {
      method: "PUT",

      body: JSON.stringify(data),
    });
  },

  async deleteMedicalRecord(id: number) {
    return apiRequest<{
      message: string;
    }>(`/medical-records/${id}`, {
      method: "DELETE",
    });
  },

  // ====================================================
// ANALYTICS
// ====================================================

async getAnalytics() {
  return apiRequest<{
    kpis: {
      totalPatients: number;
      doctors: number;
      revenueMTD: number;
      admissions: number;
      discharges: number;
      avgWaitMin: number;
      bedsAvailable: number;
      medicinesInStock: number;
      appointments: number;
      completedAppointments: number;
    };

    monthlyRevenue: {
      month: string;
      value: number;
    }[];

    diseaseDistribution: {
      name: string;
      value: number;
    }[];

    dailyPatients: {
      day: string;
      value: number;
    }[];

    bedOccupancy: {
      ward: string;
      occupied: number;
      available: number;
    }[];

    healthTrend: {
      day: string;
      bp: number;
      sugar: number;
      pulse: number;
    }[];

  }>("/analytics");
},
  

  // ====================================================
  // MEDICINES
  // ====================================================

  async getMedicines() {
    await delay();

    return seedMedicines;
  },

  // ====================================================
  // BEDS
  // ====================================================

  async getBeds() {
    await delay();

    return seedBeds;
  },

// ====================================================
// BILLING
// ====================================================

async getBillings() {
  return apiRequest<Billing[]>("/billing");
},

async getBilling(id: number) {
  return apiRequest<Billing>(`/billing/${id}`);
},

async createBilling(data: BillingCreate) {
  return apiRequest<Billing>("/billing", {
    method: "POST",

    body: JSON.stringify(data),
  });
},

async updateBilling(id: number, data: BillingUpdate) {
  return apiRequest<Billing>(`/billing/${id}`, {
    method: "PUT",

    body: JSON.stringify(data),
  });
},

async deleteBilling(id: number) {
  return apiRequest<{
    message: string;
  }>(`/billing/${id}`, {
    method: "DELETE",
  });
},


// ====================================================
// DOWNLOAD INVOICE PDF
// ====================================================

async downloadInvoice(id: number) {

  const token = getToken();

  const response = await fetch(
    `${BASE_URL}/billing/${id}/invoice`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  if (!response.ok) {

    let message =
      "Failed to download invoice";

    try {

      const error =
        await response.json();

      message =
        error.detail || message;

    } catch {
      // default error
    }

    throw new Error(message);
  }


  const blob =
    await response.blob();


  const url =
    window.URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href = url;


  link.download =
    `invoice_${id}.pdf`;


  document.body.appendChild(link);


  link.click();


  link.remove();


  window.URL.revokeObjectURL(url);
},
  // ====================================================
  // LAB
  // ====================================================

  async getLabTests() {
    await delay();

    return seedLabTests;
  },

  // ====================================================
  // EMERGENCY
  // ====================================================

  async getEmergencyCases() {
    await delay();

    return seedEmergency;
  },

  // ====================================================
  // NOTIFICATIONS
  // ====================================================

  async getNotifications() {
    await delay();

    return seedNotifications;
  },
};
