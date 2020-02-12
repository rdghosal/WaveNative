import wavenative.services as services
from flask import Blueprint, request, redirect, session, jsonify, make_response
from flask_login import LoginManager


blueprint = Blueprint(name="user_controller", import_name=__name__)
login_manager = LoginManager()

@blueprint.route("/api/register", methods=["POST"])
def register():
    """User registration"""
    # Verify form data
    if not services.user.check_form_data(request.form):
        return jsonify(""), 400
    
    # Add to database
    services.user.add_user(request.form) 
    return jsonify(""), 201


@blueprint.route("/api/login", methods=["POST"])
def login():
    """Log user in"""
    # Forget any user_id
    session.clear()

    # Get form data 
    result = services.user.get_user_id(request.form)
    if not result:
        return jsonify("Incorrect username or password"), 403

    # Remember session and return 200
    session["user_id"] = result
    return make_response(jsonify({ "userId": result }), 200)


@blueprint.route("/api/guest")
def guest_login():
    """Lets user log in as guest"""
    session["user_id"] = 0
    return make_response(jsonify("Logged in as guest"), 200)


@blueprint.route("/api/logout")
def logout():
    """Destroy user session upon logout"""
    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

