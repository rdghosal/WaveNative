import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from "./GlobalContext";
import Landing from "./Landing";
import { Search } from "./Search";
import Profile from "./Profile";
import "../css/App.css";

const App = () => {
    // Render routes embedded in global context
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={(props) =><GlobalProvider><Landing {...props} /></GlobalProvider>} />
                <Route path="/search/:word?" render={(props) => <GlobalProvider><Search {...props}/></GlobalProvider>} />
                <Route path="/profiles/:userId?" render={() => <GlobalProvider><Profile /></GlobalProvider>} /> 
            </Switch>
        </Router>
    );
}
 
export default App;