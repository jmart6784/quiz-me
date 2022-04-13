import React from "react";
import dateFormat from "../../helpers/dateFormat";

const QuizResultCard = (props) => {
  let quizResult = props.quizResult;

  return (
    <div>
      <p>Quiz name: {quizResult.quiz.name}</p>
      <p>Completed: {dateFormat(quizResult.completed_at)[0]}</p>
    </div>
  );
};

export default QuizResultCard;