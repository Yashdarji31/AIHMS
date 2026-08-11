from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.billing import Billing
from app.models.appointment import Appointment
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.user import User

from app.schemas.billing import (
    BillingCreate,
    BillingUpdate,
    BillingResponse,
)

from app.auth.dependencies import require_roles


router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)


# ======================================================
# Create Billing
# Admin
# ======================================================

@router.post(
    "",
    response_model=BillingResponse
)
def create_billing(
    billing: BillingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):

    # Find appointment
    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == billing.appointment_id
        )
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found."
        )

    # Prevent duplicate billing
    existing_billing = (
        db.query(Billing)
        .filter(
            Billing.appointment_id
            == appointment.id
        )
        .first()
    )

    if existing_billing:
        raise HTTPException(
            status_code=400,
            detail="Billing already exists for this appointment."
        )

    # Optional: only completed appointments
    if appointment.status != "completed":
        raise HTTPException(
            status_code=400,
            detail="Billing can only be created for completed appointments."
        )

    new_billing = Billing(
        appointment_id=appointment.id,
        patient_id=appointment.patient_id,
        doctor_id=appointment.doctor_id,
        amount=billing.amount,
        payment_status=billing.payment_status,
        payment_method=billing.payment_method,
        description=billing.description,
    )

    db.add(new_billing)

    db.commit()

    db.refresh(new_billing)

    return new_billing


# ======================================================
# Get Billing Records
#
# Admin   → All
# Doctor  → Own
# Patient → Own
# ======================================================

@router.get(
    "",
    response_model=list[BillingResponse]
)
def get_billings(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "admin",
            "doctor",
            "patient"
        )
    )
):

    # --------------------------------------------------
    # Admin
    # --------------------------------------------------

    if current_user.role == "admin":

        return (
            db.query(Billing)
            .all()
        )

    # --------------------------------------------------
    # Doctor
    # --------------------------------------------------

    if current_user.role == "doctor":

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.user_id
                == current_user.id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        return (
            db.query(Billing)
            .filter(
                Billing.doctor_id
                == doctor.id
            )
            .all()
        )

    # --------------------------------------------------
    # Patient
    # --------------------------------------------------

    patient = (
        db.query(Patient)
        .filter(
            Patient.user_id
            == current_user.id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found."
        )

    return (
        db.query(Billing)
        .filter(
            Billing.patient_id
            == patient.id
        )
        .all()
    )


# ======================================================
# Get Billing By ID
#
# Admin   → Any
# Doctor  → Own
# Patient → Own
# ======================================================

@router.get(
    "/{billing_id}",
    response_model=BillingResponse
)
def get_billing(
    billing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "admin",
            "doctor",
            "patient"
        )
    )
):

    billing = (
        db.query(Billing)
        .filter(
            Billing.id == billing_id
        )
        .first()
    )

    if not billing:
        raise HTTPException(
            status_code=404,
            detail="Billing record not found."
        )

    # --------------------------------------------------
    # Admin
    # --------------------------------------------------

    if current_user.role == "admin":
        return billing

    # --------------------------------------------------
    # Doctor
    # --------------------------------------------------

    if current_user.role == "doctor":

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.user_id
                == current_user.id
            )
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found."
            )

        if billing.doctor_id != doctor.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied."
            )

        return billing

    # --------------------------------------------------
    # Patient
    # --------------------------------------------------

    patient = (
        db.query(Patient)
        .filter(
            Patient.user_id
            == current_user.id
        )
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found."
        )

    if billing.patient_id != patient.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied."
        )

    return billing


# ======================================================
# Update Billing
# Admin Only
# ======================================================

@router.put(
    "/{billing_id}",
    response_model=BillingResponse
)
def update_billing(
    billing_id: int,
    billing_data: BillingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):

    billing = (
        db.query(Billing)
        .filter(
            Billing.id == billing_id
        )
        .first()
    )

    if not billing:
        raise HTTPException(
            status_code=404,
            detail="Billing record not found."
        )

    if billing_data.amount is not None:
        billing.amount = billing_data.amount

    if billing_data.payment_status is not None:
        billing.payment_status = (
            billing_data.payment_status
        )

    if billing_data.payment_method is not None:
        billing.payment_method = (
            billing_data.payment_method
        )

    if billing_data.description is not None:
        billing.description = (
            billing_data.description
        )

    db.commit()

    db.refresh(billing)

    return billing


# ======================================================
# Delete Billing
# Admin Only
# ======================================================

@router.delete(
    "/{billing_id}"
)
def delete_billing(
    billing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):

    billing = (
        db.query(Billing)
        .filter(
            Billing.id == billing_id
        )
        .first()
    )

    if not billing:
        raise HTTPException(
            status_code=404,
            detail="Billing record not found."
        )

    db.delete(billing)

    db.commit()

    return {
        "message":
        "Billing deleted successfully."
    }