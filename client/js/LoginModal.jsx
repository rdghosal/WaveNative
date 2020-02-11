import React, { useContext, useState, Fragment } from "react";
import { GlobalContext } from "./GlobalContext";
import { userTypes, User } from "./User";

const LoginModal = () => {
    const { currentUser, setUser } = useContext(GlobalContext);
    const [ isNewUser, toggleUserStatus ] = useState(false); // Switch b/w login and registration

    async function handleSubmit(e) {    
        e.preventDefault();
        let formData = new FormData();
        const form = document.getElementsByTagName("form")[0];
        const formId = form.getAttribute("id")
        const url = form.getAttribute("action");

        // TODO refactor from iteration to simplying grabbing form element
        const fieldNames = ["username", "password", "age", "country"];
        
        let END = (form.getAttribute("id") === "login") ? 2 : fieldNames.length; // Set end of iteration

        for (let i = 0; i < END; i++) { // Iterate over form and memo values
            let currField = fieldNames[i];
            let fieldValue = document.getElementsByName(currField)[0].value;

            // Check whether all fields are filled in
            if (!fieldValue) {
                return alert(`Please fill in ${currField.toUpperCase()}!`);
            }

            // Check password if registering
            if (currentField === "password" && formId === "registration") {
                if (!checkPassword(fieldValue)) {
                    return alert("Password must be 8-12 characters long and contain\nat least one upper case and lowercase letter, digit, and special character.");
                }
            }
            formData.append(currField, currEl.value);
        }

        const response = await fetch(url, {
            method: "POST", 
            body: formData
        })

        if (response.ok) { // TODO check if await needed
            const data = await response.json();
            const userId = await data.userId;
            setUser(new User(userId, userTypes.USER));
            console.log(currentUser)
            window.localStorage.setItem("user", currentUser);
        } else return; // TODO err handler
    }

    const loginGuest = async () => {
        const resp = await fetch("/api/guest");
        if (resp.ok) {
            const guest = new User(undefined, userTypes.GUEST);
            sessionStorage.setItem("user", JSON.stringify(guest));
            setUser(guest);
            return;
        }
    }

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
                                        <form method="POST" action="/api/login" id="login">
                                            <div className="login-modal__input container">
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" placeholder="Username"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="password" placeholder="Password"/>
                                                </div>
                                            </div>
                                            <div className="login-modal__buttons container">
                                                <div className="row justify-content-center">
                                                    <input type="submit" className="btn btn-primary" onSubmit={ handleSubmit } value="Log In"/>
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
                                        <form method="POST" action="/api/register" id="registration">
                                            <div className="login-modal__input container">
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="text" className="" name="username" placeholder="Username"/>
                                                </div>
                                                <div className="row justify-content-center login-modal__input--text">
                                                    <input type="password" className="" name="password" placeholder="Password"/>
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
                                                    <input type="submit" className="btn btn-primary" onSubmit={ handleSubmit } value="Submit"/>
                                                </div>
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