from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ExponatCreate(BaseModel):
    name: str
    author: str
    created_date: datetime
    materials: str
    description: str
    condition: str
    restoration_history: str
    location_id: int

class ExponatUpdate(BaseModel):
    name: Optional[str] = None
    author: Optional[str] = None
    created_date: Optional[str] = None
    materials: Optional[str] = None
    description: Optional[str] = None
    condition: Optional[str] = None
    restoration_history: Optional[str] = None
    location_id: Optional[int] = None

    class Config:
        orm_mode = True