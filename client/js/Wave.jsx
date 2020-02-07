import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { SearchContext } from "./Search";
import WaveTypes from "./WaveTypes";


const Wave = ({ type, word }) => {

    const { wordList, updateWordList } = useContext(GlobalContext);
    const { hasPlayed, setPlayed, micOn, toggleMic } = useContext(SearchContext);
    const [ wavesurfer, setWaveSurfer ] = useState(null);

    function appendUserData(data) {
        // Update wordList by appending user-recorded data
        updateWordList(() => {
            let temp = [...wordList];
            temp[temp.length-1].userData = data;
            updateWordList(temp);
        });
    }

    useEffect(() => {
        // Ensure load of container before initializing wavesurfer instance
        if (document.getElementById(type.toLowerCase()) !== null && wavesurfer === null) {
            setWaveSurfer(initWaveSurfer(type, createParams(type), appendUserData));
        }

        // Exit if wavesurfer is null and if mic-type wavesurfer
        if (wavesurfer === null) return;
        else if (type === WaveTypes.microphone) {
            // Start recording
            setTimeout(() => {
                wavesurfer.microphone.start();
                wavesurfer.microphone.play();
            }, 250);

        } else {
            // Load data into wavesurfer
            let blob = (type === WaveTypes.native) ? word.audioData : word.userData;
            console.log(blob)
            wavesurfer.loadBlob(blob);
            setTimeout(() => setPlayed(true), 350); // Delay render of buttons
        }
    }, [wavesurfer]);

    return (
        <Fragment>
            <div className="wave" id={type.toLowerCase()}></div>
            <div className="wave__media-buttons">
                {  
                    type !== WaveTypes.microphone && hasPlayed 
                        &&  <>
                                <button className="btn btn-outline" onClick={ () => wavesurfer.play() } >Play</button> 
                                <button className="btn btn-outline" onClick={ () => wavesurfer.stop() }>Stop</button>
                                <button className="btn btn-outline" onClick={ () => toggleMic(true) }>Record
                                    { type === WaveTypes.playback ? " Again?" : "" }</button>
                            </>
                }
                {
                    type === WaveTypes.microphone && micOn
                        &&  (
                                <button className="btn btn-outline" onClick={ () => { 
                                    wavesurfer.microphone.stop(); 
                                    wavesurfer.destroy();
                                    toggleMic(false);
                                }}>Stop</button>
                            )
                }
            </div>
        </Fragment>
    );
}


function createParams(type) {
    /* Returns params for wavesurfer config */

    let params = {
        // Common params between all wave types
        container: `#${type.toLowerCase()}`,
        cursorWidth: 0,
        hideScrollbar: true,
        responsive: true,
        mediaControls: true
    };

    switch (type) {
        // Native and playback waves share common params
        case WaveTypes.native:
        case WaveTypes.playback:
            params.barHeight = 1.75;
            // Differ in progress and wave colors
            if (type === WaveTypes.native) {
                params.progressColor = "rgba(0, 44, 102, 1.0)";
                params.waveColor = "rgba(0, 44, 102, 0.60)"; 
            } else {
                params.progressColor = "rgba(43, 0, 199, 1.0)";
                params.waveColor = "rgba(43, 0, 199, 0.65)";
            }
            break;

        // Unique params for mic waves
        case WaveTypes.microphone:
            params.interact = false;
            params.progressColor = "black";
            params.plugins = [ WaveSurfer.microphone.create() ];
            break;
    
        default:
            break;
    }
    console.log(params)
    return params;
}


function initWaveSurfer(type, params, stateUpdater) {
    /* Factory function for wavesurfer instance 
    Takes type, params, and function to update state */ 

    let wavesurfer = WaveSurfer.create(params);

    // Common behavior for native and playback waves
    if (type !== WaveTypes.microphone) {
        wavesurfer.on("ready", () => { 
            setTimeout(() => wavesurfer.play(), 250);
        });
        wavesurfer.on("finish", () => { 
            wavesurfer.stop();
        });
    } else { // Special configuration for mic plugin
        // Stores audio recording data (bytes)
        const chunks = [];

        // Error handling for media device
        wavesurfer.microphone.on('deviceError', code => {
            console.warn('Device error: ' + code);
        });

        // Start recording once ready
        wavesurfer.microphone.on('deviceReady', stream => {
            console.log('Device ready!', stream);
            
            // Activate client's media recorder
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            // Push audio data to array
            mediaRecorder.ondataavailable = event => {
                chunks.push(event.data);
            }
            
            // Once stopped, make blob from array
            // and update word object (update global state)
            mediaRecorder.onstop = () => {
                let playbackBlob = new Blob(chunks);
                console.log(playbackBlob);
                stateUpdater(playbackBlob);
            }

            // Ensure the client device stops recording
            // upon object destruction
            wavesurfer.on("destroy", () => mediaRecorder.stop());
        });
    }

    return wavesurfer;
}

export default Wave;