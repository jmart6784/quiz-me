import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import QuizIndex from "../components/quiz/QuizIndex";

const Index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={QuizIndex} />
      </Switch>
    </Router>
  );
};

export default Index;
