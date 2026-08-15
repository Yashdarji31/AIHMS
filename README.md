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


## Project Structure



## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload

cd frontend

npm install

npm run dev
