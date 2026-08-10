from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.appointment import Appointment
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.user import User

from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentUpdate,
    AppointmentResponse,
)

from app.auth.dependencies import (
    get_current_user,
    require_roles,
)


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)


# ==========================================================
# CREATE APPOINTMENT
# Patient can book an appointment
# ==========================================================

@router.post(
    "",
    response_model=AppointmentResponse
)
def book_appointment(
    appointment_data: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("patient")
    ),
):

    # ------------------------------------------------------
    # Get current patient
    # ------------------------------------------------------

    patient = (
        db.query(Patient)
        .filter(
            Patient.user_id == current_user.id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found."
        )

    # ------------------------------------------------------
    # Check doctor
    # ------------------------------------------------------

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == appointment_data.doctor_id
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    # ------------------------------------------------------
    # Check doctor availability
    # ------------------------------------------------------

    if not doctor.available:
        raise HTTPException(
            status_code=400,
            detail="Doctor is currently unavailable."
        )

    # ------------------------------------------------------
    # Create appointment
    # ------------------------------------------------------

    new_appointment = Appointment(
        patient_id=patient.id,
        doctor_id=doctor.id,
        appointment_date=appointment_data.appointment_date,
        appointment_time=appointment_data.appointment_time,
        status="scheduled",
        reason=appointment_data.reason,
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    # ------------------------------------------------------
    # Response
    # ------------------------------------------------------

    return {
        "id": new_appointment.id,

        "patient_id": new_appointment.patient_id,
        "doctor_id": new_appointment.doctor_id,

        "patient": current_user.full_name,
        "doctor": doctor.user.full_name,
        "specialization": doctor.specialization,

        "appointment_date": new_appointment.appointment_date,
        "appointment_time": new_appointment.appointment_time,

        "reason": new_appointment.reason,
        "status": new_appointment.status,
    }


# ==========================================================
# GET ALL APPOINTMENTS
#
# Admin  → all appointments
# Doctor → own appointments
# Patient → own appointments
# ==========================================================

@router.get(
    "",
    response_model=list[AppointmentResponse]
)
def get_all_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "admin",
            "doctor",
            "patient"
        )
    ),
):

    # ======================================================
    # ADMIN
    # ======================================================

    if current_user.role == "admin":

        appointments = (
            db.query(Appointment)
            .all()
        )

    # ======================================================
    # DOCTOR
    # ======================================================

    elif current_user.role == "doctor":

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.user_id == current_user.id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        appointments = (
            db.query(Appointment)
            .filter(
                Appointment.doctor_id == doctor.id
            )
            .all()
        )

    # ======================================================
    # PATIENT
    # ======================================================

    else:

        patient = (
            db.query(Patient)
            .filter(
                Patient.user_id == current_user.id
            )
            .first()
        )

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient profile not found."
            )

        appointments = (
            db.query(Appointment)
            .filter(
                Appointment.patient_id == patient.id
            )
            .all()
        )

    # ======================================================
    # CONVERT SQLAlchemy OBJECTS
    # INTO AppointmentResponse
    # ======================================================

    result = []

    for appointment in appointments:

        # --------------------------------------------------
        # Get patient
        # --------------------------------------------------

        patient = (
            db.query(Patient)
            .filter(
                Patient.id == appointment.patient_id
            )
            .first()
        )

        if not patient:
            continue

        # --------------------------------------------------
        # Get doctor
        # --------------------------------------------------

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.id == appointment.doctor_id
            )
            .first()
        )

        if not doctor:
            continue

        # --------------------------------------------------
        # Build response
        # --------------------------------------------------

        result.append(
            AppointmentResponse(
                id=appointment.id,

                patient_id=appointment.patient_id,
                doctor_id=appointment.doctor_id,

                patient=(
                    patient.user.full_name
                    if patient.user
                    else "Unknown Patient"
                ),

                doctor=(
                    doctor.user.full_name
                    if doctor.user
                    else "Unknown Doctor"
                ),

                specialization=doctor.specialization,

                appointment_date=(
                    appointment.appointment_date
                ),

                appointment_time=(
                    appointment.appointment_time
                ),

                reason=appointment.reason,

                status=appointment.status,
            )
        )

    return result


# ==========================================================
# GET APPOINTMENT BY ID
# ==========================================================

@router.get(
    "/{appointment_id}",
    response_model=AppointmentResponse
)
def get_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "admin",
            "doctor",
            "patient"
        )
    ),
):

    # ------------------------------------------------------
    # Find appointment
    # ------------------------------------------------------

    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id
        )
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found."
        )

    # ======================================================
    # ADMIN
    # ======================================================

    if current_user.role == "admin":
        pass

    # ======================================================
    # DOCTOR
    # ======================================================

    elif current_user.role == "doctor":

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.user_id == current_user.id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        if appointment.doctor_id != doctor.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied."
            )

    # ======================================================
    # PATIENT
    # ======================================================

    else:

        patient = (
            db.query(Patient)
            .filter(
                Patient.user_id == current_user.id
            )
            .first()
        )

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient profile not found."
            )

        if appointment.patient_id != patient.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied."
            )

    # ------------------------------------------------------
    # Get patient
    # ------------------------------------------------------

    patient = (
        db.query(Patient)
        .filter(
            Patient.id == appointment.patient_id
        )
        .first()
    )

    # ------------------------------------------------------
    # Get doctor
    # ------------------------------------------------------

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == appointment.doctor_id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found."
        )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    # ------------------------------------------------------
    # Response
    # ------------------------------------------------------

    return {
        "id": appointment.id,

        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,

        "patient": patient.user.full_name,
        "doctor": doctor.user.full_name,
        "specialization": doctor.specialization,

        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,

        "reason": appointment.reason,
        "status": appointment.status,
    }


# ==========================================================
# UPDATE APPOINTMENT
# ==========================================================

@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse
)
def update_appointment(
    appointment_id: int,
    appointment_data: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "admin",
            "doctor",
            "patient"
        )
    ),
):

    # ------------------------------------------------------
    # Find appointment
    # ------------------------------------------------------

    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id
        )
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found."
        )

    # ======================================================
    # ACCESS CONTROL
    # ======================================================

    # ------------------------------------------------------
    # ADMIN
    # ------------------------------------------------------

    if current_user.role == "admin":
        pass

    # ------------------------------------------------------
    # DOCTOR
    # ------------------------------------------------------

    elif current_user.role == "doctor":

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.user_id == current_user.id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        if appointment.doctor_id != doctor.id:
            raise HTTPException(
                status_code=403,
                detail="You cannot update another doctor's appointment."
            )

    # ------------------------------------------------------
    # PATIENT
    # ------------------------------------------------------

    else:

        patient = (
            db.query(Patient)
            .filter(
                Patient.user_id == current_user.id
            )
            .first()
        )

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient profile not found."
            )

        if appointment.patient_id != patient.id:
            raise HTTPException(
                status_code=403,
                detail="You cannot update another patient's appointment."
            )

    # ======================================================
    # UPDATE DOCTOR
    # ======================================================

    if appointment_data.doctor_id is not None:

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.id == appointment_data.doctor_id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor not found."
            )

        if not doctor.available:
            raise HTTPException(
                status_code=400,
                detail="Doctor is currently unavailable."
            )

        appointment.doctor_id = doctor.id

    # ======================================================
    # UPDATE DATE
    # ======================================================

    if appointment_data.appointment_date is not None:

        appointment.appointment_date = (
            appointment_data.appointment_date
        )

    # ======================================================
    # UPDATE TIME
    # ======================================================

    if appointment_data.appointment_time is not None:

        appointment.appointment_time = (
            appointment_data.appointment_time
        )

    # ======================================================
    # UPDATE REASON
    # ======================================================

    if appointment_data.reason is not None:

        appointment.reason = (
            appointment_data.reason
        )

    # ======================================================
    # UPDATE STATUS
    # ======================================================

    if appointment_data.status is not None:

        appointment.status = (
            appointment_data.status
        )

    # ------------------------------------------------------
    # Save changes
    # ------------------------------------------------------

    db.commit()
    db.refresh(appointment)

    # ------------------------------------------------------
    # Get related patient
    # ------------------------------------------------------

    patient = (
        db.query(Patient)
        .filter(
            Patient.id == appointment.patient_id
        )
        .first()
    )

    # ------------------------------------------------------
    # Get related doctor
    # ------------------------------------------------------

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == appointment.doctor_id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found."
        )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    # ======================================================
    # RESPONSE
    # ======================================================

    return {
        "id": appointment.id,

        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,

        "patient": patient.user.full_name,
        "doctor": doctor.user.full_name,
        "specialization": doctor.specialization,

        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,

        "reason": appointment.reason,
        "status": appointment.status,
    }


# ==========================================================
# DELETE APPOINTMENT
# ==========================================================

@router.delete(
    "/{appointment_id}"
)
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    ),
):

    # ------------------------------------------------------
    # Find appointment
    # ------------------------------------------------------

    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id
        )
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found."
        )

    # ------------------------------------------------------
    # Delete
    # ------------------------------------------------------

    db.delete(appointment)
    db.commit()

    return {
        "message": "Appointment deleted successfully."
    }