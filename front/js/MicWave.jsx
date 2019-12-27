import React, { useState, useContext, Fragment, useRef, useEffect } from "react";
import { AppContext } from "./App";

const MicWave = () => {
    const [ micWave, setMicWave ] = useState(null);
    const { word, micOn, toggleMic, setPlaybackData } = useContext(AppContext);

    useEffect(() => {
        if (!micWave) {
            setUpMic();
            console.log("running");
            return;
        }

        document.getElementById("mic").setAttribute("class", "wave-container__wave--loaded");
        
        setTimeout(() => {
            micWave.microphone.start();
            micWave.microphone.play();
        }, 250);
    }, [ micWave ]);

    useEffect(() => {
        if (micWave) {
            micWave.microphone.stop();
            micWave.destroy();
            setPlaybackData(null);
            setMicWave(null);
            toggleMic(false);
        }

        return;
    }, [ word ]);
    
    const setUpMic = () => {
        const chunks = [];
        const wavesurfer = WaveSurfer.create({
                            container: "#mic",
                            interact: false,
                            responsive: true,
                            hideScrollbar: true,
                            mediaControls: true,
                            progressColor: "black",
                            cursorWidth: 0,
                            plugins: [ WaveSurfer.microphone.create()]
                         });

        wavesurfer.microphone.on('deviceError', code => {
            console.warn('Device error: ' + code);
        });

        wavesurfer.microphone.on('deviceReady', stream => {
            console.log('Device ready!', stream);

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.ondataavailable = event => {
                chunks.push(event.data);
            }

            mediaRecorder.onstop = () => {
                let playbackBlob = new Blob(chunks);
                console.log(playbackBlob);
                setPlaybackData(playbackBlob);
            }

            wavesurfer.on("destroy", () => mediaRecorder.stop());
        });
        
        console.log(`you have wave: ${wavesurfer}`);
        setMicWave(wavesurfer);
    }

    const stopRecording = () => {
        micWave.microphone.stop();
        micWave.destroy();
        toggleMic(false);
    }

    return (
        <Fragment>
            <div className="mediabuttons">
                { micWave 
                    ? <button className="mediabuttons__button stop" onClick={ stopRecording }>Stop!</button> 
                    : null }
            </div>
        </Fragment>
    );
}

export default MicWave;
