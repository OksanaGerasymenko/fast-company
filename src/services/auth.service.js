import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

const authService = {
    register: async({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?`;
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    signIn: async({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?`;
        const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
        return data;
    },
    refresh: async() => {
        const url = "https://securetoken.googleapis.com/v1/token?";
        const { data } = await httpAuth.post(url, {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
