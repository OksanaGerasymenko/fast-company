import React, { useState, useEffect } from "react";
import UsersTable from "../ui/usersTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { searchItems } from "../../utils/searchItems";
import GroupList from "../common/groupList";
import SearchStatus from "../ui/searchStatus";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professions";
import { getUsers, getCurrentUserId } from "../../store/users";

const UsersListPage = () => {
    const pageSize = 8;
    const users = useSelector(getUsers());
    const currentUserId = useSelector(getCurrentUserId());
    const [currentPage, setCurrentPage] = useState(1);
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const professions = useSelector(getProfessions());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchString, setSearchString] = useState("");

    const handleBookmark = (userId) => {
        const newArray = users.map((user) => {
            if (user._id === userId) user.bookmark = !user.bookmark;
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleItemSelect = (item) => {
        setSearchString("");
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSearch = (subString) => {
        if (selectedProf) clearFilter();
        setSearchString(subString);
    };
    const filterUsers = (data) => {
        const filteredUsers = searchString
            ? searchItems(data, "name", searchString)
            : selectedProf
                ? data.filter(user => {
                    const { ...destructUserProf } = user.profession;
                    return destructUserProf._id === selectedProf._id;
                })
                : data;
        return filteredUsers.filter(user => user._id !== currentUserId);
    };

    if (!users) return "Loading...";

    const filteredUsers = filterUsers(users);
    const sorteredUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sorteredUsers, currentPage, pageSize);
    const count = filteredUsers.length;
    return (
        <div className = "d-flex">
            <div className = "d-flex flex-column flex-shrink-0 p-3">
                {professions && !professionLoading && (
                    <>
                        <GroupList
                            items = {professions}
                            onItemSelect = {handleItemSelect}
                            selectedItem = {selectedProf}
                        />
                        <button className = "btn btn-secondary mt-2" onClick = {clearFilter}>????????????????</button>
                    </>
                )}
            </div>
            <div className = "d-flex flex-column">
                <SearchStatus length={count} />
                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="Search..."
                    value = {searchString}
                    onChange={() => handleSearch(event.target.value)}
                />
                <UsersTable
                    users = {usersCrop}
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
};

export default UsersListPage;
