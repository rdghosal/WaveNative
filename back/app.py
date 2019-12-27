#!usr/bin/env/python3
import os
import re
import requests
from io import StringIO, BytesIO

# from IPython.display import Audio
# from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import Flask, flash, jsonify, redirect, render_template, request, session, make_response, send_file, send_from_directory
from flask_session import Session
from tempfile import mkdtemp, NamedTemporaryFile, gettempdir
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required, apology

# Configure application
app = Flask(__name__, static_folder="../front/dist", template_folder="../front/templates")
# CORS(app)
app.debug = True

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
# @login_required
def index():
    """return landing page"""
    return render_template("index.html")

@app.route("/img/<path:filename>")
def serve_img(filename):
    return send_from_directory(os.path.join(os.pardir, "front", "img"), filename)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Get user input
        username = request.form.get("username")
        password = request.form.get("password")
    
        # Check if empty
        if not username:
            return apology("Must provide username", 403)
        elif not password:
            return apology("Must provide password", 403)

        # Query database with user input 
        rows = db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).fetchall()
        print(rows)
        
        if len(rows) != 1: 
            return apology("Invalid username and/or password", 403)
            """or not check_password_hash(rows[0]["hash"], password)"""

        # Remember session
        session["user_id"] = rows[0]["user_id"]

        # Redirect to homepage
        return redirect("/")

    # User reached route via GET (e.g., by clicking link)
    else:
        return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """return register.html for registration"""
        
    if request.method == "GET":
        return render_template("register.html")

    elif request.method == "POST":
        # Get user input
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Check for empty fields
        if not username or not password or not confirmation:
            return apology("Fill all fields", 400)
        
        rows = db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).fetchone()
        if rows is not None:
            return apology("Username already taken", 400)
        
        elif password != confirmation:
            return apology("Passwords do not match", 400)
        
        # Regex match to verify satisfaction of password conditions
        elif not re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9].{6,12}$", password):
            return apology("password must be 6-12 characters long with at least one number and uppercase and lowercase letter", 400)
        
        else:
            hashed = generate_password_hash(password)
            db.execute("INSERT INTO users(username, hash) VALUES (:username, :hash)", {"username": username, "hash": hashed})
            db.commit()
            return redirect("/")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@app.route("/api/search")
# @login_required
# @cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def search():
    if request.method == "GET":
        api_key = os.getenv("API_KEY")
        session["current_word"] = request.args.get("word")
        session[session["current_word"]] = None
        response = requests.get(f"https://www.dictionaryapi.com/api/v3/references/collegiate/json/{session['current_word']}?key={api_key}")
        if response.status_code != 200:
            return jsonify(""), 400       

        data = response.json()[0]
        # print(data)
        mw_pronun = data["hwi"]["prs"][0]["mw"]
        # print(mw_pronun)
        basename = data["hwi"]["prs"][0]["sound"]["audio"]
        # print(basename)
        """["audio"]"""
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
        
        # print(subdirectory)
        session["current_audio_url"] = f"https://media.merriam-webster.com/soundc11/{subdirectory}/{basename}.wav" 

        # print(session)
        # audio = Audio(url=f"https://media.merriam-webster.com/soundc11/{subdirectory}/{basename}.wav")
        # audio = requests.get(f"https://media.merriam-webster.com/soundc11/{subdirectory}/{basename}.wav").content
        # print(audio)
        # return render_template("results.html", word=word, mw_pronun=mw_pronun, audio_url=session["audio_url"])
        # """basename=basename, subdirectory=subdirectory"""
        return jsonify(""), 200


@app.route("/api/waveify")
def get_waveform():
    # from parselmouth.CC import get_total_duration

    data = requests.get(session["current_audio_url"]).content
    session[session["current_word"]] = data 

    return send_file(
        BytesIO(data),
        mimetype='audio/wav')

    

    """tempdir = gettempdir()
    temp_filename = tempdir + "\\temp.wav"
    with open(temp_filename, "w+b") as tempFile:
        tempFile.write(data)"""

    # sound = parselmouth.Sound(temp_filename)

    """data = requests.get(session["audio_url"]).content

    def temp_opener(name, flag, mode=0o777):
        return os.open(name, flag | os.O_TEMPORARY, mode)

    with NamedTemporaryFile(delete=False) as temp:
        temp.write(data)
        temp.flush()
        with open(temp.name, "rb", opener=temp_opener) as temp:
            assert temp.read() == data

    assert not os.path.exists(temp.name)
    temp.close()
    os.unlink(temp)

    with NamedTemporaryFile() as temp:
        temp.write(requests.get(session["audio_url"]).content)
        temp.flush()
        sound = parselmouth.Sound(temp.name)"""

    # = requests.get(session["audio_url"]).content
    # sound = parselmouth.Sound(session["audio_data"])

    # pitch_track = sound.to_pitch().selected_array['frequency']
    # print(pitch_track)

    # return jsonify(list(pitch_track)), 200


@app.route("/api/history")
def fetch_history(): 
    word = request.args.get("word")
    print(word)
    return send_file(BytesIO(session.get(word)), mimetype="audio/wav")


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)


if __name__ == "__main__":
    app.run()
