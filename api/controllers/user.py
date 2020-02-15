import api.services as services
from flask import Blueprint, request, redirect, session, jsonify, make_response


blueprint = Blueprint(name="user_controller", import_name=__name__)

@blueprint.route("/api/register", methods=["POST"])
def register():
    """User registration"""
    # Verify form data
    if not services.user.check_form_data(request.form):
        return jsonify(""), 400
    
    # Add to database
    services.user.add_user(request.form)

    # Fetch new user info and cache id into session
    user_info = services.user.get_user_info(request.form)
    session["user_id"] = user_info.get("id")

    return make_response(jsonify(user_info), 201)


@blueprint.route("/api/login", methods=["POST"])
def login():
    """Log user in"""
    # Forget any user_id
    session.clear()

    # Get form data 
    user_info = services.user.get_user_info(request.form)
    if not user_info:
        return jsonify("Incorrect username or password"), 403

    # Remember session and return 200
    session["user_id"] = user_info.get("id")
    return make_response(jsonify(user_info), 200)


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
    return make_response(jsonify("Successfully logged out user"), 200)