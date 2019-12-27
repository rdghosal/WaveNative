# WaveNative
## 1. Purpose
WaveNative is a single-page web application that provides users soundwave visualizations of native pronunciations<br>
and allows them to emulate the same.

## 2. Technologies
WaveNative implements React.js in the front-end to provide the user a seamless interface and utilize service workers<br>
in order to reach users with less-than-ideal network connections.
As for the back-end, WaveNative uses a Flask API in order to leverage the Python ecosystem and provide the user detailed quantitative feedback.<br>
Specifically, the following technologies are used:
### 1. Front-End (JavaScript)
- React.js (front-end libary)
- [WaveSurfer.js](https://wavesurfer-js.org/) (libary for sound visualizations) 
### 2. Back-End (Python)
- Flask (microframework for API routing)
- [Parselmouth](https://parselmouth.readthedocs.io/en/stable/) (library for Praat via Python to provide audio processing and quantitative feedback) - TBD
### 3. Database (SQL)
- PostgreSQL via Heroku
### 4. Third-party (API)
- [Merriam-Webster](https://dictionaryapi.com/) for native English audio recordings

## 3. TODO
- The project is under construction, with UI issues yet to be resolved.
- Feedback to the user is currently limited to soundwave images of words<br>
  and an algorithm for quantitative feedback has not yet been devised or implemented.
- While boilerplate for database writes/reads can be found in the back-end code, the front-end has yet to reflect this<br>
  with an option for user login/registration.
