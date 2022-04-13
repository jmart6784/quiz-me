import React from "react";

const QuizResultCard = (props) => {
  let quizResult = props.quizResult;

  return (
    <div>
      <p>Quiz name: {quizResult.quiz.name}</p>
    </div>
  );
};

export default QuizResultCard;