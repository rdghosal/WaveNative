import os, requests
import wavenative.services as services
from io import BytesIO
from flask import Blueprint, request, jsonify, send_file, session


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

        # Add UserQuery to database
        if session["user_id"] > 0:
            services.query.add_query(session["user_id"], curr_word, session["current_audio_url"])

    return jsonify("Valid query"), 200


@blueprint.route("/api/waveify")
def get_wav_data():
    """Sends wav data from MW API"""
    # Get binary data from MW API and cache 
    data = requests.get(session["current_audio_url"]).content
    session[session["current_word"]] = data 

    # Send wav file to client
    return send_file(BytesIO(data), mimetype='audio/wav')


@blueprint.route("/api/history")
def fetch_history(): 
    word = request.args.get("word")
    print(word)
    return send_file(BytesIO(session.get(word)), mimetype="audio/wav")