import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
