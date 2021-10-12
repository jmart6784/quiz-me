import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const [user, setUser] = useContext(UserContext);

  let jsxResult;

  if (user.current_user) {
    jsxResult = (
      <div>
        <Link to="/">HOME</Link>
        <Link to="/users">Users Index</Link>
        <Link to={`/users/${user.current_user.id}`}>
          {user.current_user.email}
        </Link>
        <a href="/users/edit">Edit Profile</a>
        <a rel="nofollow" data-method="delete" href="/users/sign_out">
          Logout
        </a>
      </div>
    );
  } else {
    jsxResult = (
      <div>
        <Link to="/">HOME</Link>
        <a href="/users/sign_in">Sign In</a>
        <a href="/users/sign_up">Sign Up</a>
      </div>
    );
  }

  return jsxResult;
};

export default Nav;
