import React from "react";

const Options = (props) => {
  let question = props.question;
  let options = [];

  // checked={forms["questions"][ques]["answer"].includes(i.toString())}

  for (let i = 1; i <= 10; i++) {
    if (question[`option_${i}`] != "") {
      if (question["question_type"] === "one answer") {
        options.push(
          <div key={`option_${i}`}>
            <input
              type="radio"
              value={`${i}`} key={`option_${i}`} 
              onChange={(e) => props.submitQuestion(e, question)}
            />
            <label>{question[`option_${i}`]}</label>
          </div>
        );
      } else if (question["type"] === "multiple answers") {
        options.push(
          <div>
            <input
              type="checkbox"
              value={`${i}`} key={`option_${i}`} 
              onChange={(e) => props.submitQuestion(e, question)}
            />
            <label>{question[`option_${i}`]}</label>
          </div>
        );
      }
    }
  }

  return <div>{options}</div>
};

export default Options;