from sqlalchemy import Table, Column, Integer, String, MetaData

metadata = MetaData()

location = Table(
    "location",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),  # Назва
    Column("address", String, nullable=False),  # Місцезнаходження
    Column("capacity", Integer, nullable=False),  # Місткість
)
