import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const [user, setUser] = useContext(UserContext);
  
  return (
    <div>
      <Link to="/">HOME</Link>
      <a href="/users/sign_in">Sign In</a>
      <a href="/users/sign_up">Sign Up</a>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Nav;