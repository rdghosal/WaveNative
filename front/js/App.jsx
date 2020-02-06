import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from "./GlobalContext";
import Landing from "./Landing";

const App = () => {
    // Render routes embedded in global context
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() => <GlobalProvider><Landing /></GlobalProvider>} />
                {/* <Route path="/search/:word?" render={() => <GlobalProvider><Search /></GlobalProvider>} /> */}
                {/* <Route path="/history/" render={() => <GlobalProvider><History /></GlobalProvider>} />  */}
            </Switch>
        </Router>
    );
}
 
export default App;