import React, { useContext, useState, Fragment, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { userTypes, User } from "./User";

const LoginModal = () => {
    const { currentUser, setUser } = useContext(GlobalContext);
    const [ isNewUser, toggleUserStatus ] = useState(false); // Switch b/w login and registration

    async function handleSubmit(e) {    
        
        e.preventDefault();
        const formData = new FormData(e.target);

        const response = await fetch("/api/login", {
            method: "POST", 
            body: formData
        })

        if (response.ok) { // TODO get username
            const data = await response.json();
            const userId = await data.userId;
            const user = new User(userId, userTypes.USER)
            sessionStorage.setItem("user", user);
            setUser(user);
            console.log(currentUser)
        } else return; // TODO err handler

    }

    const loginGuest = async () => {
        const resp = await fetch("/api/guest");
        if (resp.ok) {
            const guest = new User(undefined, userTypes.GUEST);
            sessionStorage.setItem("user", JSON.stringify(guest));
            setUser(guest);
        }
    }

    useEffect(() => {
        if (!currentUser) {
            // Get user from sessionStorage (e.g. for page refresh)
            const user = JSON.parse(sessionStorage.getItem("user"));
            setUser(user);
        }   
    })

    // Conditional rendering depending on user login status
    // TODO: rename container for form and guest/back buttons
    if (!sessionStorage.getItem("user")) {
        return (
            <Fragment>
                <div className="login-modal container">
                    <div className="row justify-content-center">
                        <h5 className="modal-title" id="loginModalTitle">{!isNewUser ? "Login" : "Register"}</h5>
                    </div>
                    <div className="login-modal__form container">
                        {   !isNewUser
                                &&  <div>
                                        <form method="POST" id="login" onSubmit={handleSubmit}>
                                            <div className="login-modal__input container">
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="username" placeholder="Username"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="password" placeholder="Password"/>
                                                </div>
                                            </div>
                                            <div className="login-modal__buttons container">
                                                <div className="row justify-content-center">
                                                    <button type="submit" className="btn btn-primary" value="Log In">
                                                        Log In
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="row justify-content-center">
                                            <button className="btn btn-success" onClick={ () => toggleUserStatus(true) }>Sign Up</button>
                                        </div>
                                        <div className="row justify-content-center">
                                            <button className="btn btn-red" onClick={ loginGuest }>
                                                Continue as guest
                                            </button>
                                        </div>
                                    </div>
                        } 
                        {
                            isNewUser 
                                &&  <div>
                                        <form method="POST" id="registration" onSubmit={ handleSubmit }>
                                            <div className="login-modal__input container">
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="username" placeholder="Username"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="password" placeholder="Password"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="passowrd" className="" name="confirmation" placeholder="Password"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="age" placeholder="Age"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="country" placeholder="Country"/>
                                                </div>
                                            </div>
                                            <div className="login-modal__buttons container">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                        <div className="row justify-content-center">
                                            <button className="btn btn-secondary" onClick={ () => toggleUserStatus(false) }>Back</button>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
                <div className="backdrop"></div>
            </Fragment>
        );
    }

    // User is logged or using as guest
    return null;
}

function checkPassword(password) {
    return;
}

export default LoginModal;