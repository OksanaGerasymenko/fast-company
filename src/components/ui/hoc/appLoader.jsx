import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn, loadUsersList, getUsersLoadingStatus } from "../../../store/users";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersLoadingStatus = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (usersLoadingStatus) return "Loading...";
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AppLoader;
