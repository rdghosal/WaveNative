import React, { useState, Fragment } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import NavToggler from "./NavToggler";
import "../css/Navbar.css";
import Sidemenu from "./Sidemenu";


const Navbar = () => {
    // const [ isSidemenuOpen, toggleSidemenu ] = useState(false);

    return (
        <Fragment>
            <nav>
                {/* <NavToggler onClick={ toggleSidemenu(true) }/> */}
                <div className="logo-caption">
                    <Link to="/" className="react-link logo"><span>W</span>ave <span>N</span>ative</Link>
                    <p className="caption">One small wave, one giant leap</p>
                </div>
                <div className="space"></div>
                <ul className="nav-links">
                    <li><Link to="/" className="react-link">Home</Link></li>
                    <li><Link to="/app/" className="react-link">Catch a Wave</Link></li>
                    <li><Link to="/history/" className="react-link">History</Link></li>
                </ul>
            </nav>
            {/* { isSidemenuOpen ? <Sidemenu /> : null } */}
        </Fragment>
    );
}

export default Navbar;
