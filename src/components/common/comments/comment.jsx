import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../../utils/formatDate";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ id, userId, content, created, onRemove }) => {
    const user = useUser().getUserById(userId);
    const { currentUser } = useAuth();
    return (
        <div className="d-flex flex-start">
            <img src={user.image ? user.image : ""} className="rounded-circle" width="65"/>
            <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {user.name ? user.name : "author deleted"}
                            <span className="small ms-2">
                                {created ? formatDate(created) : "" }
                            </span>
                        </p>
                        {currentUser._id === userId && (
                            <button
                                className="btn btn-sm text-primary d-flex align-items-center"
                                onClick={() => onRemove(id)}>
                                <i className="bi bi-x-lg"></i>
                            </button>)
                        }
                    </div>
                    <p className="small mb-0">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    id: PropTypes.string,
    userId: PropTypes.string,
    pageId: PropTypes.string,
    content: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onRemove: PropTypes.func
};
export default Comment;
