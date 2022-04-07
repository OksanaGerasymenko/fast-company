import React from "react";

const Qualities = (props) => {
  const qualities = props.qualities;

  const getQualityClasses = (color) => "badge m-1 p-1 bg-" + color;

  return (
    <>
      {qualities.map((quality) => (
        <span className={getQualityClasses(quality.color)} key={quality._id}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

export default Qualities;
