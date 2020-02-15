import React, { useContext, useState, Fragment, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { userTypes, User } from "./User";
import { withRouter } from "react-router-dom";

const LoginModal = (props) => {
    const { currentUser, setUser } = useContext(GlobalContext);
    const [ isNewUser, toggleUserStatus ] = useState(false); // Switch b/w login and registration

    const loginGuest = async () => {
        const resp = await fetch("/api/guest");
        if (resp.ok) {
            const guest = new User(0, userTypes.GUEST);
            sessionStorage.setItem("user", JSON.stringify(guest));
            setUser(guest);
        }
    }

    async function handleSubmit(e) {    
        
        e.preventDefault();

        console.log(e.value)

        const formData = new FormData(e.target);

        const formId = document.getElementsByTagName("form")[0].id;
        const url = (formId === "login") ? "/api/login" : "/api/register";

        const response = await fetch(url, {
            method: "POST", 
            body: formData
        })

        if (response.ok) {

            // Parse JSON
            const data = await response.json();
            const userId = await data.id;
            const username = await data.username;

            // Cache user info
            const user = new User(userId, username, userTypes.USER);
            sessionStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            // Redirect to profile
            props.history.push(`/profiles/${userId}`)
    
        } else return null; // TODO err handler

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
                <div className="backdrop">
                <div className="login-modal container">
                    <div className="row justify-content-center">
                        <h5 className="modal-title" id="loginModalTitle">{!isNewUser ? "Login" : "Register"}</h5>
                    </div>
                    <div className="login-modal__form container">
                        {   !isNewUser
                                &&  <div>
                                        <form method="POST" id="login" onSubmit={ handleSubmit }>
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
                                                    <button type="submit" className="btn btn-primary">
                                                        Log In
                                                    </button>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <button className="btn btn-success" onClick={ () => toggleUserStatus(true) }>Sign Up</button>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <button className="btn btn-secondary" onClick={ loginGuest }>
                                                        Continue as guest
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                        } 
                        {
                            isNewUser 
                                &&  <>
                                        <form method="POST" id="registration" onSubmit={ handleSubmit }>
                                            <div className="login-modal__input container">
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="username" placeholder="Username"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="password" placeholder="Password"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="confirmation" placeholder="Confirm password"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="age" placeholder="Age"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="country" placeholder="Country"/>
                                                </div>
                                            </div>
                                            <div className="login-modal__buttons container">
                                                <div className="row justify-content-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <button className="btn btn-secondary" onClick={ () => toggleUserStatus(false) }>Back</button>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                        }
                    </div>
                </div>
                </div>
            </Fragment>
        );
    }

    // User is logged or using as guest
    return null;
}

function checkPassword(password) {
    return;
}

export default withRouter(LoginModal);