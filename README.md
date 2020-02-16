# WaveNative
```
Last updated: 15 February 2020
```

## 1. Release History
> __Current URL__: [https://wave-native.herokuapp.com](https://wave-native.herokuapp.com)
- Initial release: 15 February 2020

## 2. Purpose
WaveNative is a single-page web application that visualizes English words pronunced by native speakers.<br>
The user is prompted to record their own attempts at pronunciation and may register a username in order to keep a record of words they frequently query.

## 3. Technologies
### 1. Front-End
- [React](https://reactjs.org/)
- [WaveSurfer.js](https://wavesurfer-js.org/) (libary for sound visualizations) 
### 2. Back-End
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
### 3. Database (SQL)
- [PostgreSQL](https://www.postgresql.org/)
### 4. Deployment
- [Heroku](https://www.heroku.com/)
### 5. Third-party APIs
- [Merriam-Webster](https://dictionaryapi.com/) for native English audio recordings

## 4. TODO
- Integrate better work-arounds/fallbacks for browsers that do not support the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) being used for audio recording.<br>
(Currently only Chrome and Firefox allow user recording) 
- Implement service workers to make the app more accessible for users with poor Internet connectivity (that is, more *progressive*)
- Leverage Python ecosystem to provide richer quantitative feedback for the user to assess their progress in word pronunciation 