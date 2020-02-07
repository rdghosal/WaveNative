import React, { useContext, Fragment, useEffect } from "react";
import { SearchContext } from "./Search";
import { GlobalContext } from "./GlobalContext";

class Word {
    // Encapsulates word string and audio data
    constructor(word, data) {
        this.word = word;
        this.audioData = data;
    }
}

const SearchBar = () => {
    const { wordList, pushWord } = useContext(GlobalContext);
    const { currentWord, memoWord } = useContext(SearchContext);

    useEffect(() => {
        console.log(wordList);
        console.log(currentWord);
    }, [wordList])

    const fetchAudioData = query => {
        fetch("/api/waveify")
            .then(stream => {
                stream.blob()
                    .then(blob => {
                        const word = new Word(query, blob);
                        memoWord(word);
                        pushWord([...wordList, word]); // Cache
                    });
            })
    }

    const verifyWord = () => {
        // Check if user input is a valid word
        // TODO: Add error handler
        const query = document.getElementById("search-input").value;
        fetch(`/api/search?word=${query}`)
            .then(resp => {
                if (resp.ok) {
                    // Server returned 200 -> get audio
                    fetchAudioData(query);
                }
            })
    }

    return (
        <Fragment>
            <div className="search-bar">
                <input type="text" id="search-input" autoFocus={true} onKeyDown={e => {
                    if(e.keyCode === 13) verifyWord();
                }}/>
                <button className="btn btn-primary" onClick={ verifyWord }>Search</button>
            </div>
        </Fragment>
    );
}




export default SearchBar;
