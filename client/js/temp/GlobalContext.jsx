import React, { useState } from "react";
import "../css/GlobalContext.css";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [ searchHistory, updateHistory ] = useState([]);

    return (
        <GlobalContext.Provider value={{ searchHistory, updateHistory }}>
            { children }
        </GlobalContext.Provider> 
    );
}