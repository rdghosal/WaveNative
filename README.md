# WaveNative
```
Last updated: 15 February 2020
```

## I. Release History
> __Current URL__: [https://wave-native.herokuapp.com](https://wave-native.herokuapp.com)
- Initial release: 15 February 2020

## II. Purpose
WaveNative is a single-page web application that visualizes English words pronunced by native speakers.<br>
The user is prompted to record their own attempts at pronunciation and may register a username in order to keep a record of words they frequently query.

## III. Technologies
### 1. Front-End
- [React](https://reactjs.org/)
- [WaveSurfer.js](https://github.com/katspaugh/wavesurfer.js) (libary for sound visualizations) 
### 2. Back-End
- [gunicorn](https://gunicorn.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [PostgreSQL](https://www.postgresql.org/)
### 3. Deployment
- [Heroku](https://www.heroku.com/)
### 4. Third-Party APIs
- [Merriam-Webster](https://dictionaryapi.com/) for native English audio recordings

## IV. TODO
- Integrate better work-arounds/fallbacks for browsers that do not support the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) being used for audio recording.<br>
(Currently only Chrome and Firefox allow user recording) 
- Implement service workers to make the app more accessible for users with poor Internet connectivity (that is, more *progressive*)
- Leverage Python ecosystem to provide richer quantitative feedback for the user to assess their progress in word pronunciation 