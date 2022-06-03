import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { formatDate } from "../../../utils/formatDate";

const Comment = ({ id, userId, content, created, onRemove }) => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        api.users.getById(userId).then((user) => setUserName(user.name));
    }, []);
    return (
        userName
            ? <div className="d-flex flex-start">
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`}
                    className="rounded-circle"
                    width="65"
                />
                <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                {userName}
                                <span className="small ms-2">
                                    {formatDate(created)}
                                </span>
                            </p>
                            <button
                                className="btn btn-sm text-primary d-flex align-items-center"
                                onClick={() => onRemove(id)}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <p className="small mb-0">
                            {content}
                        </p>
                    </div>
                </div>
            </div>
            : <h6>Loading...</h6>
    );
};
Comment.propTypes = {
    id: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onRemove: PropTypes.func
};
export default Comment;
