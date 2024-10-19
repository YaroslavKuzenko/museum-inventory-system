from fastapi import APIRouter, Depends
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from auth.base_config import current_user
from database import get_async_session
from exponats.models import exponat
from exponats.schemas import ExponatCreate

router = APIRouter(
    prefix="/exponats",
    tags=["Exponat"]
)


@router.get("/", dependencies=[Depends(current_user)])
async def get_specific_exponats(
        exponat_id: int,
        session: AsyncSession = Depends(get_async_session),
):
    query = select(exponat).where(exponat.c.id == exponat_id)
    result = await session.execute(query)
    exponat_data = result.fetchone()  # Використовуємо fetchone, якщо очікуємо один результат

    if exponat_data:
        exponat_dict = {
            "id": exponat_data.id,
            "name": exponat_data.name,
            "author": exponat_data.author,
            "created_date": exponat_data.created_date,
            "materials": exponat_data.materials,
            "description": exponat_data.description,
            "condition": exponat_data.condition,
            "restoration_history": exponat_data.restoration_history,
            "location_id": exponat_data.location_id
        }
        return exponat_dict
    else:
        return {"error": "exponat not found"}


@router.post("/", dependencies=[Depends(current_user)])
async def add_specific_exponats(
        new_Exponat: ExponatCreate,
        session: AsyncSession = Depends(get_async_session),
):
    stmt = insert(exponat).values(**new_Exponat.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}