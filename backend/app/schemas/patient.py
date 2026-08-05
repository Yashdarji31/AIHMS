from pydantic import BaseModel, ConfigDict


class PatientCreate(BaseModel):
    age: int
    gender: str
    phone: str
    address: str


class PatientResponse(BaseModel):
    id: int
    user_id: int
    age: int
    gender: str
    phone: str
    address: str
    
    model_config = ConfigDict(from_attributes=True)