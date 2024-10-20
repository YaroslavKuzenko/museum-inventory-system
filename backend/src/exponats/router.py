from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, insert, update, delete, func
from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime
from auth.base_config import current_user, current_superuser
from database import get_async_session
from exponats.models import exponat
from exponats.schemas import ExponatCreate, ExponatUpdate

router = APIRouter(
    prefix="/exponats",
    tags=["Exponat"]
)

@router.get("/all", dependencies=[Depends(current_user)])
async def get_all_exponats(session: AsyncSession = Depends(get_async_session)):
    query = select(exponat)
    result = await session.execute(query)
    exponats = result.fetchall()

    # Перетворення результатів у список словників для повернення у форматі JSON
    exponat_list = [
        {
            "id": exp.id,
            "name": exp.name,
            "author": exp.author,
            "created_date": exp.created_date,
            "materials": exp.materials,
            "description": exp.description,
            "condition": exp.condition,
            "restoration_history": exp.restoration_history,
            "location_id": exp.location_id
        } for exp in exponats
    ]
    return exponat_list


# Отримання інформації про експонат за ID (доступ для авторизованих користувачів)
@router.get("/{exponat_id}", dependencies=[Depends(current_user)])
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exponat not found")

# Додавання нового експоната (доступ тільки для суперкористувачів)
@router.post("/", dependencies=[Depends(current_user)])
async def add_specific_exponats(
        new_exponat: ExponatCreate,
        session: AsyncSession = Depends(get_async_session),
):
    # Автоінкрементація id програмно
    query = select(func.max(exponat.c.id))
    result = await session.execute(query)
    max_id = result.scalar() or 0  # Якщо немає записів, max_id буде 0
    new_id = max_id + 1

    # Додаємо новий запис, включаючи визначене значення id
    stmt = insert(exponat).values(id=new_id, **new_exponat.dict())
    await session.execute(stmt)
    await session.commit()
    return {"id": new_id, **new_exponat.dict()}

# Оновлення даних про експонат (доступ тільки для суперкористувачів)
@router.put("/{exponat_id}", dependencies=[Depends(current_user)])
async def update_exponat(
        exponat_id: int,
        exponat_update: ExponatUpdate,
        session: AsyncSession = Depends(get_async_session)
):
    query = select(exponat).where(exponat.c.id == exponat_id)
    result = await session.execute(query)
    existing_exponat = result.fetchone()

    if not existing_exponat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exponat not found")

    # Перевірка та конвертація поля `created_date`
    update_data = exponat_update.dict(exclude_unset=True)
    if 'created_date' in update_data and isinstance(update_data['created_date'], str):
        # Конвертація рядка у форматі 'YYYY-MM-DD' у datetime.date
        update_data['created_date'] = datetime.strptime(update_data['created_date'], '%Y-%m-%d').date()

    # Оновлення експоната
    stmt = (
        update(exponat)
        .where(exponat.c.id == exponat_id)
        .values(**update_data)
    )
    await session.execute(stmt)
    await session.commit()
    return {"status": "Exponat updated successfully"}

# Видалення експоната (доступ тільки для суперкористувачів)
@router.delete("/{exponat_id}", dependencies=[Depends(current_user)])
async def delete_exponat(
        exponat_id: int,
        session: AsyncSession = Depends(get_async_session)
):
    query = select(exponat).where(exponat.c.id == exponat_id)
    result = await session.execute(query)
    existing_exponat = result.fetchone()

    if not existing_exponat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exponat not found")

    # Видалення експоната
    stmt = delete(exponat).where(exponat.c.id == exponat_id)
    await session.execute(stmt)
    await session.commit()
    return {"status": "Exponat deleted successfully"}
