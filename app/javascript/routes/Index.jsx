import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import QuizIndex from "../components/quiz/QuizIndex";
import Nav from "../components/layouts/Nav";

const Index = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={QuizIndex} />
      </Switch>
    </Router>
  );
};

export default Index;
