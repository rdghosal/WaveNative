import os
from flask import Blueprint, render_template, send_from_directory

blueprint = Blueprint("static_controller", __name__)

@blueprint.route("/img/<path:filename>")
def serve_img(filename):
    """Return image files"""
    return send_from_directory(os.path.join(os.pardir, "client", "img"), filename)


@blueprint.route("/", defaults={"path": "/"})
@blueprint.route("/<path:path>")
def index(path):
    """Return React front-end regardless of URL"""
    return render_template("index.html")
