import React, { useEffect, useState } from "react";

const UserShow = (props) => {
  const [user, setUser] = useState("");

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
      <p>{user.email}</p>
    </div>
  );
};

export default UserShow;
