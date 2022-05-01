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
      editLink = <a href="/users/edit" className="user-show-edit-link">
        <i className="fa-solid fa-gear"></i> Edit profile
      </a>
    }
  }

  let bio = "";
  if (showUser.bio !== null) {
    if (showUser.bio.trim() !== "") {
      bio = <p><strong>Bio: </strong><br />
        {showUser.bio}
      </p>
    }
  }

  return (
    <div className="user-show-parent-container">
      <div className="user-show-info-div">
        <div
          style={{ backgroundImage: `url(${showUser.avatar.url})` }}
          className="user-show-avatar background-image"
        >
        </div>

        <div className="user-show-text-div">
          {editLink}
          <p className="user-show-username">{showUser.username}</p>
          <p className="user-show-full-name">{`${showUser.first_name} ${showUser.last_name}`}</p>
          {bio}
        </div>
      </div>
    </div>
  );
};

export default UserShow;
