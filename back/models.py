from flask_sqlalchemy import SQLAlchemy

# Exported isntance
db = SQLAlchemy()

# Table for user info
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    hashed = db.Column(db.String(255))
    age = db.Column(db.Integer)
    country = db.Column(db.String(255))

    def __init__(self, username, hashed, age, country):
        self.username = username
        self.hashed = hashed
        self.age = age
        self.country = country