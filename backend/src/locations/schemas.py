from pydantic import BaseModel


class LocationCreate(BaseModel):
    id: int
    name: str
    address: str
    capacity: int