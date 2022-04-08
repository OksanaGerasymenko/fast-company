import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onChangeBookmark }) => {
    const count = users.length;
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (count === 0) return "";

    const usersCrop = paginate(users, currentPage, pageSize);
    return (
        <>
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
            <Pagination
                countItems={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeBookmark: PropTypes.func.isRequired
};

export default Users;
