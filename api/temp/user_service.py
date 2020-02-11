from werkzeug.security import check_password_hash, generate_password_hash


def check_form_data(form, db, users_table):
    """Takes data used for registration
    and evaluates whether info is original"""
    if form["password"] != form["confirmation"] or \
        db.session.query(users_table).filter(users_table.username == form["username"]).count() > 0:
        return False
    return True

def add_user(form, db, users_table):
    """Adds user to database"""
    # Add new user data
    db.session.add(users_table(
        username=form["username"], 
        hashed=generate_password_hash(form["password"]),
        age=form["age"],
        country=form["country"]
    ))

    # Commit change to db
    db.session.commit()


def get_user_id(form, db, users_table):
    """Checks login credentials against database"""
    result = db.session.query(users_table).filter(users_table.username == form["username"]).first()
    if not result or not check_password_hash(result.hashed, form["password"]):
        return None
    return result.id