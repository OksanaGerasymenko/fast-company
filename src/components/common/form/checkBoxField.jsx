import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, children, onChange, error }) => {
    const classes = "form-check-input" + (error ? " is-invalid" : "");
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className={classes}
                type="checkbox"
                id={name}
                value=""
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>{children}</label>
            {
                error && <div className="invalid-feedback">{error}</div>
            }
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};

export default CheckBoxField;
