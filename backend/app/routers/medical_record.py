from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.medical_record import MedicalRecord
from app.models.appointment import Appointment
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.user import User

from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordUpdate,
    MedicalRecordResponse,
)

from app.auth.dependencies import require_roles

router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"]
)


# ======================================================
# Create Medical Record (Doctor)
# ======================================================

@router.post("", response_model=MedicalRecordResponse)
def create_medical_record(
    record: MedicalRecordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("doctor"))
):

    doctor = db.query(Doctor).filter(
        Doctor.user_id == current_user.id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found."
        )

    appointment = db.query(Appointment).filter(
        Appointment.id == record.appointment_id
    ).first()

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found."
        )

    if appointment.doctor_id != doctor.id:
        raise HTTPException(
            status_code=403,
            detail="You can only create records for your own patients."
        )

    # Optional (recommended)
    if hasattr(appointment, "status"):
        if appointment.status != "completed":
            raise HTTPException(
                status_code=400,
                detail="Appointment is not completed yet."
            )

    # Prevent duplicate medical record
    existing_record = db.query(MedicalRecord).filter(
        MedicalRecord.appointment_id == appointment.id
    ).first()

    if existing_record:
        raise HTTPException(
            status_code=400,
            detail="Medical record already exists for this appointment."
        )

    new_record = MedicalRecord(
        appointment_id=appointment.id,
        doctor_id=doctor.id,
        patient_id=appointment.patient_id,
        diagnosis=record.diagnosis,
        prescription=record.prescription,
        notes=record.notes,
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


# ======================================================
# Patient - View Own Medical Records
# ======================================================

@router.get("/me", response_model=list[MedicalRecordResponse])
def get_my_medical_records(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("patient"))
):

    patient = db.query(Patient).filter(
        Patient.user_id == current_user.id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found."
        )

    records = db.query(MedicalRecord).filter(
        MedicalRecord.patient_id == patient.id
    ).all()

    return records


# ======================================================
# Get Medical Record by ID
# ======================================================

@router.get("/{record_id}", response_model=MedicalRecordResponse)
def get_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "doctor", "patient"))
):

    record = db.query(MedicalRecord).filter(
        MedicalRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found."
        )

    # -----------------------------
    # Admin can access everything
    # -----------------------------
    if current_user.role == "admin":
        return record

    # -----------------------------
    # Doctor access
    # -----------------------------
    if current_user.role == "doctor":

        doctor = db.query(Doctor).filter(
            Doctor.user_id == current_user.id
        ).first()

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        if record.doctor_id != doctor.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied."
            )

        return record

    # -----------------------------
    # Patient access
    # -----------------------------
    patient = db.query(Patient).filter(
        Patient.user_id == current_user.id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found."
        )

    if record.patient_id != patient.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied."
        )

    return record


# ======================================================
# Update Medical Record
# ======================================================

@router.put("/{record_id}", response_model=MedicalRecordResponse)
def update_medical_record(
    record_id: int,
    record_data: MedicalRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("doctor"))
):

    doctor = db.query(Doctor).filter(
        Doctor.user_id == current_user.id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found."
        )

    record = db.query(MedicalRecord).filter(
        MedicalRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found."
        )

    if record.doctor_id != doctor.id:
        raise HTTPException(
            status_code=403,
            detail="You cannot edit another doctor's medical record."
        )

    if record_data.diagnosis is not None:
        record.diagnosis = record_data.diagnosis

    if record_data.prescription is not None:
        record.prescription = record_data.prescription

    if record_data.notes is not None:
        record.notes = record_data.notes

    db.commit()
    db.refresh(record)

    return record


# ======================================================
# Delete Medical Record
# ======================================================

@router.delete("/{record_id}")
def delete_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin"))
):

    record = db.query(MedicalRecord).filter(
        MedicalRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found."
        )

    db.delete(record)
    db.commit()

    return {
        "message": "Medical record deleted successfully."
    }