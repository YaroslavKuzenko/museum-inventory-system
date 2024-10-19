from pydantic import BaseModel
from typing import Optional

class LocationCreate(BaseModel):
    name: str
    address: str
    capacity: int

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    capacity: Optional[int] = None

    class Config:
        orm_mode = True
