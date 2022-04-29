import React from "react";
import UsersList from "../components/usersList";
import User from "../components/user";
import { useParams } from "react-router-dom";

const Users = () => {
    const userId = useParams().userId;
    return (
        <>
            {userId ? <User userId={userId} /> : <UsersList />}
        </>
    );
};

export default Users;
