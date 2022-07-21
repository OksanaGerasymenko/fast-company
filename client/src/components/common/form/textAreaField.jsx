import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const classes = "form-control" + (error ? " is-invalid" : "");
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    className={classes}
                    name={name}
                    rows="3"
                    onChange={handleChange}
                    value={value}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
