from api import db
from api.models.user import User
from werkzeug.security import check_password_hash, generate_password_hash


def check_form_data(form):
    """Takes data used for registration
    and evaluates whether info is original"""
    if form["password"] != form["confirmation"] or \
        db.session.query(User).filter(User.username == form["username"]).count() > 0:
        return False
    print("ok")
    return True


def add_user(form):
    """Adds user to database"""
    # Add new user data
    db.session.add(User(
        username=form["username"], 
        hashed=generate_password_hash(form["password"]),
        age=form["age"],
        country=form["country"]
    ))

    # Commit change to db
    db.session.commit()


def get_user_info(form):
    """Checks login credentials against database"""
    result = db.session.query(User).filter(User.username == form["username"]).first()
    if not result or not check_password_hash(result.hashed, form["password"]):
        return None
    return {
        "id": result.id,
        "username": result.username
    }