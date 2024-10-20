from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from auth.base_config import auth_backend, fastapi_users
from auth.schemas import UserRead, UserCreate
from auth.models import User

from locations.router import router as router_locations
from exponats.router import router as router_exponats

app = FastAPI(
    title="Museum Inventory System"
)
@app.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(fastapi_users.current_user())):
    return current_user

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

app.include_router(router_locations)
app.include_router(router_exponats)
