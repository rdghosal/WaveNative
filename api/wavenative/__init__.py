import os
from flask import Flask, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from .helpers import login_required, apology

# Set upload path and make upload folder if necessary
UPLOAD_FOLDER = os.path.join(os.pardir, "user_recordings")
if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

# DAO and Session singletons
db = SQLAlchemy()
sess = Session()


# TODO: Edit error handler
def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


def create_app():
    """Configures and returns app instance"""
    app = Flask(__name__, static_folder="../../client/dist", template_folder="../../client/templates")

    import wavenative.controllers as controllers

    # Register blueprints
    app.register_blueprint(controllers.main.blueprint)
    app.register_blueprint(controllers.query.blueprint)
    app.register_blueprint(controllers.user.blueprint)
    app.register_blueprint(controllers.recording.blueprint)

    # For development
    app.config["DEBUG"] = False

    # Configure upload folder path
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    # Ensure templates are auto-reloaded
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Configure session to use filesystem (instead of signed cookies)
    app.config["SESSION_FILE_DIR"] = mkdtemp()
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    sess.init_app(app)

    # SQLAlchemy ORM config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    
    # Configure response headers
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

    # Listen for errors
    for code in default_exceptions:
        app.errorhandler(code)(errorhandler)

    return app