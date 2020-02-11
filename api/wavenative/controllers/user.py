import wavenative.services as services
from flask import Blueprint, request, redirect, session, jsonify, make_response
from flask_login import LoginManager


blueprint = Blueprint(name="user_controller", import_name=__name__)
login_manager = LoginManager()

# User registration
@blueprint.route("/api/register", methods=["POST"])
def register():
    # Verify form data
    if not services.user.check_form_data(request.form):
        return jsonify(""), 400
    
    # Add to database
    services.user.add_user(request.form) 
    return jsonify(""), 201


# User login
@blueprint.route("/api/login", methods=["POST"])
def login():
    """Log user in"""
    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    # Get user input
    result = services.user.get_user_id(request.form)
    if not result:
        return jsonify(""), 403

    # Remember session and return 200
    session["user_id"] = result
    return jsonify(""), 200


@blueprint.route("/api/guest")
def guest_login():
    session["user_id"] = 0
    return make_response(jsonify("Logged in as guest"), 200)


# Destory user session upon logout
@blueprint.route("/api/logout")
def logout():
    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

