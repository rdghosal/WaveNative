import os, requests
import api.services as services
from io import BytesIO
from flask import Blueprint, request, jsonify, send_file, session, make_response


API_KEY = os.getenv("API_KEY")
WORD_DETAILS_URL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/{0}?key={1}"

# To be registered by app.py
blueprint = Blueprint(name="query_controller", import_name=__name__)


# Get URL for audio file retrieval
@blueprint.route("/api/search")
def search():
    """Searches Merriam Webster (MW) for word
    and caches URL file thereof if valid"""
    curr_word = request.args.get("word")
    curr_user_id = request.args.get("userId")

    # Check database for url if query had been previously made
    audio_url = services.query.get_audio_url(curr_word)

    if not audio_url:
        # Get audio url from MW API
        response = requests.get(WORD_DETAILS_URL.format(curr_word, API_KEY))
        if response.status_code != 200:
            return jsonify("Invalid query"), 400       

        # Extract url from JSON and cache
        data = response.json()[0]
        audio_url = services.query.extract_audio_url(data)
        services.query.add_query(curr_word, audio_url)

    # Add UserQuery to database
    if int(curr_user_id) > 0:
        services.query.add_user_query(curr_user_id, curr_word)

    return jsonify("Valid query"), 200


@blueprint.route("/api/waveify")
def get_wav_data():
    """Sends wav data from MW API"""
    # Get requested word and query db for audio url
    word = request.args.get("word")
    audio_url = services.query.get_audio_url(word)

    # Fetch audio file from MW API
    # and send to client
    data = requests.get(audio_url).content
    return send_file(BytesIO(data), mimetype='audio/wav')


@blueprint.route("/api/queries/<path:user_id>")
def get_user_queries(user_id): 
    """Returns all queries made by user"""
    # Prevent queries using guest user id
    if not int(user_id) > 0:
        return make_response(jsonify("Cannot process for guest user"), 403)
    
    # Retrieve unique queries for user from database
    user_queries = services.query.get_user_queries(user_id)
    return make_response(jsonify(user_queries), 200)