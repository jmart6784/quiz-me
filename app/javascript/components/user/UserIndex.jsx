import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "../layouts/Pagination";

const UserIndex = () => {
  let pageSize = 16;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

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

  let usersJsx = usersPage.map((user) => {
    return (
      <div key={user.id} className="user-index-div">
        <Link to={`users/${user.id}`}>
          <div
            style={{ backgroundImage: `url(${user.avatar.url})` }}
            className="background-image user-index-avatar"
          ></div>
        </Link>
        <Link to={`users/${user.id}`} className="user-index-link">{user.username}</Link>
      </div>
    );
  });

  return (
    <div className="user-index-parent-container">
      <div className="users-container">{usersJsx}</div>

      <Pagination 
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserIndex;
