import React, { useContext, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import "../css/Navbar.css";
import { userTypes } from "./User";

const Navbar = () => {
    const { currentUser, setUser } = useContext(GlobalContext);

    const handleLogOut = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
        setUser(null);
        fetch("/api/logout");
    }

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
                        <li className="nav-item"><Link to="/search" className="react-link nav-link">Search</Link></li>
                        { currentUser && currentUser.type === userTypes.USER
                            &&  <>
                                    <li className="nav-item"><Link to="/profiles" className="react-link nav-link">Your Profile</Link></li> 
                                    <li className="nav-item react-link nav-link" onClick={ handleLogOut } id="logout">Log out</li> 
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;