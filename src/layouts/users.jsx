import React from "react";
import UsersListPage from "../components/pages/usersListPage";
import UserPage from "../components/pages/userPage";
import EditUserPage from "../components/pages/editUserPage";
import { useParams } from "react-router-dom";
import { UserProvider } from "../hooks/useUser";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UserProvider>
                {userId && edit
                    ? <EditUserPage />
                    : userId
                        ? <UserPage userId={userId} />
                        : <UsersListPage />
                }
            </UserProvider>
        </>
    );
};

export default Users;
