import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import "./Navbar.css";

const Navbar = () => {
    const { currentUser } = useContext(GlobalContext);

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand"><Link to="/"><span>W</span>ave<span>N</span>ative</Link></div>
                <div className="navbar-text">One small wave, one giant leap</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><Link to="/" className="react-link nav-link">Home</Link></li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;