import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
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

    return (
        users &&
        <Users
            users={users}
            onDelete={handleDelete}
            onChangeBookmark={handleBookmark}
        />
    );
};

export default App;
