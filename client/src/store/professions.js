import { createSlice } from "@reduxjs/toolkit";
import professsionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        requested: (state) => {
            state.isLoading = true;
        },
        recived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
            state.lastFetch = Date.now();
        },
        requestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { requested, recived, requestFailed } = actions;

function isOutDated(date) {
    if (Date.now() - date > 600 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async(dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(requested);
        try {
            const { content } = await professsionService.get();
            dispatch(recived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(p => p._id === id);
    };
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export default professionsReducer;
