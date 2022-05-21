import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {
                    options.map(option =>
                        <div
                            className="form-check form-check-inline"
                            key={`${option.name}_${option._id}`} >
                            <input
                                className="form-check-input"
                                type="radio"
                                name={name}
                                id={`${option.name}_${option._id}`}
                                value={option._id}
                                checked={option._id === value}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`${option.name}_${option._id}`}
                            >
                                {option.name}
                            </label>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
RadioField.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
