import React, { useState, useEffect } from "react";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import PropTypes from "prop-types";
import api from "../../../api";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then(user => setUser(user));
    }, []);

    return (
        <div className="container">
            {user
                ? <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>
                        <QualitiesCard qualities={user.qualities}/>
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
                : "Loading..."
            }
        </div>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
