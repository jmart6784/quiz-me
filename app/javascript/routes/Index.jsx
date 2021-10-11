import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../components/layouts/Nav";
import QuizIndex from "../components/quiz/QuizIndex";
import QuizShow from "../components/quiz/QuizShow";

const Index = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={QuizIndex} />
        <Route path="/quiz/:id" exact component={QuizShow} />
      </Switch>
    </Router>
  );
};

export default Index;
