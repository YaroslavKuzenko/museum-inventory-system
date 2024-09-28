# Mirgations
### перебуваючи у папці backend
### Cтворити міграцію: 
```alembic revision --autogenerate -m "name of migration"```

### Оновити базу після міграції
```alembic upgrade (revision id, like b76b19d77dcb) ```   

### Оновити базу до останньої версії
```alembic upgrade head```

# Запуск бекенду
### перебуваючи у папці backend/src
```
python3.10 -m venv venv
source venv/bin/activate
uvicorn main:app --reload
```
### swagger 
http://127.0.0.1:8000/docs