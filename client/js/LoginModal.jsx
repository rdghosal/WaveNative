import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { userTypes, User } from "./User";

export default function LoginModal() {

    const { currentUser, setUser } = useContext(GlobalContext);
    const [ isNewUser, toggleUserStatus ] = useState(false);

    const handleLogin = async () => {
        // TODO: lookup form data retrieval
        const response = await fetch("/api/login", {
            method: "POST", 
            body: {
                // TODO insert form data
            }
        });

        if (await response.ok) {
            // Cache user info as global state
            const data = await response.json();
            const userId = await data.userId;
            setUser(userId, userTypes.USER);
        } else return; // TODO: error handler
    }

    const handleSubmit = async (url, formData) => {
        // Take in event as arg?
        const response = await fetch("/api/register", {
            method: "POST",
            body: {} // TODO using form data
        });

        if (await response.ok) {
            const data = await response.json();
            const userId = await data.userId;
            setUser(new User(userId, userTypes.USER));
        } else return; // TODO
    }

    if (!currentUser) {
        return (
            <div className="login-modal">
                { !isNewUser 
                    &&  <form method="POST" action="/api/login">
                            <input type="text" className="" placeholder="username"/>
                            <input type="password" className="" name="password"/>
                            <button className="btn btn-primary" onSubmit={ handleLogin }>Log In</button>
                            <button className="btn btn-success" onClick={ () => toggleUserStatus(true) }>Sign Up</button>
                            <button className="btn btn-red" onClick={ () => setUser(new User(undefined, userTypes.GUEST)) }>
                                Continue as guest</button>
                        </form>
                } 
                {
                    isNewUser 
                        &&  <form method="POST" action="/api/register">
                                <input type="text" className="" name="username" placeholder="Username"/>
                                <input type="password" className="" name="password" placeholder="Password"/>
                                <label htmlFor=""></label>
                                <input type="text" className="" name="age" placeholder="Age"/>
                                <input type="text" className="" name="country" placeholder="Country"/>
                                <button className="btn btn-primary" onSubmit={ handleRegistration }>Submit</button>
                                <button className="btn btn-secondary" onClick={() => toggleUserStatus(false)}>Back</button>
                            </form>
                }
            </div>
        );
    }

    return null;
}

export default LoginModal;