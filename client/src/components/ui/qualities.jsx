import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getQualitiesLoadingStatus, getQualitiesByIds, loadQualitiesList } from "../../store/qualities";

const Qualities = ({ qualitiesId }) => {
    const dispatch = useDispatch();
    const getQualityClasses = (color) => "badge m-1 p-1 bg-" + color;
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualities = useSelector(getQualitiesByIds(qualitiesId));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            {!isLoading
                ? (
                    qualities.map((quality) => (
                        <span
                            className={getQualityClasses(quality.color)}
                            key={quality._id}
                        >
                            {quality.name}
                        </span>
                    ))
                )
                : <>loading...</>
            }
        </>
    );
};
Qualities.propTypes = {
    qualitiesId: PropTypes.array
};

export default Qualities;
