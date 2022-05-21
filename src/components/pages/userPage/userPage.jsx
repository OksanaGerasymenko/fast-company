import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";
import api from "../../../api";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then(user => setUser(user));
    }, []);

    return (
        <>
            {user
                ? <div className="card w-25 text-center m-3">
                    <h2 className="card-header">{user.name}</h2>
                    <div className="card-body">
                        <h4 className="card-text">Профессия: {user.profession.name}</h4>
                        <p><Qualities qualities={user.qualities} /></p>
                        <p className="card-text">completedMeetings:{user.completedMeetings}</p>
                        <h5 className="card-text mb-2">Rate: {user.rate}</h5>
                        <Link to={`/users/${userId}/edit`} className="btn btn-warning me-2">Изменить</Link>
                        <Link to="/users" className="btn btn-warning">Все пользователи</Link>
                    </div>
                </div>
                : "Loading..."}
        </>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
