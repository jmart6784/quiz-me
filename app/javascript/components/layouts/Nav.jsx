import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const [user, setUser] = useContext(UserContext);
  
  return (
    <div>
      <Link to="/">HOME</Link>
      <a href="/users/sign_in">Sign In</a>
      <a href="/users/sign_up">Sign Up</a>
      <a href="/users/sign_up">Log Out</a>
      <a rel="nofollow" data-method="delete" href="/users/sign_out">Logout</a>
      <p>Email: {user.current_user ? user.current_user.email : ""}</p>
    </div>
  );
};

export default Nav;