from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Billing(Base):

    __tablename__ = "billings"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    appointment_id = Column(
        Integer,
        ForeignKey("appointments.id"),
        nullable=False,
        unique=True
    )


    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=False
    )


    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id"),
        nullable=False
    )


    amount = Column(
        Float,
        nullable=False
    )


    payment_status = Column(
        String(50),
        default="pending"
    )


    payment_method = Column(
        String(50),
        nullable=True
    )


    description = Column(
        String(255),
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    # Relationships

    appointment = relationship(
        "Appointment"
    )


    patient = relationship(
        "Patient"
    )


    doctor = relationship(
        "Doctor"
    )