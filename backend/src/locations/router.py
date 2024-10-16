from fastapi import APIRouter, Depends
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_session
from locations.models import location
# from locations.schemas import OperationCreate

router = APIRouter(
    prefix="/locations",
    tags=["Location"]
)


@router.get("/")
async def get_specific_operations(location_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(location).where(location.c.id == location_id)
    result = await session.execute(query)
    location_data = result.fetchone()  # Використовуємо fetchone, якщо очікуємо один результат

    if location_data:
        location_dict = {
            "id": location_data.id,
            "name": location_data.name,
            "address": location_data.address,
            "capacity": location_data.capacity
        }
        return location_dict
    else:
        return {"error": "Location not found"}



#TODO: add post request for creating location

# @router.post("/")
# async def add_specific_operations(new_location: OperationCreate, session: AsyncSession = Depends(get_async_session)):
#     stmt = insert(location).values(**new_location.dict())
#     await session.execute(stmt)
#     await session.commit()
#     return {"status": "success"}