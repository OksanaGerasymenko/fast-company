import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (user) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {" "}
        <Qualities qualities={user.qualities} />
      </td>
      <td>{user.profession.name}</td>
      <td className="text-center">{user.completedMeetings}</td>
      <td className="text-center">{user.rate}/5</td>
      <td className="text-center">
        <Bookmark
          userId={user._id}
          bookmark={user.bookmark}
          onChangeBookmark={user.onChangeBookmark}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => user.onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
