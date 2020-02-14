import React, { useContext, Fragment, useEffect, useState } from "react";
import { SearchContext } from "./Search";
import { GlobalContext } from "./GlobalContext";

class Word {
    // Encapsulates word string and audio data
    constructor(word, data) {
        this.word = word;
        this.audioData = data;
    }
}

const SearchBar = (props) => {
    const { wordList, updateWordList } = useContext(GlobalContext);
    const [ errorOccurred, toggleError ] = useState(false);
    // const { currentWord, memoWord } = useContext(SearchContext);

    // useEffect(() => {
    //     console.log(wordList);
    // }, [wordList])

    const fetchAudioData = query => {
        fetch("/api/waveify")
            .then(stream => {
                stream.blob()
                    .then(blob => {
                        const word = new Word(query, blob);
                        updateWordList([...wordList, word]); // Cache in global state
                    });
            });
    }

    const verifyWord = () => {
        // Check if user input is a valid word
        // TODO: Add error handler
        const query = document.getElementById("search-input").value;
        if (!query) { // Avoid empty string
            return;
        }
        
        fetch(`/api/search?word=${query}`)
            .then(resp => {
                if (resp.ok) { // Server returned 200 -> get audio
                    if (errorOccurred) toggleError(false); 
                    fetchAudioData(query);
                } else if (resp.status === 400) toggleError(true);
            });
    }

    useEffect(() => {
        // Execute search if query input in url
            const query = props.query.word;
            if (query) {
                // Render query on input el
                console.log(query)
                document.getElementById("search-input").value = query;
                verifyWord();
            }
    }, []);

    return (
        <Fragment>
            <div className="search-bar container">
                <div className="row justify-content-center">
                    <input type="text" id="search-input" className="col-5" autoFocus={true} onKeyDown={e => {
                        if(e.keyCode === 13) verifyWord();
                    }}/>
                    <button className="btn btn-primary col-3" onClick={ verifyWord }>Search</button>
                </div>
                { 
                    errorOccurred && 
                        <div className="row justify-content-center"> 
                            <div className="col-8 alert alert-danger text-center" role="alert">
                                Sorry! We couldn't find a wave for that word...
                            </div>
                        </div> 
                }
            </div>
        </Fragment>
    );
}

export default SearchBar;
