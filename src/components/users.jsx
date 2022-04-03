import React from "react";
import User from "./user";

const Users = (props) => {

    if (props.users.length === 0) return "";

    return (
        <table className="table table-success table-striped">
            <thead>
                <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user =>
                    <User key={user._id}
                        onDelete = {() => props.onDelete(user._id)}
                        onChangeBookmark = {() => props.onChangeBookmark(user._id)}
                        {...user}
                    />
                )}
            </tbody>
        </table>
    )
}

export default Users;
