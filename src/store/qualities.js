import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
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

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { requested, recived, requestFailed } = actions;

function isOutDated(date) {
    if (Date.now() - date > 600 * 1000) {
        return true;
    }
    return false;
}
export const loadQualitiesList = () => async(dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await qualityService.get();
            dispatch(recived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    };
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qualityId of qualitiesIds) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};
export default qualitiesReducer;
