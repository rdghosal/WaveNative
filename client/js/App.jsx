import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from "./GlobalContext";
import Landing from "./Landing";
import { Search } from "./Search";
import "./App.css";

const App = () => {
    // Render routes embedded in global context
    return (
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Landing /> } />
                    <Route path="/search/:word?" render={() => <Search />} />
                    {/* <Route path="/history/" render={() => <GlobalProvider><History /></GlobalProvider>} />  */}
                </Switch>
            </Router>
        </GlobalProvider>
    );
}
 
export default App;