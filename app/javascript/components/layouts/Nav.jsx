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
        <Link to="/users">
          <i className="fa-solid fa-people-group"></i> People
        </Link>
        <Link to="/quizzes/new"><i className="fa-solid fa-hammer"></i> Build Quiz</Link>
        <Link to={`/users/${user.current_user.id}`}>
          <i className="fa-solid fa-face-laugh-beam"></i> {user.current_user.username}
        </Link>
        <a href="/users/edit"><i className="fa-solid fa-gear"></i> Edit Profile</a>
        <a rel="nofollow" data-method="delete" href="/users/sign_out">
          <i className="fa-solid fa-power-off"></i> Logout
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
          <i className="fa-solid fa-people-group"></i> People
        </Link>
        <a href="/users/sign_in">
          <i className="fa-solid fa-person-booth"></i> Sign In
        </a>
        <a href="/users/sign_up">
          <i className="fa-solid fa-pencil"></i> Sign Up
        </a>
      </div>
    );
  }

  return jsxResult;
};

export default Nav;
