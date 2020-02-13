import React, { Fragment, useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import WaveTypes from "./WaveTypes";
import "./Search.css"
import { GlobalContext } from "./GlobalContext";
import LoginModal from "./LoginModal";
import Wave from "./Wave";
import queryString from "query-string";

// To pass on state to child components
export const SearchContext = React.createContext();

export const Search = (props) => {
    // Memoize queries
    const { currentUser, wordList } = useContext(GlobalContext);
    // const [ currentWord, memoWord ] = useState(null);
    const [ hasPlayed, setPlayed ] = useState(false);
    const [ micOn, toggleMic ] = useState(false); // TODO

    return (
        <Fragment>
            <SearchContext.Provider value={{ hasPlayed, setPlayed, micOn, toggleMic }}>
                <LoginModal />
                <Navbar />
                <div className="search container-fluid">
                    <SearchBar query={queryString.parse(props.location.search)} />
                    <div className="container-fluid">
                        {
                            console.log(currentUser)
                        }
                        {
                            wordList.length > 0
                                && <Wave type={ WaveTypes.native } allowRecording={true} word={ wordList[wordList.length-1] } /> 
                        }
                        {
                            wordList.length > 0 && micOn
                                && <Wave word={ wordList[wordList.length-1] } allowRecording={true} type={ WaveTypes.microphone }/> 
                        }
                        {
                            wordList.length > 0 && wordList[wordList.length-1].userData && !micOn
                                && <Wave type={ WaveTypes.playback } word={ wordList[wordList.length - 1] } />
                        }
                    </div>
                </div>
            </SearchContext.Provider>
        </Fragment>
    );
}