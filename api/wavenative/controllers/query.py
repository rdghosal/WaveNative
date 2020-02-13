import os, requests
import wavenative.services as services
from io import BytesIO
from flask import Blueprint, request, jsonify, send_file, session, make_response


WORD_DETAILS_URL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/{0}?key={1}"

# To be registered by app.py
blueprint = Blueprint(name="query_controller", import_name=__name__)


# Get URL for audio file retrieval
@blueprint.route("/api/search")
def search():
    """Searches Merriam Webster (MW) for word
    and caches URL file thereof if valid"""
    api_key = os.getenv("API_KEY")
    session["current_word"] = curr_word = request.args.get("word")
    # session[session["current_word"]] = None

    # Check database for url if query had been previously made
    audio_url = services.query.get_audio_url(curr_word)

    if not audio_url:
        # Get audio url from MW API
        response = requests.get(WORD_DETAILS_URL.format(session["current_word"], api_key))
        if response.status_code != 200:
            return jsonify("Invalid query"), 400       

        # Extract url from JSON and cache
        data = response.json()[0]
        session["current_audio_url"] = services.query.extract_audio_url(data)
        services.query.add_query(curr_word, session["current_audio_url"])

    else: 
        session["current_audio_url"] = audio_url

    # Add UserQuery to database
    if session["user_id"] > 0:
        services.query.add_user_query(session["user_id"], curr_word)

    return jsonify("Valid query"), 200


@blueprint.route("/api/waveify")
def get_wav_data():
    """Sends wav data from MW API"""
    # Get binary data from MW API and cache 
    data = requests.get(session["current_audio_url"]).content
    session[session["current_word"]] = data 

    # Send wav file to client
    return send_file(BytesIO(data), mimetype='audio/wav')


@blueprint.route("/api/queries/<path:user_id>")
def get_user_queries(user_id): 
    """Returns all queries made by user"""
    # Prevent queries using guest user id
    if not int(user_id) > 0:
        return make_response(jsonify("Cannot process for guest user"), 403)
    
    # Retrieve unique queries for user from database
    user_queries = services.query.get_user_queries(user_id)
    if not user_queries:
        return make_response(jsonify("No queries found for user"), 400)

    return make_response(jsonify(user_queries), 200)