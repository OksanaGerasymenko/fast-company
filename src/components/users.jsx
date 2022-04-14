import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, onDelete, onChangeBookmark }) => {
    const pageSize = 2;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();

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

    const clearFilter = () => {
        setSelectedProf();
    };

    const filteredUsers = selectedProf
        ? users.filter(user => {
            const { ...destructUserProf } = user.profession;
            return destructUserProf._id === selectedProf._id;
        })
        : users;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);

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
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersCrop.map((user) => (
                            <User
                                key={user._id}
                                onDelete={() => onDelete(user._id)}
                                onChangeBookmark={() =>
                                    onChangeBookmark(user._id)
                                }
                                {...user}
                            />
                        ))}
                    </tbody>
                </table>
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
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeBookmark: PropTypes.func.isRequired
};

export default Users;
