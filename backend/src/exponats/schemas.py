from pydantic import BaseModel
from datetime import datetime


class ExponatCreate(BaseModel):
    id: int
    name: str
    author: str
    created_date: datetime
    materials: str
    description: str
    condition: str
    restoration_history: str
    location_id: int