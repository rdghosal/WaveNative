import React, { Fragment, useContext } from "react";
import { AppContext } from "./App"; 
import "../css/NavToggler.css";

const NavToggler = () => {
    
    // const { toggleSidemenu } = useContext(AppContext);

    return (
        <Fragment>
            <button className="toggle-button" >
                <div className="toggle-bar"></div>
                <div className="toggle-bar"></div>
                <div className="toggle-bar"></div>
            </button>
        </Fragment>
    );
}

export default NavToggler;
