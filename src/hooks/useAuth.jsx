import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

const AuthContext = React.createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setUser] = useState();
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else setLoading(false);
    }, []);
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            localStorageService.setToken(data);
            await createUser({
                _id: data.localId,
                email,
                completedMeetings: randomInt(0, 200),
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            localStorageService.setToken(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неверный пароль"
                    };
                    throw errorObject;
                };
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с таким email не найден"
                    };
                    throw errorObject;
                };
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) { errorCatcher(error); }
    };

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    async function updateUser(data) {
        if (data._id !== currentUser._id) return;
        setLoading(true);
        try {
            const { content } = await userService.create(data);
            setUser(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally { setLoading(false); }
    }
    return (
        <>
            <AuthContext.Provider value ={{ signUp, signIn, currentUser, logOut, updateUser }}>
                {!isLoading ? children : "Loading..."}
            </AuthContext.Provider>
        </>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
