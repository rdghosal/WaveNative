import user_service
import models
from flask import Blueprint, request, redirect, session, jsonify
from flask_login import LoginManager
from app import db


blueprint = Blueprint(name="user_controller", import_name=__name__,  template_folder="../front/templates")
login_manager = LoginManager()

# User registration
@blueprint.route("/api/register", methods=["POST"])
def register():
    # Verify form data
    if not user_service.check_form_data(request.form, db, models.Users):
        return jsonify(""), 400
    
    # Add to database
    user_service.add_user(request.form, db, models.Users) 
    return jsonify(""), 201


# User login
@blueprint.route("/login", methods=["POST"])
def login():
    """Log user in"""
    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    # Get user input
    result = user_service.get_user_id(request.form, db, models.Users)
    if not result:
        return jsonify(""), 403

    # Remember session and return 200
    session["user_id"] = result
    return jsonify(""), 200


# Destory user session upon logout
@blueprint.route("/logout")
def logout():
    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

