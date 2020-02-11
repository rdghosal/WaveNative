from app import db
from datetime import datetime


class Users(db.Model):
    """Stores user info"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), nullable=False, unique=True)
    password = db.Column(db.String(10), nullable=False) 
    # hashed = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(255), nullable=False)
    queries = db.relationship("UserQueries", backref="user", lazy=True)
    recordings = db.relationship("UserRecordings", backref="user", lazy=True)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username} ...\n queries={self.queries})"


class UserQueries(db.Model):
    """Stores queries for each user as well as URL to wav file"""
    __tablename__ = 'user_queries'
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"Query(query={self.query}, url={self.url}, datetime={self.datetime}, user_id={self.user_id})"
    

class UserRecordings(db.Model):
    """Stores url to """
    __tablename__ = 'user_recordings'
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)
    path = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"Recording(word={self.word}, path={self.path}, datetime={self.datetime}, user_id={self.user_id})"