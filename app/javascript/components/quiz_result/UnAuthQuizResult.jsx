import React from "react";
import { Link } from "react-router-dom";
import QuizResultCard from "./components/QuizResultCard";

const UnAuthQuizResult = (props) => {
  let data = props.history.location.state;

  if (!(data)) {
    props.history.push("/")
    return <Link to="/">Home</Link>
  }
  
  data.quizResult.finished = data.quiz.questions.length === data.questionResults.length;
  data.quizResult.completed_at = new Date();

  for (let i = 0; i < data.questionResults.length; i++) {
    data.questionResults[i]["id"] = i;
  }

  let qr = data.quizResult;
  qr["quiz"] = data.quiz;
  qr["question_results"] = {
    question_results: data.questionResults,
    questions: data.quiz.questions
  };

  return (
    <div>
      <h1>UnAuthenticated Quiz Result</h1>
      <QuizResultCard quizResult={qr} />
    </div>
  );
  
};

export default UnAuthQuizResult;