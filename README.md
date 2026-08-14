# AIHMS - AI Hospital Management System

## Overview

AIHMS is a full-stack hospital management system designed to digitize hospital operations including:

- Patient management
- Doctor management
- Appointment scheduling
- Medical records
- Billing and invoice generation
- Analytics dashboard


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

### Other
- ReportLab PDF generation
- REST APIs


## Features

### Authentication
- JWT based login
- Role based access control

Roles:
- Admin
- Doctor
- Patient


### Appointment Management

- Create appointments
- Update appointments
- Track status


### Medical Records

Doctors can:
- Create records
- Update records

Patients can:
- View medical history


### Billing

Admin can:
- Create bills
- Update bills
- Delete bills
- Generate invoice PDFs


### Analytics Dashboard

Provides:

- Total patients
- Doctors count
- Revenue tracking
- Appointment statistics


## Project Structure

AIHMS

backend/
- app/
  - routers/
  - models/
  - schemas/
  - services/


frontend/
- src/
  - components/
  - routes/
  - lib/


## Installation


Backend:

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
