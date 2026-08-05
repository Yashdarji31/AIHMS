from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routers.auth import router as auth_router
from app.routers.patient import router as patient_router
from app.routers import doctor
from app.routers import appointment
from app.routers import medical_record

# Import all models before create_all()
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hospital Management System"
)

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------

app.include_router(auth_router)
app.include_router(patient_router)
app.include_router(doctor.router)
app.include_router(appointment.router)
app.include_router(medical_record.router)

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Hospital Management System Backend Running 🚀"
    }