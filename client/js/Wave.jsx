import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { SearchContext } from "./Search";
import { saveAs } from "file-saver";
import WaveTypes from "./WaveTypes";


const Wave = ({ 
    hasPlayed, 
    setPlayed, 
    micOn, 
    toggleMic, 
    type, 
    word, 
    allowRecording 
}) => {

    const { wordList, updateWordList } = useContext(GlobalContext);
    // const { hasPlayed, setPlayed, micOn, toggleMic } = useContext(SearchContext);
    const [ wavesurfer, setWaveSurfer ] = useState(null);

    function appendUserData(data) {
        // Update wordList by appending user-recorded data
        updateWordList(() => {
            let temp = [...wordList];
            temp[temp.length-1].userData = data;
            updateWordList(temp);
        });
    }

    function downloadAudio() {
        // Build filename
        // Get current date as string
        let dateString = new Date().toISOString();
        const delimiters = ["-", ".", ":"];
        for (let d of delimiters) {
            dateString = dateString.split(d).join("")
        }

        // Label based on type of wave
        const suffix = (type === WaveTypes.native) ? "native" : "user";

        // Get blob data based on type
        let blob = null;
        if (type === WaveTypes.native) {
            blob = word.audioData;
        } else if (type === WaveTypes.playback) {
            blob = word.userData;
        }

        // Save to client device
        saveAs(blob, `${dateString}_${word.word}_${suffix}.wav`);
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
            setPlayed ? setTimeout(() => setPlayed(true), 350) : null; // Delay render of buttons
        }
    }, [word, wavesurfer]); // Run any time word or wavesurfer changes

    useEffect(() => {
        // Destroy wave on stop
        if (type !== WaveTypes.microphone) {
            return;
        } else if (!micOn && wavesurfer) {
        }
    }, [micOn])

    return (
        <Fragment>
            <div className="wave container-fluid">
                <div className="row h-100">
                    <div className="wave__wave col-sm-9 align-self-center" id={type.toLowerCase()}></div>
                    <div className="col-sm-2 align-self-center wave__media-buttons">
                        {  
                            type !== WaveTypes.microphone 
                                &&  <>
                                        <div className="row">
                                            <button className="btn btn-success btn-media play" onClick={ () => wavesurfer.play() } >Play</button> 
                                        </div>
                                        <div className="row">
                                            <button className="btn btn-danger btn-media stop" onClick={ () => wavesurfer.stop() }>Stop</button>
                                        </div>
                                        <div className="row">
                                            <button className="btn btn-primary btn-media download" onClick={ downloadAudio }>Download</button>
                                        </div>
                                    </>
                        }
                        {
                            allowRecording && type === WaveTypes.microphone && micOn
                                &&  (
                                        <div className="row">
                                            <button className="btn btn-danger btn-media stop-record" onClick={ () => { 
                                                wavesurfer.microphone.stop(); 
                                                wavesurfer.destroy();
                                                toggleMic(false);
                                            }}>Stop</button>
                                        </div>
                                    )
                        }
                    </div>
                </div>
                <div className="row justify-content-center">
                    {
                        allowRecording && type === WaveTypes.native && hasPlayed
                            &&  (
                                    <div className="col text-center">
                                        <button className="btn btn-warning btn-media record" onClick={ () => toggleMic(true) }>
                                            Record</button>
                                    </div>
                            )
                    }
                </div>
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

    return params;
}


function initWaveSurfer(type, params, stateUpdater) {
    /* Factory function for wavesurfer instance 
    Takes type, params, and function to update state */ 

    let wavesurfer = WaveSurfer.create(params);

    // Common behavior for native and playback waves
    if (type !== WaveTypes.microphone) {
        wavesurfer.on("ready", () => { 
            setTimeout(() => wavesurfer.play(), 350);
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