import React, { useContext, Fragment, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
// import MediaButtons from "./MediaButtons";

const QueriedWave = ({ waveProps }) => {
    const [ wave, setWave ] = useState(null);
    const { searchHistory, updateHistory } = useContext(GlobalContext);
    
    const popWave = () => {
        updateHistory(searchHistory.splice(searchHistory.indexOf(waveProps.word), 1));
        wave.destroy(); //might need to move popWave up to parent as state
    }

    const playWave = () => {
        wave.play();
    }

    const stopWave = () => {
        wave.stop();
    }

    useEffect(() => {
        console.log(waveProps.data)
        const wavesurfer = WaveSurfer.create({
            container: `#${waveProps.word}`,
            hideScrollbar: true,
            responsive: true,
            mediaControls: true,
            cursorWidth: 0,
            waveColor: "rgba(0, 44, 102, 0.60)",
            progressColor: "rgba(0, 44, 102, 1.0)",
            barHeight: 1.75,
            xhr: { "word": waveProps.word }
        }); 

        // wavesurfer.on("loading", () => {
        //     wavesurfer.stop();
        // })

        wavesurfer.on("ready", () => {
            console.log(`${waveProps.word} has loaded!`);
            document.getElementById(waveProps.word).setAttribute("class", "wave-container__wave--loaded");
        });

        wavesurfer.on("finish", () => { 
            wavesurfer.stop();
        });
        
        // const fileURL = URL.createObjectURL(waveProps.data);
        // console.log(fileURL);
        wavesurfer.load(`/api/history?word=${waveProps.word}`);
        setWave(wavesurfer);
    }, [waveProps]);

    return (
        <Fragment>
            <div className="wave-container__subcontainer">
                <p className="subcontainer__word">{ waveProps.word }</p>
                <div className="subcontainer__wave" id={ waveProps.word }></div>
                <div className="subcontainer__button-drawer">
                    { wave ? <button onClick={ playWave }>Play</button> : null }
                    { wave ? <button onClick={ stopWave }>Stop</button> : null }
                    <button className="button-drawer__button button--pop" onClick={ popWave }>X</button>
                </div>
            </div>
        </Fragment>
    );
}

export default QueriedWave;
