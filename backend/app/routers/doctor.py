from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user import User
from app.models.doctor import Doctor

from app.schemas.doctor import (
    DoctorCreate,
    DoctorUpdate,
    DoctorResponse,
)

from app.auth.dependencies import (
    require_roles,
)

from typing import List

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"]
)


@router.post("", response_model=DoctorResponse)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("doctor")),
):
    existing_doctor = (
        db.query(Doctor)
        .filter(Doctor.user_id == current_user.id)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=400,
            detail="Doctor profile already exists."
        )

    new_doctor = Doctor(
        user_id=current_user.id,
        specialization=doctor.specialization,
        qualification=doctor.qualification,
        experience=doctor.experience,
        consultation_fee=doctor.consultation_fee,
        available=doctor.available,
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


@router.get("/me", response_model=DoctorResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("doctor")),
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.user_id == current_user.id)
        .first()
    )

    if doctor is None:
        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found."
        )

    return doctor

@router.get("", response_model=List[DoctorResponse])
def get_all_doctors(
    db: Session = Depends(get_db),
):

    doctors = db.query(Doctor).all()

    result = []

    for doctor in doctors:
        result.append(
            {
                "id": doctor.id,
                "name": doctor.user.full_name,
                "email": doctor.user.email,
                "specialization": doctor.specialization,
                "qualification": doctor.qualification,
                "experience": doctor.experience,
                "consultation_fee": doctor.consultation_fee,
                "available": doctor.available,
            }
        )

    return result


@router.get("/{doctor_id}", response_model=DoctorResponse)
def get_doctor_by_id(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if doctor is None:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    return doctor

@router.get("")
def get_all_doctors(
    db: Session = Depends(get_db),
):

    doctors = db.query(Doctor).all()

    return doctors  