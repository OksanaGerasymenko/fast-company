import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { randomInt } from "../utils/random";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

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
        },
        userUpdateSuccess: (state, action) => {
            const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
            state.entities[userIndex] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    requested,
    recived,
    requestFailed,
    authRequestSuccess,
    userCreated,
    authRequestFailed,
    userLogOut,
    userUpdateSuccess,
    authRequested
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const loadUsersList = () => async(dispatch) => {
    dispatch(requested());
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
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else dispatch(authRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
    history.push("/");
};

export const updateUser = (payload) => async(dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userUpdateSuccess(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getCurrentUser = () => (state) => state.users.entities?.find(user => user._id === state.users.auth.userId);
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
