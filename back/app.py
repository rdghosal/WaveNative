import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import scoped_session, sessionmaker
import user_service, search_controller
from flask import Flask, session, render_template, send_from_directory, request, jsonify, redirect
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from helpers import login_required, apology

# Configure application
app = Flask(__name__, static_folder="../front/dist", template_folder="../front/templates")

# Register blueprint
app.register_blueprint(search_controller.blueprint)

# For development
app.config["DEBUG"] = True

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# SQLAlchemy ORM config
app.config["SQLALCHEMY_DATABASE_URI"] = ''
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initalize database and set Users table
db = SQLAlchemy(app)

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


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Return image files
@app.route("/img/<path:filename>")
def serve_img(filename):
    return send_from_directory(os.path.join(os.pardir, "front", "img"), filename)


# Return React front-end regardless of URL
@app.route("/", defaults={"path": "/"})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")


@app.route("/api/register", methods=["POST"])
def register():
    # Verify form data
    if not user_service.check_form_data(request.form, db, Users):
        return jsonify(""), 400
    
    # Add to database
    user_service.add_user(request.form, db, Users) 
    return jsonify(""), 201


# User login
@app.route("/login", methods=["POST"])
def login():
    """Log user in"""
    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    # Get user input
    result = user_service.get_user_id(request.form, db, Users)
    if not result:
        return jsonify(""), 403

    # Remember session and return 200
    session["user_id"] = result
    return jsonify(""), 200


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


# TODO: Edit error handler
def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)

# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)


if __name__ == "__main__":
    app.run(debug=True)