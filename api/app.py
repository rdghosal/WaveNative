# from sqlalchemy import create_engine
# from sqlalchemy.orm import scoped_session, sessionmaker
import models
import user_controller, search_controller, static_controller
from flask import Flask, session, redirect
from flask_session import Session
from flask_login import LoginManager
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from helpers import login_required, apology


# Config variables
login_manager = LoginManager()
sess = Session()


# TODO: Edit error handler
def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


def create_app():
    """Configures and returns app instance"""
    app = Flask(__name__, static_folder="../client/dist", template_folder="../client/templates")

    # Register blueprint
    app.register_blueprint(static_controller.blueprint)
    app.register_blueprint(search_controller.blueprint)
    app.register_blueprint(user_controller.blueprint)

    # For development
    app.config["DEBUG"] = True

    # Ensure templates are auto-reloaded
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Configure session to use filesystem (instead of signed cookies)
    app.config["SESSION_FILE_DIR"] = mkdtemp()
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    sess.init_app(app)

    # Login configuration
    login_manager.init_app(app)

    # SQLAlchemy ORM config
    app.config["SQLALCHEMY_DATABASE_URI"] = ''
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    models.db.init_app(app)

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


if __name__ == "__main__":
    # Create app and run
    app = create_app()
    app.run(debug=True)