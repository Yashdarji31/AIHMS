from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    specialization = Column(
        String,
        nullable=False
    )

    qualification = Column(
        String,
        nullable=False
    )

    experience = Column(
        Integer,
        nullable=False
    )

    consultation_fee = Column(
        Float,
        nullable=False
    )

    available = Column(
        Boolean,
        default=True
    )


    # Relationship with User
    user = relationship(
        "User",
        back_populates="doctor"
    )


    # Relationship with Appointment
    appointments = relationship(
        "Appointment",
        back_populates="doctor",
        cascade="all, delete"
    )
    
    billings = relationship(
    "Billing",
    back_populates="doctor",
    cascade="all, delete-orphan"
    )