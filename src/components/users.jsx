import React, {useState} from "react";
import api from "../api"


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const getBageClasses = () => {
        let classes = "badge p-2 m-2 "
        classes += users.length === 0 ? "bg-danger" : "bg-primary";
        return classes;
    }

    const renderPhrase = (numbers) => {
        if (numbers === 0) return "Никто с тобой не тусанет";
        if (numbers === 1) return "1 человек тусанет с тобой сегодня";
        let phrase = `${numbers}`;
        phrase += ((numbers % 10 === 2 || numbers % 10 === 3 || numbers % 10 === 4)  && (numbers > 20 || numbers < 10))
            ? ' человека'
            : ' человек';
        return phrase += ' тусанут с тобой сегодня';
    }

    const getQualityClasses = (color) => "badge m-1 p-1 bg-"+color;

    const getQualitiesForTable = (qualities) => {
        return (
            <>
               { qualities.map(quality =>
                    <span className={getQualityClasses(quality.color)} key={quality._id}>{quality.name}</span>
                )}
            </>
        )
    }

    const handleBookmark = (userId) => {
        setUsers(users.map(user => {
            if (user._id === userId)  user.bookmark = !user.bookmark;
            return user;
        }))
    }

    const getBookMark = (userId, bookmark) => {
        return (
            <div  onClick = {() => handleBookmark(userId)}>
                {
                    bookmark
                        ?  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                      </svg>
                        :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star" viewBox="0 0 16 16">
                        <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                      </svg>
                }

            </div>

        )
    }
    const renderTable = () => {
        if (users.length === 0) return "";
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
                    {users.map(user =>
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{ getQualitiesForTable(user.qualities) }</td>
                            <td>{user.profession.name}</td>
                            <td className="text-center">{user.completedMeetings}</td>
                            <td className="text-center">{user.rate}/5</td>
                            <td className="text-center">{getBookMark(user._id, user.bookmark)}</td>
                            <td><button
                                    className="btn btn-danger"
                                    onClick = {() => handleDelete(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>

                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <h2><span className={ getBageClasses() }> { renderPhrase(users.length) } </span></h2>
            { renderTable() }
    </>
    )
}

export default Users;
