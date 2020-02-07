import React, { useState } from "react"

// Context instance
export const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
    // Caches userId to communicate w/ back-end
    const [ userId, cacheUserId ] = useState(null);
    const [ wordList, pushWord ] = useState([]);

    return (
        <GlobalContext.Provider value={{ userId, cacheUserId, wordList, pushWord }}>
            { props.children }
        </GlobalContext.Provider>
    );    
}