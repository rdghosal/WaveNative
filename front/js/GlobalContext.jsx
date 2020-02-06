import React, { useState } from "react"

// Context instance
export const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
    // Caches userId to communicate w/ back-end
    const [ userId, cacheUserId ] = useState(null);

    return (
        <GlobalContext.Provider value={ userId, cacheUserId }>
            { props.children }
        </GlobalContext.Provider>
    );    
}