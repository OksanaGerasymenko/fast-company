import React from "react";
import Bookmark from "./bookmark";
import Table from "./table";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const UsersTable = ({ users, onDelete, onChangeBookmark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities qualities={user.qualities} />
            )
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    userId={user._id}
                    bookmark={user.bookmark}
                    onChangeBookmark={onChangeBookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };

    return (
        <Table { ... { onSort, selectedSort, columns, data: users }} />
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
