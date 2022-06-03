import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    {comments && comments.map(comment =>
                        <Comment
                            id={comment._id}
                            userId={comment.userId}
                            content={comment.content}
                            created={comment.created_at}
                            key={comment._id}
                            onRemove={onRemove}
                        />)}
                </div>
            </div>
        </div>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
export default CommentsList;
