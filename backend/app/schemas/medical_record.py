from datetime import datetime

from pydantic import BaseModel


class MedicalRecordCreate(BaseModel):

    appointment_id: int

    symptoms: str

    diagnosis: str

    prescription: str

    notes: str | None = None


class MedicalRecordUpdate(BaseModel):

    symptoms: str | None = None

    diagnosis: str | None = None

    prescription: str | None = None

    notes: str | None = None


class MedicalRecordResponse(BaseModel):

    id: int

    appointment_id: int

    doctor_id: int

    patient_id: int

    symptoms: str

    diagnosis: str

    prescription: str

    notes: str | None

    created_at: datetime

    model_config = {
        "from_attributes": True
    }