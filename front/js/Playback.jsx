import React, { useContext, Fragment, useEffect, useState } from "react";
import { AppContext } from "./App";

const PlaybackWave = () => {
    const { playbackData, setPlaybackData, word, toggleMic, micOn } = useContext(AppContext);
    const [ playbackWave, setPlayback ] = useState(null);
    const [ hasPlayed, setPlayed ] = useState(false);

    useEffect(() => {
        if (playbackWave !== null) {
            setTimeout(() => playbackWave.play(), 250);
            setTimeout(() => setPlayed(true), 1750);

        } else {
            readyPlayback();
        }

    }, [ playbackWave ]);

    useEffect(() => {
        if (playbackWave) {
            playbackWave.destroy();
            setPlaybackData(null);
        }

        return;
    }, [ word ]);

    const readyPlayback = () => {
        let wavesurfer =  WaveSurfer.create({
                                container: "#playback",
                                hideScrollbar: true,
                                responsive: true,
                                cursorWidth: 0,
                                mediaControls: true,
                                progressColor: "rgba(43, 0, 199, 1.0)",
                                waveColor: "rgba(43, 0, 199, 0.65)",
                                barHeight: 1.75
                             });

        //const playbackURL = URL.createObjectURL(playbackBlob);
        wavesurfer.loadBlob(playbackData);

        wavesurfer.on("finish", () => { 
            wavesurfer.stop();
            // hasPlayback.current = true;
            // let playbackURL = playbackWave.exportImage();
            // document.getElementById("recording").src = playbackURL;
        });

        wavesurfer.on("ready", () => { 
            document.getElementById("playback").setAttribute("class", "wave-container__wave--loaded");
            setPlayback(wavesurfer)
        }); 
    }

    const restartMic = () => {
        playbackWave.destroy();
        toggleMic(true);
    }

    if (hasPlayed) {
        return ( 
            <Fragment>
                <div className="mediabuttons">
                  <button className="mediabuttons__button mic-toggle--try-again" onClick={ () => restartMic() }>Try Again?</button>
                  <button className="mediabuttons__button replay--playback" onClick={ () => playbackWave.play() }>Replay your wave!</button> 
                </div>
            </Fragment>
        )
    } else {
        return (null)
    }
}

export default PlaybackWave;
