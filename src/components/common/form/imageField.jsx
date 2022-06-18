import React from "react";
import PropTypes from "prop-types";

const ImageField = ({ label, name, value, onChange }) => {
    const handleChange = (e) => {
        const newSrc = `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`;
        e.preventDefault();
        e.target.src = newSrc;
        onChange({ name: e.target.name, value: newSrc });
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <div className="d-flex align-items-end mb-3">
                <img src={value} value={value} className="p-2 rounded-circle" name={name} width="150px" onClick={handleChange}/>
                <label className="form-label">Кликните по фото, чтобы изменить</label>
            </div>
        </div>

    );
};
ImageField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default ImageField;
