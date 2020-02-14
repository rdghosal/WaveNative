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
                    <div className="container-fluid search__wave-container native">
                        {
                            console.log(currentUser)
                        }
                        {
                            wordList.length > 0
                                &&  <> 
                                        {/* <div className="wave__word-label">{ wordList[wordList.length-1].word }</div>  */}
                                        <Wave type={ WaveTypes.native } 
                                                micOn={micOn} 
                                                toggleMic={toggleMic} 
                                                hasPlayed={hasPlayed} 
                                                setPlayed={setPlayed} 
                                                allowRecording={true} 
                                                word={ wordList[wordList.length-1] } /> 
                                    </>
                        }
                    </div>
                        {
                            wordList.length > 0 && micOn
                                &&  
                                    <>
                                        <div className="container-fluid search__wave-container user">
                                            <Wave word={ wordList[wordList.length-1] } 
                                                micOn={ micOn } 
                                                toggleMic={toggleMic} 
                                                hasPlayed={hasPlayed} 
                                                setPlayed={setPlayed} 
                                                allowRecording={true} 
                                                type={ WaveTypes.microphone }/> 
                                        </div>
                                    </>
                        }
                        {
                            wordList.length > 0 && wordList[wordList.length-1].userData && !micOn
                                &&  <>
                                        <div className="container-fluid search__wave-container user">
                                            <Wave type={ WaveTypes.playback } word={ wordList[wordList.length - 1] } />
                                        </div>
                                    </>
                        }
                </div>
            </SearchContext.Provider>
        </Fragment>
    );
}