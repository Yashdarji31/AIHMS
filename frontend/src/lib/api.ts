const BASE_URL = "http://127.0.0.1:8000";


function getToken() {
  return localStorage.getItem("token");
}


async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {

  const token = getToken();

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...options.headers,
      },
    }
  );


  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.detail || "API Error"
    );
  }


  return response.json();
}



const delay = (ms = 250) =>
  new Promise((resolve)=>setTimeout(resolve,ms));


const seedMedicines: any[] = [];
const seedBeds: any[] = [];
const seedInvoices: any[] = [];
const seedLabTests: any[] = [];
const seedEmergency: any[] = [];
const seedNotifications: any[] = [];

export const api = {


  // ==========================
  // AUTH
  // ==========================


  async login(payload:{
    email:string;
    password:string;
  }) {


    const formData = new URLSearchParams();


    formData.append(
      "username",
      payload.email
    );


    formData.append(
      "password",
      payload.password
    );



    const response = await fetch(
      `${BASE_URL}/auth/login`,
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/x-www-form-urlencoded",
        },

        body:formData,
      }
    );


    if(!response.ok){
      throw new Error(
        "Invalid credentials"
      );
    }


    const data =
      await response.json();


    localStorage.setItem(
      "token",
      data.access_token
    );


    return data;

  },



  async getCurrentUser(){

    return apiRequest(
      "/auth/me"
    );

  },



  async register(data:any){

    await delay();

    return {
      ok:true,
      user:data
    };

  },



  async forgotPassword(email:string){

    await delay();

    return {
      ok:true,
      email
    };

  },



  async resetPassword(
    token:string,
    password:string
  ){

    await delay();

    return {
      ok:true
    };

  },



  async verifyOtp(code:string){

    await delay();

    return {
      ok:true
    };

  },



  // ==========================
  // PATIENTS
  // ==========================


  async getPatients(){

    return apiRequest(
      "/patients"
    );

  },


  async getPatient(id:string){

    return apiRequest(
      `/patients/${id}`
    );

  },



  // ==========================
  // DOCTORS
  // ==========================


  async getDoctors(){

    return apiRequest(
      "/doctors"
    );

  },


  async getDoctor(id:number){

    return apiRequest(
      `/doctors/${id}`
    );

  },



  // ==========================
  // APPOINTMENTS
  // ==========================


  async getAppointments() {
    return apiRequest("/appointments");
  },



  async createAppointment(
    data:any
  ){

    return apiRequest(
      "/appointments",
      {
        method:"POST",

        body:
        JSON.stringify(data),
      }
    );

  },



  async updateAppointment(
    id:number,
    data:any
  ){

    return apiRequest(
      `/appointments/${id}`,
      {
        method:"PUT",

        body:
        JSON.stringify(data),
      }
    );

  },



  async deleteAppointment(
    id:number
  ){

    return apiRequest(
      `/appointments/${id}`,
      {
        method:"DELETE",
      }
    );

  },

// ==========================
// ANALYTICS
// ==========================

async getAnalytics() {
  await delay();

  return {
    kpis: {
      totalPatients: 0,
      doctors: 0,
      revenueMTD: 0,
      admissions: 0,
      discharges: 0,
      avgWaitMin: 0,
      bedsAvailable: 0,
      medicinesInStock: 0,
    },

    monthlyRevenue: [],

    diseaseDistribution: [],

    dailyPatients: [],

    bedOccupancy: [],

    healthTrend: [],
  };
},

// ==========================
// MEDICINES
// ==========================

async getMedicines() {

  await delay();

  return seedMedicines;

},

// ==========================
// BEDS
// ==========================

async getBeds() {

  await delay();

  return seedBeds;

},


  // ==========================
  // BILLING
  // ==========================


  async getInvoices(){

    await delay();

    return seedInvoices;

  },



  // ==========================
  // LAB
  // ==========================


  async getLabTests(){

    await delay();

    return seedLabTests;

  },



  // ==========================
  // EMERGENCY
  // ==========================


  async getEmergencyCases(){

    await delay();

    return seedEmergency;

  },



  // ==========================
  // NOTIFICATIONS
  // ==========================


  async getNotifications(){

    await delay();

    return seedNotifications;

  },


};