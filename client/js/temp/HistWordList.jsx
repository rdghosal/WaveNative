import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

const HistWordList = () => {
    const { searchHistory } = useContext(GlobalContext);
    let historyLength = searchHistory.length - 4;

    if (historyLength <= 0) {
        return (null); 
    } else {
        return (
            <div className="history__word-list">
                { 
                    searchHistory
                        .filter(item => {
                            for (; historyLength >= 0; historyLength--) {
                                return item;
                            }
                        })
                        .map((item, index) => {
                            let url = "app/" + item.word;

                            <div key={ index } className="word-list__word">
                                <Link to={ url } className="react-link">
                                    { item.word }
                                </Link>
                            </div>
                        }) 
                }
            </div>
        );
    }
}

export default HistWordList;
