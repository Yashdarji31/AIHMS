from datetime import date, time
from typing import Optional
from pydantic import BaseModel


class AppointmentCreate(BaseModel):
    doctor_id: int
    appointment_date: date
    appointment_time: time
    reason: str


class AppointmentUpdate(BaseModel):
    doctor_id: Optional[int] = None
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    reason: Optional[str] = None
    status: Optional[str] = None


class AppointmentResponse(BaseModel):
    id: int

    patient: str

    doctor: str

    doctor_id: int

    specialization: str

    appointment_date: date

    appointment_time: time

    reason: str

    status: str

    class Config:
        from_attributes = True