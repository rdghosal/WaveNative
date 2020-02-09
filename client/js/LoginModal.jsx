import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { userTypes, User } from "./User";

export default function LoginModal() {
    const { currentUser, setUser } = useContext(GlobalContext);
    const [ isNewUser, toggleUserStatus ] = useState(false); // Switch b/w login and registration

    // Conditional rendering depending on user login status
    if (!currentUser) {
        return (
            <div className="login-modal">
                {   !isNewUser 
                        &&  <form method="POST" action="/api/login" id="login">
                                <input type="text" className="" placeholder="Username"/>
                                <input type="password" className="" name="password" placeholder="Password"/>
                                <input type="submit" className="btn btn-primary" onSubmit={ handleSubmit } value="Log In"/>
                                <button className="btn btn-success" onClick={ () => toggleUserStatus(true) }>Sign Up</button>
                                <button className="btn btn-red" onClick={ () => setUser(new User(undefined, userTypes.GUEST)) }>
                                    Continue as guest</button>
                            </form>
                } 
                {
                    isNewUser 
                        &&  <form method="POST" action="/api/register" id="registration">
                                <input type="text" className="" name="username" placeholder="Username"/>
                                <input type="password" className="" name="password" placeholder="Password"/>
                                <label htmlFor=""></label>
                                <input type="text" className="" name="age" placeholder="Age"/>
                                <input type="text" className="" name="country" placeholder="Country"/>
                                <input type="submit" className="btn btn-primary" onSubmit={ handleSubmit } value="Submit"/>
                                <button className="btn btn-secondary" onClick={ () => toggleUserStatus(false) }>Back</button>
                            </form>
                }
            </div>
        );
    }

    // User is logged or using as guest
    return null;
}


function checkPassword(password) {
    return;
}

async function handleSubmit(e) {    
    e.preventDefault();
    let formData = new FormData();
    const form = document.getElementsByTagName("form")[0];
    const formId = form.getAttribute("id")
    const url = form.getAttribute("action");

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
    } else return; // TODO err handler
}


export default LoginModal;