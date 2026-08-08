from pydantic import BaseModel, EmailStr


from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    doctor = "doctor"
    patient = "patient"


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    confirm_password: str
    role: UserRole


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str