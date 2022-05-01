import React, { useEffect, useState } from "react";

const UserShow = (props) => {
  const [user, setUser] = useState({
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
      .then((response) => setUser(response))
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>User Show</h1>
      <a href="/users/edit">Edit profile</a>
      <img
        src={user.avatar.url}
        height="150"
        width={"150"}
        alt="User profile picture"
      />
      <p>{user.username}</p>
      <p>{`${user.first_name} ${user.last_name}`}</p>
    </div>
  );
};

export default UserShow;
