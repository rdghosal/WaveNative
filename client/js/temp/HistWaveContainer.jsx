import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import QueriedWave from "./QueriedWave";


const HistWaveContainer = () => {
    const { searchHistory } = useContext(GlobalContext);
    const historyLength = searchHistory.length;

    window.onbeforeunload = () => {
        if (searchHistory) {
            window.alert("Note: The history you see here will be cleared if you decide to refresh.");
        }
    }
    
    useEffect(() => {
        if (historyLength < 4) {
            document.querySelector(".history__wave-container").classList.add("wave-container--full-width");
        }
    });

    return (
        <div className="history__wave-container">
            { searchHistory.map((item, index) => <QueriedWave key={index} waveProps={item}/>)}
        </div>
    );
}

export default HistWaveContainer;