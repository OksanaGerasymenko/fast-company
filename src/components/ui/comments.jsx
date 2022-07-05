import React, { useEffect } from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { useComment } from "../../hooks/useComment";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsList, getCommentsLoadingStatus, getComments } from "../../store/comments";
import { useParams } from "react-router";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => { dispatch(loadCommentsList(userId)); }, [userId]);
    const { createComment, removeComment } = useComment();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const sorteredComments = orderBy(comments, ["created_at"], ["desc"]);
    const handleRemove = (id) => {
        removeComment(id);
    };
    const handleSubmit = (data) => {
        createComment(data);
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>New comment</h2>
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    {!isLoading
                        ? <CommentsList
                            comments={sorteredComments}
                            onRemove={handleRemove}
                        />
                        : "Loading..."
                    }
                </div>
            </div>
        </>
    );
};

export default Comments;
