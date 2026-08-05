from typing import Optional
from pydantic import BaseModel


class DoctorCreate(BaseModel):
    specialization: str
    qualification: str
    experience: int
    consultation_fee: float
    available: bool = True


class DoctorUpdate(BaseModel):
    specialization: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[int] = None
    consultation_fee: Optional[float] = None
    available: Optional[bool] = None


from pydantic import BaseModel


class DoctorResponse(BaseModel):
    id: int
    name: str
    email: str
    specialization: str
    qualification: str
    experience: int
    consultation_fee: int
    available: bool

    class Config:
        from_attributes = True