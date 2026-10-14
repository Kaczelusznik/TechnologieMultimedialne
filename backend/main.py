from fastapi import FastAPI
import os 
from sqlalchemy import create_engine, text

from fastapi import HTTPException
from pydantic import BaseModel
from pwdlib import PasswordHash
from sqlalchemy.exc import IntegrityError

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

hash = PasswordHash.recommended()

class UserRegistration(BaseModel):
    login: str
    password: str

@app.post("/register")
def register_user(user: UserRegistration):
    hashed_password = hash.hash(user.password)

    try:
        with engine.begin() as connection:
            connection.execute(
                text("""
                    INSERT INTO users (login, password_hash)
                    VALUES (:login, :password)
                """),
                {"login": user.login, "password": hashed_password}
            )

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="Użytkownik o podanym loginie już istnieje."
        )

    return {"message": "Rejestracja zakończona sukcesem!"}

@app.post("/login")
def login_user(user: UserRegistration):
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT password_hash FROM users WHERE login = :login"),
            {"login": user.login}
        ).first()

    if not result or not hash.verify(user.password, result[0]):
        raise HTTPException(
            status_code=401,
            detail="Nieprawidłowy login lub hasło"
        )

    return {"message": "Dane logowania poprawne!"}