from datetime import datetime
from wavenative import db
from wavenative.models.user_query import UserQuery
from wavenative.models.query import Query


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
    result = db.session.query(Query).filter(Query.word == word).first()
    if result:
        return result.url
    return None

def add_query(word, url):
    """Adds word and its audio url to database"""
    db.session.add(Query(word=word, url=url))
    db.session.commit()


def add_user_query(user_id, query):
    """Adds user query to database"""
    query_record = db.session.query(Query.id).filter(Query.word == query).first()
    user_query = UserQuery(user_id=user_id, query_id=query_record.id)
    db.session.add(user_query)
    db.session.commit()


def get_user_queries(user_id):
    """Retrieves user queries from database"""

    temp = dict()
    user_queries = dict()

    # Search user_query table for queries made by user
    # Find word for each query from queries table
    user_query_records = db.session.query(UserQuery.query_id, UserQuery.datetime).filter(UserQuery.user_id == user_id).all()

    # Calculate query frequency
    for record in user_query_records:
        temp[record.query_id] = temp.get(record.query_id, 0) + 1
    
    # Copy frequencies to outgoing dict, keyed by words instead of query_ids
    for query_id in temp:
        query_record = db.session.query(Query.word).filter(Query.id == query_id).first()
        user_queries[query_record.word] = temp[query_id]

    return user_queries