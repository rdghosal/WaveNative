import React, { useState } from "react"

// Context instance
export const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
    const [ currentUser, setUser ] = useState(null);
    const [ wordList, updateWordList ] = useState([]);

    return (
        <GlobalContext.Provider value={{ currentUser, setUser, wordList, updateWordList }}>
            { props.children }
        </GlobalContext.Provider>
    );    
}