from datetime import datetime
from pydantic import BaseModel


# ==============================
# Create Billing
# ==============================

class BillingCreate(BaseModel):

    appointment_id: int

    amount: float

    payment_status: str = "pending"

    payment_method: str | None = None

    description: str | None = None



# ==============================
# Update Billing
# ==============================

class BillingUpdate(BaseModel):

    amount: float | None = None

    payment_status: str | None = None

    payment_method: str | None = None

    description: str | None = None



# ==============================
# Response
# ==============================

class BillingResponse(BaseModel):

    id: int

    appointment_id: int

    patient_id: int

    doctor_id: int

    amount: float

    payment_status: str

    payment_method: str | None

    description: str | None

    created_at: datetime


    model_config = {
        "from_attributes": True
    }