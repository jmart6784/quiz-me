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

  let qr = {
    ...data.quizResult,
    quiz: {
      data: data.quiz,
      questions: data.quiz.questions,
    },
    question_results: {
      question_results: data.questionResults,
      questions: data.quiz.questions,
    },
  }

  return (
    <div>
      <h1 className="qrc-title">Let's see how you did!</h1>
      <Link to={`/quizzes/${qr.quiz_id}`} className="qrc-back-link">
        <i className="fa-solid fa-hand-point-left"></i> Back
      </Link>

      <div className="quiz-result-card-parent">
        <QuizResultCard quizResult={qr} />
      </div>
    </div>
  );
  
};

export default UnAuthQuizResult;