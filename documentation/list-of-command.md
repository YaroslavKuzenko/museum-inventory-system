# Mirgations
### Cтворити міграцію: 
alembic revision --autogenerate -m "name of migration"

### Оновити базу після міграції
alembic upgrade (revision id, like b76b19d77dcb)    

### Оновити базу до останньої версії
alembic upgrade head

# Запуск бекенду
### перебуваючи у папці backend
uvicorn main:app --reload