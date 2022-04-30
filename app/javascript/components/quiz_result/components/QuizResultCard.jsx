import React, { useState } from "react";
import dateFormat from "../../helpers/dateFormat";

const QuizResultCard = (props) => {
  const [showResults, setShowResults] = useState(false);
  let result = props.quizResult;
  
  result.quiz.questions = result.quiz.questions.map((q) => { 
    if (result.start > q.created_at) {
      return q;
    }
  }).filter((x) => x !== undefined);

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
          let style = { backgroundColor: "", border: "" };
          
          if (userAnswer.includes(i.toString()) && r.correct) {
            style.backgroundColor = "rgb(139, 185, 139)";
            style.border = "1px solid rgb(139, 185, 139)"
          } else if (userAnswer.includes(i.toString())) { 
            style.backgroundColor = "rgb(156, 90, 90)";
            style.border = "1px solid rgb(156, 90, 90)"
          }

          options.push(
            <p key={`qr-${r.id}-q-${question.id}-option-${i}`} style={style}>
              Option {i}: {question[`option_${i}`]}
            </p>
          );
        } 
      }

      let border = r.correct ? "3px solid green" : "3px solid red";

      return (
        <div key={`question-result-${r.id}`} style={{border}}>
          <p className="qrc-question-result-question">Question #{count}</p>
          <p className="qrc-question-result-question">{question.question}</p>
          <div className="qrc-question-options-div">{options}</div>
          <p className="qrc-foot-text">{r.correct ? "Correct" : "Incorrect"}</p>
          <p className="qrc-foot-text">
            {`Answer${answer.length > 1 ? "s" : ""}: ` + answer.join(", ")}
          </p>
          <p className="qrc-foot-text">
            {`Your answer${userAnswer.length > 1 ? "s" : ""}: ` + userAnswer.join(", ")}
          </p>
        </div>
      );
    });
  }

  let dateTime = dateFormat(result.completed_at);
  let percentCorrect = parseFloat((((correctScore).toFixed(1) / (result.question_results.questions.length).toFixed(1)) * 100).toFixed(1));

  let pcColor = { color: "green", border: "3px solid green" };
  
  if (percentCorrect <= 80.0 && percentCorrect > 70.0) {
    pcColor = { color: "rgb(157, 255, 0)", border: "3px solid rgb(157, 255, 0)" };
  } else if (percentCorrect <= 70.0 && percentCorrect > 60.0) {
    pcColor = { color: "rgb(238, 255, 0)", border: "3px solid rgb(238, 255, 0)" };
  } else if (percentCorrect <= 60.0 && percentCorrect > 50.0) {
    pcColor = { color: "rgb(255, 145, 0)", border: "3px solid rgb(255, 145, 0)" };
  } else if (percentCorrect <= 50.0) { 
    pcColor = { color: "red", border: "3px solid red" };
  }

  return (
    <div className="quiz-result-card">
      <div className="quiz-result-card-info">
        <div className="quiz-result-card-info-left">
          <p className="quiz-result-card-quiz-name">{result.quiz.data.name}</p>
          <p className="quiz-result-card-cs">
            {
              result.finished ?
                `Completed at ${dateTime[0]} ${dateTime[1].time}`
              : "Not complete"
            }
          </p>
          <p className="quiz-result-card-cs">
            Score {`${correctScore}/${result.question_results.questions.length}`}
          </p>
        </div>
        <div className="quiz-result-card-info-right">
          <p className="quiz-result-card-percent" style={pcColor}>
            {`${percentCorrect}%`}
          </p>
        </div>
      </div>
      {
        result.question_results.question_results.length > 0 ?
          <div>
            <button onClick={() => setShowResults(!showResults)} className="quiz-result-card-toggle-results">
              {showResults ? "Hide Results" : "Show Results"}
            </button>
            {
              showResults ?
                <div className="question-results-container">{questionResults}</div>
              : ""
            }
          </div>
        :
          ""
      }
    </div>
  );
};

export default QuizResultCard;