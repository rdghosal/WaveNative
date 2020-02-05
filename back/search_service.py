def extract_audio_url(data):
"""Parses JSON to build and return URL used for audio file retrieval"""
    basename = data["hwi"]["prs"][0]["sound"]["audio"]
    subdirectory = ""
    # mw_pronun = data["hwi"]["prs"][0]["mw"]
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