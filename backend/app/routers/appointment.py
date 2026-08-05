from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import require_roles
from app.models.user import User
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.appointment import Appointment

from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentUpdate,
    AppointmentResponse,
)

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)


# ==========================
# Book Appointment
# ==========================
@router.post(
    "",
    response_model=AppointmentResponse,
)
def book_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("patient")),
):
    patient = (
        db.query(Patient)
        .filter(Patient.user_id == current_user.id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found",
        )

    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == appointment.doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found",
        )

    new_appointment = Appointment(
        patient_id=patient.id,
        doctor_id=doctor.id,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
        reason=appointment.reason,
        status="scheduled",
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {
        "id": new_appointment.id,
        "patient": new_appointment.patient.user.full_name,
        "doctor": new_appointment.doctor.user.full_name,
        "specialization": new_appointment.doctor.specialization,
        "appointment_date": new_appointment.appointment_date,
        "appointment_time": new_appointment.appointment_time,
        "reason": new_appointment.reason,
        "status": new_appointment.status,
    }


# ==========================
# Get All Appointments
# ==========================
@router.get(
    "",
    response_model=list[AppointmentResponse],
)
def get_all_appointments(
    db: Session = Depends(get_db),
):
    appointments = db.query(Appointment).all()

    result = []

    for appointment in appointments:
        result.append(
            {
                "id": appointment.id,
                "patient": appointment.patient.user.full_name,
                "doctor": appointment.doctor.user.full_name,
                "specialization": appointment.doctor.specialization,
                "appointment_date": appointment.appointment_date,
                "appointment_time": appointment.appointment_time,
                "reason": appointment.reason,
                "status": appointment.status,
            }
        )

    return result


# ==========================
# Update Appointment
# ==========================
@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
def update_appointment(
    appointment_id: int,
    appointment_update: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    appointment = (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found",
        )

    update_data = appointment_update.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(appointment, key, value)

    db.commit()
    db.refresh(appointment)

    return {
        "id": appointment.id,
        "patient": appointment.patient.user.full_name,
        "doctor": appointment.doctor.user.full_name,
        "specialization": appointment.doctor.specialization,
        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,
        "reason": appointment.reason,
        "status": appointment.status,
    }


# ==========================
# Delete Appointment
# ==========================
@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    appointment = (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found",
        )

    db.delete(appointment)
    db.commit()

    return {
        "message": "Appointment deleted successfully"
    }