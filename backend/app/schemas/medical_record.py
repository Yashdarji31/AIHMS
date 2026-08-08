from datetime import datetime

from pydantic import BaseModel


class MedicalRecordCreate(BaseModel):
    appointment_id: int
    diagnosis: str
    prescription: str
    notes: str


class MedicalRecordUpdate(BaseModel):
    diagnosis: str | None = None
    prescription: str | None = None
    notes: str | None = None


class MedicalRecordResponse(BaseModel):
    id: int

    appointment_id: int

    doctor_id: int

    patient_id: int

    diagnosis: str

    prescription: str

    notes: str

    created_at: datetime

    model_config = {
        "from_attributes": True
    }