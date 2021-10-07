import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";

const Index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Index;
