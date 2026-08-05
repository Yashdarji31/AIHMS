from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)

    appointment_id = Column(
        Integer,
        ForeignKey("appointments.id"),
        nullable=False
    )

    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id"),
        nullable=False
    )

    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=False
    )

    diagnosis = Column(String(255), nullable=False)

    prescription = Column(Text, nullable=False)

    notes = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    appointment = relationship("Appointment")
    doctor = relationship("Doctor")
    patient = relationship("Patient")