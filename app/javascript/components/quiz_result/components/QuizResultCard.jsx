import React, { useEffect } from "react";
import dateFormat from "../../helpers/dateFormat";

const QuizResultCard = (props) => {
  let result = props.quizResult;

  let questionResults = <p>No Questions submitted</p>;

  let correctScore = 0;

  if (result.question_results.question_results.length > 0) {
    let count = 0;

    questionResults = result.question_results.question_results.map(r => {
      count += 1;
      r.correct ? correctScore += 1 : ""

      let answer = JSON.parse(r.answer);
      let userAnswer = JSON.parse(r.user_answer);
      let question = result.question_results.questions.find(q => q.id === r.question_id);
      let options = [];

      for (let i = 1; i <= 10; i++) {
        if (question[`option_${i}`] != "") {
          options.push(
            <p key={`qr-${r.id}-q-${question.id}-option-${i}`}>
              Option {i}: {question[`option_${i}`]}
            </p>
          );
        } 
      }

      return (
        <div key={`question-result-${r.id}`}>
          <p>Question #{count}</p>
          <p>Question: {question.question}</p>
          <div>{options}</div>
          <p>{r.correct ? "Correct" : "Incorrect"}</p>
          <p>
            {`Answer${answer.length > 1 ? "s" : ""}: ` + answer.join(", ")}
          </p>
          <p>
            Your answer: {`Answer${userAnswer.length > 1 ? "s" : ""}: ` + userAnswer.join(", ")}
          </p>
        </div>
      );
    });
  }

  let dateTime = dateFormat(result.completed_at);

  return (
    <div>
      <p>Quiz name: {result.quiz.name}</p>
      {
        result.finished ?
          <p>Completed: {`${dateTime[0]} ${dateTime[1].time}`}</p>
        :
          <p>Not Complete</p>
      }

      {questionResults}
      <p>Score: {`${correctScore}/${result.quiz.questions.length}`}</p>
      <br />
    </div>
  );
};

export default QuizResultCard;