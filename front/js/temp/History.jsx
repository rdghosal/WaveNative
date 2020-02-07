import React, {Fragment, useEffect, useContext} from "react";
import HistWaveContainer from "./HistWaveContainer";
import HistWordList from "./HistWordList";
import { GlobalContext } from "./GlobalContext";
import Navbar from "./Navbar";

const History = () => {
    const { searchHistory } = useContext(GlobalContext); //optimize by piping this down instead of all the func calls

    useEffect(() => {
        const main = document.getElementById("content");
        const view = searchHistory.length < 4 ? "content--history--full" : "content--history--split";
    
        main.setAttribute("class", view);
    });

    return (
        <Fragment>
            <Navbar />
            <HistWaveContainer />
            <HistWordList />
        </Fragment>
    );
}

export default History;
