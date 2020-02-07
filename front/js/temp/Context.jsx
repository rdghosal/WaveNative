import React, { useState} from "react"


const LoginContext = React.createContext(false, () => {}); //initalize context mutator w/o defining 

const LoginProvider = () => {
    const [loggedIn, changeLoginStatus] = useState(false);

    return (
        <LoginContext.Provider value={[loggedIn, changeLoginStatus]}>
        </LoginContext.Provider>
    );
}


export { LoginContext, LoginProvider };
