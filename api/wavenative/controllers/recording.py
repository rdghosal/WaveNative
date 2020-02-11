from flask import Blueprint, request, make_response, jsonify
import wavenative.services as services


blueprint = Blueprint("recording_controller", __name__)

@blueprint.route("/api/upload", methods=["POST"])
def upload():
    """Saves uploaded uploaded recordings to database"""
    json = request.get_json()

    # Parse JSON
    word = json["word"]
    file_data = json["file"]

    # Save recording to database
    services.recording.add_user_recording(file_data, word)    
    
    return make_response(jsonify("Added recording to database"), 201)


@blueprint.route("/api/recording/<path:user_id>")
def get_user_recordings(user_id):
    """Query database for user audio recordings"""
    file_paths = services.recording.get_user_recordings(user_id)
    if not file_paths:
        return make_response(jsonify("No recordings for this user"), 400)

    # Copy dict to use as response
    # Store file data in place of path
    files = file_paths.copy()
    for word, path in file_paths.items():
        f = open(path, "rb")
        files[word] = f.open(path, "rb").read()

    return make_response(jsonify(files), 200) 