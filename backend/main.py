from fastapi import FastAPI
import os 
from sqlalchemy import create_engine, text


app = FastAPI()

database_url = os.getenv("DATABASE_URL", "")

database_url = database_url.replace(
    "postgresql://", "postgresql+psycopg://", 1
)

engine = create_engine(database_url)

@app.get("/")
def home():
    return {"message": "Hello Print{\"World\"}!"}

@app.get("/db-test")
def test_database():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"message": "PostgreSQL działa!"}