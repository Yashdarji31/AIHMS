# AIHMS - AI Hospital Management System 🚀

AIHMS is a full-stack hospital management system that digitizes healthcare operations including patient management, doctor management, appointments, medical records, billing, invoice generation, and analytics.

## Features

### Authentication & Authorization
- JWT based authentication
- Role-based access control

Roles:
- Admin
- Doctor
- Patient


## Modules

### Patient Management
- Patient registration
- Patient profile management
- Medical history tracking


### Doctor Management
- Doctor profiles
- Specialization management
- Appointment handling


### Appointment Management
- Book appointments
- Update appointment status
- Track doctor-patient interactions


### Medical Records
- Create medical records
- Update records
- Patient medical history access


### Billing System
- Generate bills
- Update payments
- Delete invoices
- Download PDF invoices


### Analytics Dashboard
- Total patients
- Total doctors
- Revenue tracking
- Appointment statistics


## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- TanStack Router
- TanStack Query

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication

### Tools
- Git & GitHub
- ReportLab PDF Generator


# 📁 Project Structure

AIHMS follows a **modular and scalable full-stack architecture** with a FastAPI backend and React + TypeScript frontend.

```
AIHMS/
│
├── backend/                         # FastAPI Backend
│   │
│   ├── app/
│   │   ├── main.py                  # Application entry point
│   │   │
│   │   ├── auth/                    # Authentication & JWT handling
│   │   │
│   │   ├── database/                # Database connection & session management
│   │   │
│   │   ├── models/                  # SQLAlchemy database models
│   │   │
│   │   ├── schemas/                 # Pydantic request/response schemas
│   │   │
│   │   ├── routers/                 # API route endpoints
│   │   │   ├── auth.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── medical_record.py
│   │   │   ├── billing.py
│   │   │   └── analytics.py
│   │   │
│   │   ├── services/                # Business logic layer
│   │   │   └── invoice_service.py
│   │   │
│   │   ├── utils/                   # Helper utilities
│   │   │
│   │   └── ai/                      # AI related modules
│   │
│   ├── requirements.txt             # Python dependencies
│   └── .env.example                 # Environment variables template
│
│
├── frontend/                        # React + TypeScript Frontend
│   │
│   ├── public/                      # Static assets
│   │
│   ├── src/
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │
│   │   ├── routes/                  # Application pages/routes
│   │   │
│   │   ├── lib/                     # API client & utilities
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │
│   │   ├── types/                   # TypeScript interfaces/types
│   │   │
│   │   └── main.tsx                 # Frontend entry point
│   │
│   ├── package.json                 # Frontend dependencies
│   └── .env.example                 # Frontend environment config
│
│
├── .gitignore                       # Git ignored files
├── README.md                        # Project documentation
└── LICENSE                          # License information
```

---

# ⚙️ Installation

Follow these steps to run AIHMS locally.

## 1. Clone Repository

```bash
git clone https://github.com/Yashdarji31/AIHMS.git

cd AIHMS
```

---

# 🚀 Backend Setup (FastAPI)

Navigate to backend folder:

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost/aihms

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup (React + TypeScript)

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:8080
```

---

# 🏗️ Architecture Overview

```
Frontend (React + TypeScript)
              |
              |
          REST API
              |
              |
Backend (FastAPI)
              |
              |
        SQLAlchemy ORM
              |
              |
          MySQL Database
```

---

# 🔑 Main Features

✅ JWT Authentication  
✅ Role Based Access Control (Admin / Doctor / Patient)  
✅ Patient Management  
✅ Doctor Management  
✅ Appointment Scheduling  
✅ Medical Records Management  
✅ Billing System  
✅ Invoice PDF Generation  
✅ Analytics Dashboard  
✅ Secure API Architecture  

---

# 🛠️ Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- MySQL
- Alembic
- Pydantic
- JWT Authentication
- ReportLab PDF Generator

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- TanStack Router
- ShadCN UI

## Tools

- Git & GitHub
- VS Code
- Postman

## API Documentation

FastAPI provides interactive API documentation.

Swagger UI:

http://127.0.0.1:8000/docs


ReDoc:

http://127.0.0.1:8000/redoc
