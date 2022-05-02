import React from "react";

const AddOption = (props) => {
  let optionsJsx = [];
  let question = props.question;

  // Creates option inputs 3-10 for a question
  for (let i = 1; i <= props.start; i++) {
    let option;

    if (i > 2) {
      option = (
        <div key={`question_${question.id}_option_${i}`}>
          <p className="qn-label">Option {i}</p>
          <textarea
            name={`option_${i}`}
            rows="5"
            onChange={props.onChange}
            value={question[`option_${i}`]}
            className="qn-text-area"
          />
          <label className="forms-notes">{question[`option_${i}`].length} of 300 characters</label>
        </div>
      );
    } else {
      option = (
        <div key={`question_${question.id}_option_${i}`}>
          <p className="qn-label">Option {i}</p>
          <textarea
            name={`option_${i}`}
            rows="5"
            required
            onChange={props.onChange}
            value={question[`option_${i}`]}
            className="qn-text-area"
          />
          <label className="forms-notes">{question[`option_${i}`].length} of 300 characters</label>
        </div>
      );
    }

    optionsJsx.push(option);
  }

  return optionsJsx;
};

export default AddOption;
