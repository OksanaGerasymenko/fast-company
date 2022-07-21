import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Menu = ({ items, onItemSelect, valueProperty, contentProperty, selectedItem, isHorizontal }) => {
    return (
        <nav className={"nav nav-pills" + (!isHorizontal ? " flex-column" : "")}>
            {items.map((item) => (
                <Link
                    to={item.path}
                    className={"nav-link" + (item === selectedItem ? " active" : "")}
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                >
                    {item[contentProperty]}
                </Link>
            ))}
        </nav>
    );
};
Menu.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name",
    isHorizontal: true
};
Menu.propTypes = {
    items: PropTypes.array,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    isHorizontal: PropTypes.bool
};

export default Menu;
