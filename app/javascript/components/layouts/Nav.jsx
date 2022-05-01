import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const [user, setUser] = useContext(UserContext);

  let jsxResult;

  if (user.current_user) {
    jsxResult = (
      <div className="nav-parent">
        <Link to="/">
          <i className="fa-solid fa-book-atlas"></i> Quiz Me
        </Link>
        <Link to="/quizzes/new">
          <i className="fa-solid fa-hammer"></i> <span className="nav-text">Build Quiz</span>
        </Link>
        <Link to="/users">
          <i className="fa-solid fa-people-group"></i> <span className="nav-text">People</span>
        </Link>
        <Link to={`/users/${user.current_user.id}`}>
          <i className="fa-solid fa-face-laugh-beam"></i> <span className="nav-text">{user.current_user.username}</span>
        </Link>
        <a href="/users/edit">
          <i className="fa-solid fa-gear"></i> <span className="nav-text">Edit Profile</span></a>
        <a rel="nofollow" data-method="delete" href="/users/sign_out">
          <i className="fa-solid fa-power-off"></i> <span className="nav-text">Log out</span>
        </a>
      </div>
    );
  } else {
    jsxResult = (
      <div className="nav-parent">
        <Link to="/">
          <i className="fa-solid fa-book-atlas"></i> Quiz Me
        </Link>
        <Link to="/users">
          <i className="fa-solid fa-people-group nav-icon"></i> People
        </Link>
        <a href="/users/sign_in">
          <i className="fa-solid fa-person-booth nav-icon"></i> Sign In
        </a>
        <a href="/users/sign_up">
          <i className="fa-solid fa-pencil nav-icon"></i> Sign Up
        </a>
      </div>
    );
  }

  return jsxResult;
};

export default Nav;
