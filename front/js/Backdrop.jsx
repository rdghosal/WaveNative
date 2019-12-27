import React, { useContext } from "react";
import { AppContext } from "./App";
// import "../css/Backdrop.css";


const Backdrop = () => {
    const { toggleSidemenu } = useContext(AppContext);
    
    return (
        <div className="backdrop" onClick={() => toggleSidemenu(false) }></div> 
    );
}


export default Backdrop;
