import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/pages/usersListPage";
import UserPage from "../components/pages/userPage";
import EditUserPage from "../components/pages/editUserPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const { userId, edit } = useParams();
    const currrentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId
                    ? (edit
                        ? (userId === currrentUserId
                            ? <EditUserPage />
                            : <Redirect to={`/users/${currrentUserId}`} />
                        )
                        : <UserPage userId={userId} />
                    )
                    : <UsersListPage />
                }
            </UsersLoader>
        </>
    );
};

export default Users;
