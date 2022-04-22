import React, { useState, useEffect } from "react";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = () => {
    const pageSize = 8;
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) user.bookmark = !user.bookmark;
                return user;
            })
        );
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        api.professions.fetchAll().then((data) => { setProfessions(data); });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleItemSelect = (item) => {
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => {
                const { ...destructUserProf } = user.profession;
                return destructUserProf._id === selectedProf._id;
            })
            : users;

        const sorteredUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sorteredUsers, currentPage, pageSize);

        const count = filteredUsers.length;
        if (count === 0) return "";

        return (
            <div className = "d-flex">
                <div className = "d-flex flex-column flex-shrink-0 p-3">
                    {professions && (
                        <>
                            <GroupList
                                items = {professions}
                                onItemSelect = {handleItemSelect}
                                selectedItem = {selectedProf}
                            />
                            <button className = "btn btn-secondary mt-2" onClick = {clearFilter}>Очистить</button>
                        </>
                    )}
                </div>
                <div className = "d-flex flex-column">
                    <SearchStatus length={count} />
                    <UsersTable
                        users = {usersCrop}
                        onDelete = {handleDelete}
                        onChangeBookmark = {handleBookmark}
                        onSort = {handleSort}
                        selectedSort = {sortBy}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            countItems={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default Users;
