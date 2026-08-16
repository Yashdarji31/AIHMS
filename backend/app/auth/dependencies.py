import token

from jose import JWTError, jwt

from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user import User

from app.auth.jwt_handler import (
    SECRET_KEY,
    ALGORITHM,
)


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    try:
        print("TOKEN RECEIVED:", token)

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("PAYLOAD:", payload)

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        user = (
            db.query(User)
            .filter(User.id == int(user_id))
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )

        return user

    except JWTError as e:
        print("JWT ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )



def require_roles(*allowed_roles):

    def role_checker(
        current_user: User = Depends(get_current_user)
    ):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to access this resource."
            )

        return current_user

    return role_checker