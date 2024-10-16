# Mirgations
### перебуваючи у папці backend
### Cтворити міграцію: 
```alembic revision --autogenerate -m "name of migration"```

### Оновити базу після міграції
```alembic upgrade (revision id, like b76b19d77dcb) ```   

### Оновити базу до останньої версії
```alembic upgrade head```

# Запуск бекенду
## перебуваючи у папці backend
### створити віртуальне середовище (тільки 1 раз)
```python3.10 -m venv venv ```

### відкрити віртуальне середовище
```source venv/bin/activate```

### перейти у папку src і запусти бек
```uvicorn main:app --reload```
# Swagger 
http://127.0.0.1:8000/docs