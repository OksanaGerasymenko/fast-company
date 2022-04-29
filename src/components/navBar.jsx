import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import GroupList from "./groupList";

const NavBar = () => {
    const menu = [
        { _id: 1, name: "Main", path: "/" },
        { _id: 2, name: "Login", path: "/login" },
        { _id: 3, name: "Users", path: "/users" }
    ];
    const [menuItem, setMenuItem] = useState(menu[0]);
    const handleItemSelect = (item) => {
        setMenuItem(item);
    };

    return (
        <>
            <GroupList
                items = {menu}
                onItemSelect = {handleItemSelect}
                selectedItem = {menuItem}
                isHorizontal = {true}
            />
            <Redirect to={menuItem.path} />
        </>

    );
};

export default NavBar;
