import os
from flask import Blueprint, render_template, send_from_directory

blueprint = Blueprint("static_controller", __name__)

# Return image files
@blueprint.route("/img/<path:filename>")
def serve_img(filename):
    return send_from_directory(os.path.join(os.pardir, "front", "img"), filename)


# Return React front-end regardless of URL
@blueprint.route("/", defaults={"path": "/"})
@blueprint.route("/<path:path>")
def index(path):
    return render_template("index.html")
