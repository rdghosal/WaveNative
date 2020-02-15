from datetime import datetime
from api import db
from api.models.user_query import UserQuery


class Query(db.Model):
    __tablename__= 'queries'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    word = db.Column(db.String(255), nullable=False, unique=True)
    url = db.Column(db.String(255), nullable=False, unique=True)
    user_queries = db.relationship("UserQuery", backref='users', lazy=True)

    def __repr__(self):
        return f"Query(word={self.word})"