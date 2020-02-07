import React, { useEffect, Fragment, useContext, useState } from "react";
import { AppContext } from "./App";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";

const NativeWave = () => {
    const { word, toggleMic } = useContext(AppContext);
    const { searchHistory, updateHistory } = useContext(GlobalContext);
    const [ nativeWave, setNativeWave ] = useState(null);
    const [ hasPlayed, setPlayed ] = useState(false);
    // const firstRender = useRef(true);

    const handleToggle = () => {
        document.querySelector(".mic-toggle--first-try").classList.add("clicked");
        document.querySelector(".replay--native").classList.add("mic-toggle-clicked");
        toggleMic(true);
    }

    const pushWave = (word, data) => {
        updateHistory(() => [...searchHistory, {word: word, data: data}]);
    }

    useEffect(() => {
        if (nativeWave) {
            document.getElementById(word).setAttribute("class", "wave-container__wave--destroyed");
            setTimeout(() => nativeWave.destroy(), 500);
            setPlayed(false);
        }
        return; 
    }, [word]);

    useEffect(() => {
        let wavesurfer = WaveSurfer.create({
                container: `#${word}`,
                hideScrollbar: true,
                responsive: true,
                mediaControls: true,
                cursorWidth: 0,
                waveColor: "rgba(0, 44, 102, 0.60)",
                progressColor: "rgba(0, 44, 102, 1.0)",
                barHeight: 1.75
        });

        wavesurfer.load("/api/waveify");

        wavesurfer.on("ready", () => { 
            //nativeWave.setPlaybackRate(0.5);
            //duration = nativeWave.getDuration(); 
            //console.log(nativeWave.container.id);
            document.getElementById(word).setAttribute("class", "wave-container__wave--loaded");
            setTimeout(() => wavesurfer.play(), 250);
        });

        wavesurfer.on("finish", () => { 
            wavesurfer.stop();
        });

        setNativeWave(wavesurfer);
        pushWave(word);
        // console.log(searchHistory);
        // axios
        //     .get("/api/waveify")
        //     .then(response => {
        //         console.log(response)
        //         console.log(response.data)
        //         const data = new Blob([response.data], { type: "audio/wav" });
        //         console.log(data);
        //     });

        setTimeout(() => setPlayed(true), 500);
    }, [word]);
        


    if (hasPlayed) {
        return (
            <Fragment>
                <div className="mediabuttons">
                    <button className="mediabuttons__button replay--native" onClick={ ()=> nativeWave.play() }>Replay!</button>
                    <button className="mediabuttons__button mic-toggle--first-try" onClick={ handleToggle }><span>Wanna Record?</span></button>
                </div>
            </Fragment>
        );
    } else {
        return ( null );
    }
}

export default NativeWave;
