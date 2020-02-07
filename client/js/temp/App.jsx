import React, { Fragment, useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import WaveContainer from "./WaveContainer";
import Navbar from "./Navbar";
import Backdrop from "./Backdrop"; 
import { GlobalContext, GlobalProvider } from "./GlobalContext";
import "../css/App.css";

// const queryString = require("query-string");

export const AppContext = React.createContext();

export const App = ({ match }) => {
    const [ word, setWord ] = useState("");
    const [ micOn, toggleMic ] = useState(false);
    const [ playbackData, setPlaybackData ] = useState(null);
    const [ inputFocused, toggleInput ] = useState(false);
    const [ isSidemenuOpen, toggleSidemenu ] = useState(false);

    useEffect(() => {
        document.getElementById("content").setAttribute("class", "content--app");
    });

    return (
            <AppContext.Provider
                value={{ inputFocused, toggleInput, word, setWord, micOn, toggleMic,
                     playbackData, setPlaybackData, isSidemenuOpen, toggleSidemenu }}>
                <Fragment> 
                    <Navbar />
                    { isSidemenuOpen ? <Sidemenu /> : null }
                    { isSidemenuOpen ? <Backdrop /> : null }
                    <SearchBar queryViaURL={ match ? match.params.word : null }/>
                    { !inputFocused && word ? <WaveContainer /> : null }
                </Fragment> 
            </AppContext.Provider>
    );
}
