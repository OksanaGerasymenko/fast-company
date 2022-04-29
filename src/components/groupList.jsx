import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem, isHorizontal }) => {
    const arrayOfItems = Array.isArray(items)
        ? items
        : Object.keys(items).reduce((key) => items[key], []);
    return (
        <>
            <ul className={"list-group" + (isHorizontal ? " list-group-horizontal list-group-flush" : "")}>
                {arrayOfItems.map((item) => (
                    <li
                        className={"list-group-item" + (item === selectedItem ? " active" : "")}
                        key={item[valueProperty]}
                        onClick={() => onItemSelect(item)}
                        role = "button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
            </ul>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name",
    isHorizontal: false
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    isHorizontal: PropTypes.bool
};
export default GroupList;
