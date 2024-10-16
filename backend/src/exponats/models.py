from sqlalchemy import Table, Column, Integer, String, Date, Text, ForeignKey, MetaData
from ..locations.models import location

metadata = MetaData()

exponat = Table(
    "exponat",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),  # Назва
    Column("author", String),  # Автор
    Column("created_date", Date),  # Дата створення
    Column("materials", Text),  # Матеріали
    Column("description", Text),  # Опис
    Column("condition", String, nullable=False),  # Стан
    Column("restoration_history", Text),  # Історія реставрацій
    Column("location_id", Integer, ForeignKey(location.c.id)),  # Зовнішній ключ на локацію
)
