import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useParams } from "react-router";
import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";

const CommentContext = React.createContext();
export const useComment = () => {
    return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getComments(userId);
    }, [userId]);
    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUser._id,
            created_at: Date.now()
        };
        try {
            const { content } = await commentService.create(comment);
            setComments(prevState => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getComments(userId) {
        try {
            const { content } = await commentService.get(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally { setLoading(false); }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.remove(id);
            if (content === null) {
                setComments(prevState => prevState.filter(comment => comment._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <CommentContext.Provider value={{ comments, createComment, isLoading, removeComment }}>
            {children}
        </CommentContext.Provider>
    );
};
CommentProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
