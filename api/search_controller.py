import os, requests, search_service
from io import BytesIO
from flask import Blueprint, request, jsonify, send_file, session


# To be registered by app.py
blueprint = Blueprint("search_controller", __name__)


# Get URL for audio file retrieval
@blueprint.route("/api/search")
def search():
    """Searches Merriam Webster (MW) for word
    and caches URL file thereof if valid"""
    api_key = os.getenv("API_KEY")
    session["current_word"] = request.args.get("word")
    # session[session["current_word"]] = None

    # Ping Merriam Webster for word details
    response = requests.get(f"https://www.dictionaryapi.com/api/v3/references/collegiate/json/{session['current_word']}?key={api_key}")
    if response.status_code != 200:
        return jsonify(""), 400       

    # Extract url from JSON and cache
    data = response.json()[0]
    session["current_audio_url"] = search_service.extract_audio_url(data)

    return jsonify(""), 200


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