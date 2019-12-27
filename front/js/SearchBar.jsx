import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./App";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import "../css/SearchBar.css"
const ES6Promise = require('es6-promise-promise');
ES6Promise.polyfill();


const SearchBar = ({ queryViaURL }) => {
    const { word, setWord, toggleInput, toggleMic, setPlaybackData } = useContext(AppContext);
    const { searchHistory } = useContext(GlobalContext);
    const [ query, setQuery ] = useState("");

    window.onbeforeunload = () => {
        if (searchHistory) {
            window.alert("Note: Refreshing will clear all the waves we saved for you in the History tab.");
        }
    }
    
    const verifyWord = (q) => {
        document.getElementById("query-input").blur();

        axios
            .get("/api/search", { params: { word: q } })
            .then((response) => {
                    console.log(response);
                    setWord(q);
                    console.log(word);
                    toggleInput(false);
            })
            .catch((error) => console.log(error));
    }

    const destroyWaveContainer = () => {
        const waveContainer = document.querySelector(".wave-container");
        if (!waveContainer.classList.contains("wave-container--destroy")) {
            waveContainer.classList.add("destroyed");
        }
    }

    const handleChange = (textInput) => {
        let delay = 0;
        setQuery(textInput);

        if (document.querySelector("wave") !== null) { 
           destroyWaveContainer();
           delay = 500;
        }

        setTimeout(() => {
            toggleInput(true);
            setPlaybackData(null);
            toggleMic(false);
            return;
        }, delay);
    }
    
    const throwQuery = (e) => {
        if (query === "") {
            e.preventDefault();
            window.alert("Must input query!");
            return;
        }

        e.preventDefault();

        verifyWord(query);
    }

    useEffect(() => {
        if (queryViaURL !== null) {
           verifyWord(queryViaURL);
        }
    }, []);
    
    return (
        <form className="query">
            <input className="query-input" id="query-input" autoFocus="on" autoComplete="on" type="text" value={query} onChange={ e => handleChange(e.target.value) } placeholder="Search for a word!"/>
            <button className="query-button" onClick={ throwQuery }><span>Get Waveform!</span></button>  
        </form>
    );
}

export default SearchBar;