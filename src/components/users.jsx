import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = (props) => {
  const count = props.users.length;
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (count === 0) return "";

  const usersCrop = paginate(props.users, currentPage, pageSize);
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
              onDelete={() => props.onDelete(user._id)}
              onChangeBookmark={() => props.onChangeBookmark(user._id)}
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

export default Users;
