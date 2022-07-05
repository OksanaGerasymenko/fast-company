import React from "react";
import QualitiesCard from "../ui/qualitiesCard";
import UserCard from "../ui/userCard";
import MeetingsCard from "../ui/meetingsCard";
import Comments from "../ui/comments";
import PropTypes from "prop-types";
import { CommentProvider } from "../../hooks/useComment";
import { useSelector } from "react-redux";
import { getUserById } from "../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    return (
        <div className="container">
            {user
                ? <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>
                        <QualitiesCard qualitiesId={user.qualities}/>
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentProvider>
                            <Comments />
                        </CommentProvider>
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
