import React, {  useState, useEffect, Fragment, useContext } from "react";
import { AppContext } from "./App";
import NativeWave from "./NativeWave";
import MicWave from "./MicWave";
import PlaybackWave from "./Playback";
import "../css/WaveContainer.css";
// import { RecordingProvider } from "./RecordingContext"; //TODO


const WaveContainer = () => {
    // const [ hasPlayed, setPlayed ] = useState(false);
    const { word, micOn, playbackData } = useContext(AppContext);
    // const [ shouldPlayback, togglePlayback ] = useState(false);
    
    return (
        <Fragment>
            <div className="wave-container">
                <div id={ word } className="wave-container__wave"></div>
                <NativeWave />
                <div id="mic" className="wave-container__wave"></div>
                { micOn ? <MicWave /> : null }
                <div id="playback" className="wave-container__wave"></div>
                { !micOn && playbackData ? <PlaybackWave /> : null }
            </div>
        </Fragment>
    );
}

export default WaveContainer;
