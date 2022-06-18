import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../hooks/useQuality";

const Qualities = ({ qualitiesId }) => {
    const getQualityClasses = (color) => "badge m-1 p-1 bg-" + color;
    const { isLoading, getQualitiesForUser } = useQuality();
    const qualities = getQualitiesForUser(qualitiesId);
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
