import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import UserContext from "../components/context/UserContext";
import UserIndex from "../components/user/UserIndex";
import UserShow from "../components/user/UserShow";
import Nav from "../components/layouts/Nav";

import QuizIndex from "../components/quiz/QuizIndex";
import QuizShow from "../components/quiz/QuizShow";
import QuizNew from "../components/quiz/QuizNew";
import QuizEdit from "../components/quiz/QuizEdit";

import QuestionEdit from "../components/question/QuestionEdit";
import QuestionNew from "../components/question/QuestionNew";

import QuizStart from "../components/quiz_result/QuizStart";
import UnAuthQuizStart from "../components/quiz_result/UnAuthQuizStart";

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
          <Route path="/quizzes/new" exact component={QuizNew} />
          <Route path="/quizzes/edit/:id" exact component={QuizEdit} />
          <Route path="/quizzes/:id" exact component={QuizShow} />

          <Route path="/users" exact component={UserIndex} />
          <Route path="/users/:id" exact component={UserShow} />

          <Route path="/question/edit/:id" exact component={QuestionEdit} />
          <Route path="/question/new/:id" exact component={QuestionNew} />

          <Route path="/quiz_start/:id" exact component={QuizStart} />
          <Route path="/au_quiz_start" exact component={UnAuthQuizStart} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default Index;
