import models
from app import db

def extract_audio_url(data):
    """Parses JSON to build and return URL used for audio file retrieval"""
    basename = data["hwi"]["prs"][0]["sound"]["audio"]
    subdirectory = ""
    if basename[0].isnumeric() or basename[0] == "_":
        subdirectory = "number"
    else:
        if basename[0:2] == "gg":
            subdirectory = "gg"
        elif basename[0:3] == "bix":
            subdirectory = "bix"
        else:
            subdirectory = basename[0]

    return f"https://media.merriam-webster.com/soundc11/{subdirectory}/{basename}.wav" 


def get_audio_url(word):
    """Find audio url if query was made previously by a user"""
    result = db.session.query(models.UserQuery).filter(models.UserQuery.query == word).first()
    if result:
        return result["url"]
    return None


def add_query(user_id, query, url):
    """Adds user query (and url to audio file) to database"""
    user_query = models.UserQuery(user_id=user_id, query=query, url=url)
    db.session.add(user_query)
    db.session.commit()
