import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?/:edit?" component={Users} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
};

export default App;
