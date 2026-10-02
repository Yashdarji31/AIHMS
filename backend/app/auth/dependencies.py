from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.config import SECRET_KEY, ALGORITHM
from app.database.database import get_db
from app.models.user import User


# ============================================================
# OAUTH2
# ============================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


# ============================================================
# GET CURRENT USER
# ============================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        user_id = int(user_id)

    except (JWTError, ValueError, TypeError):

        raise credentials_exception

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise credentials_exception

    return user


# ============================================================
# REQUIRE ROLES
# ============================================================

def require_roles(*allowed_roles: str) -> Callable:

    def role_checker(
        current_user: User = Depends(get_current_user),
    ):

        # Get role safely
        user_role = getattr(
            current_user,
            "role",
            None
        )

        # Normalize role
        if isinstance(user_role, str):
            user_role = user_role.lower()

        allowed = {
            role.lower()
            for role in allowed_roles
        }

        if user_role not in allowed:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )

        return current_user

    return role_checker
<<<<<<< HEAD
=======


# ============================================================
# DATABASE DEPENDENCY EXPORT
# ============================================================

__all__ = [
    "oauth2_scheme",
    "get_current_user",
    "require_roles",
    "get_db",
]
>>>>>>> e7baa77 (prepare AIHMS for deployment)
