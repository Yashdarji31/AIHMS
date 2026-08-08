import type { LoginPayload, LoginResponse } from "@/types/api";

import type { Doctor } from "@/types/doctor";

import type { Appointment, AppointmentCreate, AppointmentUpdate } from "@/types/appointment";

const BASE_URL = "http://127.0.0.1:8000";

function getToken() {
  return localStorage.getItem("token");
}

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
    const error = await response.json();

    throw new Error(error.detail || "API Error");
  }

  return response.json();
}

export const api = {
  // ==========================
  // AUTH
  // ==========================

  async login(payload: LoginPayload): Promise<LoginResponse> {
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
      throw new Error("Invalid credentials");
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem("token", data.access_token);

    return data;
  },

  async getCurrentUser() {
    return apiRequest("/auth/me");
  },

  // ==========================
  // DOCTORS
  // ==========================

  async getDoctors(): Promise<Doctor[]> {
    return apiRequest("/doctors");
  },

  async getDoctor(id: number): Promise<Doctor> {
    return apiRequest(`/doctors/${id}`);
  },

  // ==========================
  // APPOINTMENTS
  // ==========================

  async getAppointments(): Promise<Appointment[]> {
    return apiRequest("/appointments");
  },

  async createAppointment(data: AppointmentCreate) {
    return apiRequest("/appointments", {
      method: "POST",

      body: JSON.stringify(data),
    });
  },

  async updateAppointment(id: number, data: AppointmentUpdate) {
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

  // ==========================
// MEDICAL RECORDS
// ==========================

async getMedicalRecords() {
  return apiRequest("/medical-records");
},

async getMyMedicalRecords() {
  return apiRequest("/medical-records/me");
},

async getMedicalRecord(id: number) {
  return apiRequest(
    `/medical-records/${id}`
  );
},

async createMedicalRecord(
  data: any
) {
  return apiRequest(
    "/medical-records",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
},

async updateMedicalRecord(
  id: number,
  data: any
) {
  return apiRequest(
    `/medical-records/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
},

async deleteMedicalRecord(
  id: number
) {
  return apiRequest(
    `/medical-records/${id}`,
    {
      method: "DELETE",
    }
  );
},
};
