from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.user import User
from app.schemas.patient import PatientCreate


def create_patient(
    db: Session,
    patient_data: PatientCreate,
    current_user: User
):
    existing_patient = (
        db.query(Patient)
        .filter(Patient.user_id == current_user.id)
        .first()
    )

    if existing_patient:
        raise HTTPException(
            status_code=400,
            detail="Patient profile already exists."
        )

    patient = Patient(
        user_id=current_user.id,
        age=patient_data.age,
        gender=patient_data.gender,
        phone=patient_data.phone,
        address=patient_data.address
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient