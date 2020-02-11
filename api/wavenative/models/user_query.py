from wavenative import db
from datetime import datetime


class UserQuery(db.Model):
    """Stores queries for each user as well as URL to wav file"""
    __tablename__ = 'user_queries'
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"Query(query={self.query}, url={self.url}, datetime={self.datetime}, user_id={self.user_id})"