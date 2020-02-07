import React from "react";
import { BrowserRouter as Router, withRouter, Route, Link, Switch } from "react-router-dom";
import { App } from "./App";
import Landing from "./Landing";
// import HowTo from "./HowToUse";
import History from "./History";
import { GlobalProvider } from "./GlobalContext";
            
const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() => <GlobalProvider><Landing /></GlobalProvider>} />
                <Route path="/app/:word?" render={() => <GlobalProvider><App /></GlobalProvider>} />
                {/* <Route path="/how-to/" component={ HowTo } /> */}
                <Route path="/history/" render={() => <GlobalProvider><History /></GlobalProvider>} /> 
            </Switch>
        </Router>
    );
}

export default AppRouter;
