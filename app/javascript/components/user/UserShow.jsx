import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

const UserShow = (props) => {
  const [user, setUser] = useContext(UserContext);

  const [showUser, setShowUser] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    bio: "",
    avatar: { url: "" },
  });

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/users/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setShowUser(response))
      .catch(() => props.history.push("/"));
  }, []);
  
  let editLink = "";
  if (user.current_user) {
    if (user.current_user.id === showUser.id) {
      editLink = <a href="/users/edit">Edit profile</a>
    }
  }

  return (
    <div className="user-show-parent-container">
      <h1>User Show</h1>

      {editLink}
      <img
        src={showUser.avatar.url}
        height="150"
        width={"150"}
        alt="User profile picture"
      />
      <p>{showUser.username}</p>
      <p>{`${showUser.first_name} ${showUser.last_name}`}</p>
      <p>Bio: <br />
        {showUser.bio}
      </p>
    </div>
  );
};

export default UserShow;
