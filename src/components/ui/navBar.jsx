import React, { useState } from "react";
import Menu from "../common/menu";
import { useHistory } from "react-router";

const menu = [
    { _id: 1, name: "Main", path: "/" },
    { _id: 2, name: "Login", path: "/login" },
    { _id: 3, name: "Users", path: "/users" }
];

const NavBar = () => {
    const history = useHistory();
    const menuActive = menu.find(item => item.path === history.location.pathname);
    const [menuItem, setMenuItem] = useState(menuActive);
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
