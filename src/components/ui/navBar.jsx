/* import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import GroupList from "../common/groupList";
const menu = [
    { _id: 1, name: "Main", path: "/" },
    { _id: 2, name: "Login", path: "/login" },
    { _id: 3, name: "Users", path: "/users" }
];
const NavBar = () => {
    const [menuItem, setMenuItem] = useState(menu[0]);
    const handleItemSelect = (item) => {
        setMenuItem(item);
    };

    return (
        <>
            <h4 className="navBar">
                <GroupList
                    items = {menu}
                    onItemSelect = {handleItemSelect}
                    selectedItem = {menuItem}
                    isHorizontal = {true}
                />
            </h4>
            <Redirect to={menuItem.path}/>
        </>

    );
};

export default NavBar; */

import React, { useState } from "react";
import Menu from "../common/menu";
const menu = [
    { _id: 1, name: "Main", path: "/" },
    { _id: 2, name: "Login", path: "/login" },
    { _id: 3, name: "Users", path: "/users" }
];
const NavBar = () => {
    const [menuItem, setMenuItem] = useState(menu[0]);
    const handleItemSelect = (item) => {
        setMenuItem(item);
    };

    return (
        <>
            <h4 className="navBar">
                <Menu
                    items = {menu}
                    onItemSelect = {handleItemSelect}
                    selectedItem = {menuItem}
                    isHorizontal = {true}
                />
            </h4>
        </>

    );
};

export default NavBar;
