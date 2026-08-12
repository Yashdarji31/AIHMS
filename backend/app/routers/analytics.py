from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from sqlalchemy import func

from app.database.database import get_db

from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.appointment import Appointment
from app.models.billing import Billing

from app.models.user import User

from app.auth.dependencies import require_roles


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("")
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):

    # Total patients

    total_patients = (
        db.query(
            func.count(Patient.id)
        )
        .scalar()
    )


    # Total doctors

    total_doctors = (
        db.query(
            func.count(Doctor.id)
        )
        .scalar()
    )


    # Total appointments

    total_appointments = (
        db.query(
            func.count(Appointment.id)
        )
        .scalar()
    )


    # Completed appointments

    completed_appointments = (
        db.query(
            func.count(Appointment.id)
        )
        .filter(
            Appointment.status == "completed"
        )
        .scalar()
    )


    # Revenue

    total_revenue = (
        db.query(
            func.sum(Billing.amount)
        )
        .scalar()
        or 0
    )


    return {

    "kpis": {

        "totalPatients": total_patients,

        "doctors": total_doctors,

        "revenueMTD": total_revenue,

        "appointments": total_appointments,

        "completedAppointments": completed_appointments,

        "admissions": 0,

        "discharges": 0,

        "avgWaitMin": 0,

        "bedsAvailable": 0,

        "medicinesInStock": 0
    },


    "monthlyRevenue": [],


    "diseaseDistribution": [],


    "dailyPatients": [],


    "bedOccupancy": [],


    "healthTrend": []

}