import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "e855702e62aef2b63ef28e82208670f596d4f1a177e780069eccdb0301714096")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "b7626156e6ae6c2eadba3b711fad51c9")

    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "root")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "tasks_db")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
