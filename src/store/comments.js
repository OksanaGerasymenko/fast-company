import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        requested: (state) => {
            state.isLoading = true;
        },
        recived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        },
        requestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        createdSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            };
            state.entities.push(action.payload);
        },
        removedSuccess: (state, action) => {
            state.entities = state.entities.filter(c => c._id !== action.payload.id);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("comments/createRequested");
const createRequestFailed = createAction("comments/createRequestFailed");
const removeRequested = createAction("comments/removeRequestedd");
const removeRequestFailed = createAction("comments/removeRequestFailed");

export const loadCommentsList = (userId) => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await commentService.get(userId);
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createComment = ({ data, userId, currentUserId }) => async(dispatch) => {
    dispatch(createRequested());
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        userId: currentUserId,
        created_at: Date.now()
    };
    try {
        const { content } = await commentService.create(comment);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeComment = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await commentService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
