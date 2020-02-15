from api import db
from datetime import datetime


class UserQuery(db.Model):
    """Stores queries for each user as well as URL to wav file"""
    __tablename__ = 'user_queries'
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    query_id = db.Column(db.Integer, db.ForeignKey("queries.id"), nullable=False)

    def __repr__(self):
        return f"UserQuery(datetime={self.datetime}, query_id={self.query_id}, user_id={self.user_id})"