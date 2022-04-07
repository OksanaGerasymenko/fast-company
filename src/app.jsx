import React, { useState } from "react";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

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

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onChangeBookmark={handleBookmark}
      />
    </>
  );
};

export default App;
