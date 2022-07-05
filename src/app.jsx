import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                <AuthProvider>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                        <Route path="/logOut" component={LogOut} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </>
    );
};

export default App;
