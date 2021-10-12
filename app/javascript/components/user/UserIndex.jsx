import React, { useEffect, useState } from "react";

const UserIndex = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUsers(response))
      .catch(() => console.log("Error getting users index"));
  }, []);

  let usersJsx = users.map((user) => {
    return (
      <div key={user.id}>
        <p>{user.email}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Users Index</h1>
      {usersJsx}
    </div>
  );
};

export default UserIndex;
