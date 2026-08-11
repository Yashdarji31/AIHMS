from sqlalchemy.orm import relationship

from app.database.database import Base

from sqlalchemy import Column, Integer, String, ForeignKey

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    age = Column(Integer, nullable=False)

    gender = Column(String(20), nullable=False)

    phone = Column(String(20), nullable=False)

    address = Column(String(255), nullable=False)

    user = relationship("User", back_populates="patient")

    appointments = relationship(
    "Appointment",
    back_populates="patient",
    cascade="all, delete"
)

    medical_records = relationship(
        "MedicalRecord",
        back_populates="patient",
        cascade="all, delete-orphan"
    )
    
    billings = relationship(
    "Billing",
    back_populates="patient",
    cascade="all, delete-orphan"
    )