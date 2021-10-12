import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import Nav from "../components/layouts/Nav";
import QuizIndex from "../components/quiz/QuizIndex";
import QuizShow from "../components/quiz/QuizShow";
import UserShow from "../components/user/UserShow";

const Index = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const url = "/api/v1/users/user_info";

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "GET",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUser(response))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={QuizIndex} />
          <Route path="/quizzes/:id" exact component={QuizShow} />
          <Route path="/users/:id" exact component={UserShow} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default Index;
