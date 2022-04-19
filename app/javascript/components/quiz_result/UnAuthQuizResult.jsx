import React from "react";
import { Link } from "react-router-dom";

const UnAuthQuizResult = (props) => {
  let data = props.history.location.state;

  if (!(data)) {
    props.history.push("/")
    return <Link to="/">Home</Link>
  }
  
  data.quizResult.finished = data.quiz.questions.length === data.questionResults.length;
  data.quizResult.completed_at = new Date();

  return <h1>UnAuthenticated Quiz Result</h1>
  
};

export default UnAuthQuizResult;