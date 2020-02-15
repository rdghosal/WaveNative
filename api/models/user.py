from datetime import datetime
from api import db
from api.models import user_query, user_recording

class User(db.Model):
    """Stores user info"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    registration_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    username = db.Column(db.String(15), nullable=False, unique=True)
    hashed = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(255), nullable=False)
    queries = db.relationship("UserQuery", backref="user", lazy=True)
    recordings = db.relationship("UserRecording", backref="user", lazy=True)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username} ...\n queries={self.queries})"
