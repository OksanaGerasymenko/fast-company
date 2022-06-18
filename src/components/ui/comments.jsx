import React from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { useComment } from "../../hooks/useComment";

const Comments = () => {
    const { comments, createComment, removeComment, isLoading } = useComment();
    const sorteredComments = orderBy(comments, ["created_at"], ["desc"]);
    const handleRemove = (id) => {
        removeComment(id);
    };
    const handleSubmit = (data) => {
        createComment(data);
    };
    return (
        <>
            { !isLoading &&
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
                            <CommentsList
                                comments={sorteredComments}
                                onRemove={handleRemove}
                            />
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Comments;
