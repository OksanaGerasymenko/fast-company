import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { randomInt } from "../utils/random";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        requested: (state) => {
            state.isLoading = true;
        },
        recived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
            state.dataLoaded = true;
        },
        requestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { requested, recived, requestFailed, authRequestSuccess, userCreated, authRequestFailed, userLogOut } = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

export const loadUsersList = () => async(dispatch) => {
    dispatch(requested);
    try {
        const { content } = await userService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => state.users.entities?.find(user => user._id === id);

export const signUp = ({ email, password, ...rest }) =>
    async(dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setToken(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(createUser({
                _id: data.localId,
                email,
                completedMeetings: randomInt(0, 200),
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            }));
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

function createUser(payload) {
    return async function(dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
};

export const signIn = ({ payload, redirect }) => async(dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.signIn({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setToken(data);
        history.push(redirect);
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
    history.push("/");
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getCurrentUser = () => (state) => state.users.entities?.find(user => user._id === state.users.auth.userId);

export default usersReducer;
