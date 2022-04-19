import React from "react";

const UnAuthQuizResult = (props) => {
  const data = props.history.location.state;

  return <h1>UnAuthenticated Quiz Result</h1>
};

export default UnAuthQuizResult;