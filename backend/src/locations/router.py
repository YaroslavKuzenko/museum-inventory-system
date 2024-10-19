from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, insert, update, delete, func
from sqlalchemy.ext.asyncio import AsyncSession

from auth.base_config import current_user
from auth.base_config import current_superuser
from database import get_async_session
from locations.models import location
from locations.schemas import LocationCreate, LocationUpdate

router = APIRouter(
    prefix="/locations",
    tags=["Location"]
)

@router.get("/all", dependencies=[Depends(current_user)])
async def get_all_locations(session: AsyncSession = Depends(get_async_session)):
    query = select(location)
    result = await session.execute(query)
    locations = result.fetchall()

    # Перетворюємо результат у список словників
    locations_list = [
        {
            "id": loc.id,
            "name": loc.name,
            "address": loc.address,
            "capacity": loc.capacity
        } for loc in locations
    ]
    return locations_list

@router.get("/{location_id}", dependencies=[Depends(current_user)])
async def get_specific_locations(location_id: int, session: AsyncSession = Depends(get_async_session)):
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

@router.post("/", dependencies=[Depends(current_superuser)])
async def add_specific_locations(
        new_location: LocationCreate,
        session: AsyncSession = Depends(get_async_session)
):
    # Знаходимо поточне максимальне значення id
    query = select(func.max(location.c.id))
    result = await session.execute(query)
    max_id = result.scalar() or 0  # Якщо немає записів, max_id буде 0

    # Визначаємо нове значення для id
    new_id = max_id + 1

    # Додаємо новий запис, включаючи визначене значення id
    stmt = insert(location).values(id=new_id, **new_location.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success", "id": new_id}

# Оновлення даних про локацію (доступ тільки для суперкористувачів)
@router.put("/{location_id}", dependencies=[Depends(current_superuser)])
async def update_location(
        location_id: int,
        location_update: LocationUpdate,
        session: AsyncSession = Depends(get_async_session)
):
    query = select(location).where(location.c.id == location_id)
    result = await session.execute(query)
    existing_location = result.fetchone()

    if not existing_location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Location not found")

    stmt = (
        update(location)
        .where(location.c.id == location_id)
        .values(**location_update.dict(exclude_unset=True))
    )
    await session.execute(stmt)
    await session.commit()
    return {"status": "Location updated successfully"}

# Видалення локації (доступ тільки для суперкористувачів)
@router.delete("/{location_id}", dependencies=[Depends(current_superuser)])
async def delete_location(location_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(location).where(location.c.id == location_id)
    result = await session.execute(query)
    existing_location = result.fetchone()

    if not existing_location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Location not found")

    stmt = delete(location).where(location.c.id == location_id)
    await session.execute(stmt)
    await session.commit()
    return {"status": "Location deleted successfully"}