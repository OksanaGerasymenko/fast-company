import React, { useState, useEffect } from "react";
import { orderBy } from "lodash";
import { useParams } from "react-router";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then(data => setComments(data));
    }, []);

    const sorteredComments = orderBy(comments, ["created_at"], ["desc"]);
    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then(id => setComments(comments.filter(comment => comment._id !== id)));
    };
    const handleSubmit = (data) => {
        console.log(comments);
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => {
                setComments([...comments, data]);
                console.log(comments);
            });
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
                    <CommentsList
                        comments={sorteredComments}
                        onRemove={handleRemove}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
