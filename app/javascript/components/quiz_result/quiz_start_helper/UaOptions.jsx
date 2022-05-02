import React from "react";

const UaOptions = (props) => {
  let question = props.question;
  let options = [];
  let questionResult = {
    id: "",
    correct: false,
    answer: "[]",
    user_answer: "[]",
    question_id: "",
    quiz_id: "",
    quiz_result_id: "",
    user_id: "",
  };

  for (let i = 0; i < props.questionResults.length; i++) {
    let qr = props.questionResults[i];
    if (qr.question_id === question.id) {
      questionResult = qr;
    }
  }

  for (let i = 1; i <= 10; i++) {
    if (question[`option_${i}`] != "") {
      if (question["question_type"] === "one answer") {
        options.push(
          <div key={`option_${i}`}>
            <input
              type="radio"
              value={`${i}`}
              onChange={(e) => props.submitQuestion(e, question)}
              checked={JSON.parse(questionResult["user_answer"]).includes(i.toString())}
            />
            <label className="qs-option-text">{question[`option_${i}`]}</label>
          </div>
        );
      } else if (question["question_type"] === "multiple answers") {
        options.push(
          <div key={`option_${i}`}>
            <input
              type="checkbox"
              value={`${i}`}
              onChange={(e) => props.submitQuestion(e, question)}
              checked={JSON.parse(questionResult["user_answer"]).includes(i.toString())}
            />
            <label className="qs-option-text">{question[`option_${i}`]}</label>
          </div>
        );
      }
    }
  }

  return <div className="qs-options-div">{options}</div>;
};

export default UaOptions;