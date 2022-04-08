import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    const getQualityClasses = (color) => "badge m-1 p-1 bg-" + color;

    return (
        <>
            {qualities.map((quality) => (
                <span
                    className={getQualityClasses(quality.color)}
                    key={quality._id}
                >
                    {quality.name}
                </span>
            ))}
        </>
    );
};
Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;
