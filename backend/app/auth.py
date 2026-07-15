import uuid

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient

from app.config import settings

security = HTTPBearer()
jwk_client = PyJWKClient(settings.supabase_jwks_url)

def get_current_user_id(
        credentials: HTTPAuthorizationCredentials = Depends(security)
) -> uuid.UUID:
    token = credentials.credentials
    try:
        signing_key = jwk_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["ES256"],
            audience="authenticated"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    return uuid.UUID(payload["sub"])