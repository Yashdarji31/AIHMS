from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Date,
    Time,
)

from sqlalchemy.orm import relationship

from app.database.database import Base

class Appointment(Base):
    __tablename__ = "appointments"


    id = Column(
        Integer,
        primary_key=True,
        index=True
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


    appointment_date = Column(
        Date,
        nullable=False
    )

    appointment_time = Column(
        Time,
        nullable=False
    )


    status = Column(
        String,
        default="scheduled"
    )


    reason = Column(
        String,
        nullable=True
    )


    # Relationship with Doctor
    doctor = relationship(
        "Doctor",
        back_populates="appointments"
    )


    # Relationship with Patient
    patient = relationship(
        "Patient",
        back_populates="appointments"
    )
    
    billing = relationship(
    "Billing",
    back_populates="appointment",
    uselist=False,
    cascade="all, delete"
    )