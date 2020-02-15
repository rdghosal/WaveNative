import os
from datetime import datetime
from flask import current_app, session
from api import db
from api.models.user_recording import UserRecording


# TODO To regulate file uploads
# ALLOWED_EXTENSIONS = { ".wav" }

def add_user_recording(file_data, word):
    """Saves user recording to local directory and path to database"""

    # Set file name and path
    curr_dt = datetime.now()
    user_id = session["user_id"]
    filename = "{0}_{1}_{2}.wav".format(datetime.strftime(curr_dt), user_id, word)
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    path = os.path.join(upload_folder, filename)

    # Write data to file
    with open(path, "wb") as f:
        f.write(file_data)
    
    # Save word, path, and user id to database
    db.session.add(UserRecording(word=word, path=path, user_id=user_id))
    db.session.commit()

def get_user_recordings(user_id):
    """Gets file path for each sound file recorded by user
    returns dict of file path keyed by word"""
    file_paths = dict()
    records = db.session.query(UserRecording).filter(UserRecording.user_id == user_id).all()
    
    for record in records:
        file_paths[record.word] = record.path
    
    return file_paths