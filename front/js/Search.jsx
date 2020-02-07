import React, { Fragment, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import "./Search.css"

// To pass on state to child components
export const SearchContext = React.createContext();

export const Search = () => {
    // Memoize queries
    const [ currentWord, memoWord ] = useState(null);
    const [ wavesurfer, setWaveSurfer ] = useState(null);
    const [ hasPlayed, setPlayedFlag ] = useState(false);
    const [ micOn, toggleMic ] = useState(false); // TODO

    useEffect(() => {
        // Ensure load of container before initializing wavesurfer instance
        if (document.getElementById("native") !== null && wavesurfer === null) {
            setWaveSurfer(createWaveSurfer());
        }
        // If no data, exit
        if (currentWord === null) {
            return;
        }
        // Load wave
        console.log(currentWord)
        wavesurfer.loadBlob(currentWord.audioData);
        setTimeout(() => setPlayedFlag(true), 350);
    }, [currentWord]);
        
    return (
        <Fragment>
            <SearchContext.Provider value={{ currentWord, memoWord }}>
                <Navbar />
                <div className="search">
                    <SearchBar />
                    <div className="wave-container">
                        <div className="wave" id="native"></div>
                        { hasPlayed 
                            ? <button onClick={() => wavesurfer.play() }>Play Again!</button> 
                            : null }
                        <div className="wave" id="mic"></div>
                    </div>
                </div>
            </SearchContext.Provider>
        </Fragment>
    );
}

function createWaveSurfer() {
    // Factory function for wavesurfer instance
    let wavesurfer = WaveSurfer.create({
            container: "#native",
            hideScrollbar: true,
            responsive: true,
            mediaControls: true,
            cursorWidth: 0,
            waveColor: "rgba(0, 44, 102, 0.60)",
            progressColor: "rgba(0, 44, 102, 1.0)",
            barHeight: 1.75
    });

    wavesurfer.on("ready", () => { 
        setTimeout(() => wavesurfer.play(), 250);
    });

    wavesurfer.on("finish", () => { 
        wavesurfer.stop();
    });

    return wavesurfer;
}