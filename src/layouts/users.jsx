import React from "react";
import UsersListPage from "../components/pages/userListPage";
import UserPage from "../components/pages/userPage";
import EditPage from "../components/ui/editForm";
import { useParams } from "react-router-dom";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            {userId && edit
                ? <EditPage userId={userId} />
                : userId
                    ? <UserPage userId={userId} />
                    : <UsersListPage />
            }
        </>
    );
};

export default Users;
