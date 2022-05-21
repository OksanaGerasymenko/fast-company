import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, name, onChange, label, value }) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;
    const handleChange = (value) => {
        onChange({ name: name, value: value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            {
                options &&
                <Select
                    value={value}
                    isMulti
                    name={name}
                    options={optionsArray}
                    closeMenuOnSelect={false}
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={handleChange}
                />
            }
        </div>

    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.array
};

export default MultiSelectField;
