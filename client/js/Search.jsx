import React, { Fragment, useState, useContext } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import WaveTypes from "./WaveTypes";
import "./Search.css"
import { GlobalContext } from "./GlobalContext";
import Wave from "./Wave";

// To pass on state to child components
export const SearchContext = React.createContext();

export const Search = () => {
    // Memoize queries
    const { wordList } = useContext(GlobalContext);
    // const [ currentWord, memoWord ] = useState(null);
    const [ hasPlayed, setPlayed ] = useState(false);
    const [ micOn, toggleMic ] = useState(false); // TODO

    return (
        <Fragment>
            <SearchContext.Provider value={{ hasPlayed, setPlayed, micOn, toggleMic }}>
                <Navbar />
                <div className="search">
                    <SearchBar />
                    <div className="wave-container">
                        {
                            console.log(wordList)
                        }
                        {
                            wordList.length > 0
                                && <Wave type={ WaveTypes.native } word={ wordList[wordList.length-1] } /> 
                        }
                        {
                            wordList.length > 0 && micOn
                                && <Wave word={ wordList[wordList.length-1] } type={ WaveTypes.microphone }/> 
                        }
                        {
                            wordList.length > 0 && wordList[wordList.length-1].userData 
                                && <Wave type={ WaveTypes.playback } word={ wordList[wordList.length - 1] } />
                        }
                    </div>
                </div>
            </SearchContext.Provider>
        </Fragment>
    );
}