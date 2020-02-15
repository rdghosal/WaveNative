from api import db
from datetime import datetime


class UserRecording(db.Model):
    """Stores url to """
    __tablename__ = 'user_recordings'
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)
    path = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"Recording(word={self.word}, path={self.path}, datetime={self.datetime}, user_id={self.user_id})"