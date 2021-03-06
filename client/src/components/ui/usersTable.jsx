import React from "react";
import Bookmark from "../ui/bookmark";
import Table from "../common/table";
import PropTypes from "prop-types";
import Qualities from "../ui/qualities";
import Profession from "./profession";

const UsersTable = ({ users, onChangeBookmark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualitiesId={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
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
        }
    };

    return (
        <Table { ... { onSort, selectedSort, columns, data: users }} />
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onChangeBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
